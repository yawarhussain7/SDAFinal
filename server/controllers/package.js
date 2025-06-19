  // controllers/PackageController.js
  import PackageModel from "../models/Package.js";
  import User from "../models/User.js";
  import mongoose from "mongoose";
  import Company from '../models/CompanyVerfication.js'
  export class PackageController {
      // Add Package
      static async addPackage(req, res) {
              const {
                  companyName,
                  packageType,
                  price,
                  destination,
                  travelDate,
                  duration,
                  numberOfPeople,
                  rating,
                  description,
                  facilities
              } = req.body;

              const user_id = req.user;

              try {
                  const user = await User.findById(user_id);
                  if (!user || user.role !== 'TourManager') {
                      return res.status(403).json({ message: "Unauthorized access" });
                  }

                  const company = await Company.findOne({ User: user_id });
                  if (!company) {
                      return res.status(400).json({ message: "Company not found, please add company first" });
                  } else if (company.verificationStatus == 'pending') {
                      return res.status(400).json({ message: "Company verification pending, please verify company first" });
                  } else if (company.verificationStatus == 'rejected') {
                      return res.status(400).json({ message: "Company verification rejected, please reapply for verification" });
                  }

                  if (!req.file) {
                      return res.status(400).json({ message: 'No image uploaded' });
                  }

                  let parsedFacilities;
                  try {
                      parsedFacilities = typeof facilities === 'string' ? JSON.parse(facilities) : facilities;
                  } catch (parseErr) {
                      return res.status(400).json({ message: "Invalid facilities format. It must be a valid JSON array." });
                  }

                  const newPackage = {
                      companyName,
                      packageType,
                      price,
                      destination,
                      travelDate,
                      duration,
                      numberOfPeople,
                      rating,
                      description,
                      facilities: parsedFacilities,
                      image: req.file.path
                  };

                  let packageDoc = await PackageModel.findOne({ user: user_id });

                  if (packageDoc) {
                      packageDoc.package.push(newPackage);
                      await packageDoc.save();
                  } else {
                      packageDoc = new PackageModel({
                          user: user_id,
                          package: [newPackage]
                      });
                      await packageDoc.save();
                  }

                  return res.status(201).json({
                      message: "Package created successfully",
                      data: newPackage
                  });

              } catch (err) {
                  console.error("Add Package Error:", err);
                  return res.status(500).json({
                      message: "Error creating package",
                      error: err.message
                  });
              }
          }
          // Get packages belonging to the currently logged-in TourManager
      static async getOwnerPackage(req, res) {
          const user_id = req.user._id;

          try {
              const userPackages = await PackageModel.findOne({ user: user_id });

              if (!userPackages || userPackages.package.length === 0) {
                  return res.status(404).json({
                      message: "No packages found for this user",
                      success: false
                  });
              }

              return res.status(200).json({
                  message: "Packages fetched successfully",
                  success: true,
                  data: userPackages.package
              });

          } catch (e) {
              return res.status(500).json({
                  message: "Error fetching packages",
                  error: e.message
              });
          }
      }
      static async sortPackage(req, res) {
          const { sortOption } = req.body;

          if (!sortOption) {
              return res.status(400).json({
                  message: "Sort option is required",
                  success: false
              });
          }

          try {
              let sortField;
              let sortOrder;

              if (sortOption === 'priceLowHigh') {
                  sortField = 'price';
                  sortOrder = 1;
              } else if (sortOption === 'priceHighLow') {
                  sortField = 'price';
                  sortOrder = -1;
              } else if (sortOption === 'ratingLowHigh') {
                  sortField = 'rating';
                  sortOrder = 1;
              } else if (sortOption === 'ratingHighLow') {
                  sortField = 'rating';
                  sortOrder = -1;
              } else {
                  return res.status(400).json({
                      message: "Invalid sort option",
                      success: false
                  });
              }

              const sortedPackages = await PackageModel.aggregate([
                  { $unwind: "$package" },
                  { $replaceRoot: { newRoot: "$package" } },
                  {
                      $sort: {
                          [sortField]: sortOrder
                      }
                  }
              ]);

              return res.status(200).json({
                  message: "Packages sorted successfully",
                  success: true,
                  sortedPackages,
                  sortField,
                  sortOrder
              });

          } catch (e) {
              return res.status(500).json({
                  message: "Error sorting packages",
                  success: false,
                  error: e.message
              });
          }
      }

      // get package through  filter: 
      static async filterPackage(req, res) {
          const { destination, priceRange, company } = req.body;

          // Check for required fields
          if (!destination || !priceRange || !company) {
              return res.status(400).json({
                  message: "Please provide all required fields",
                  success: false,
              });
          }

          try {
              const filteredPackages = await PackageModel.aggregate([
                  { $unwind: "$package" },
                  { $replaceRoot: { newRoot: "$package" } },
                  {
                      $match: {
                          destination: { $regex: new RegExp(destination, "i") },
                          price: { $lte: parseInt(priceRange) },
                          company: { $regex: new RegExp(company, "i") },
                      },
                  },

              ]);

              return res.status(200).json({
                  success: true,
                  data: filteredPackages,
              });
          } catch (error) {
              console.error("Filter error:", error);
              return res.status(500).json({
                  message: "Server error while filtering packages",
                  success: false,
              });
          }
      }





      // Delete package handler
      static async deleteOwnerPackage(req, res) {
          const { id } = req.params;
          const user_id = req.user._id;

          if (!mongoose.Types.ObjectId.isValid(id)) {
              return res.status(400).json({ message: "Invalid package ID" });
          }

          try {
              const packageToDelete = await PackageModel.updateOne({ user: user_id }, { $pull: { package: { _id: id } } });

              console.log("Package to delete:", packageToDelete);

              if (!packageToDelete) {
                  return res.status(404).json({
                      message: "Package not found or you don't have permission to delete it",
                      success: false
                  });
              }

              return res.status(200).json({
                  message: "Package deleted successfully",
                  success: true
              });

          } catch (e) {
              console.error("Error in deleting package:", e);
              return res.status(500).json({
                  message: "Error deleting package",
                  error: e.message
              });
          }
      }



      // Get All Packages
      static async getPackage(req, res) {
          try {
              const page = parseInt(req.query.page) || 1;
              const limit = parseInt(req.query.limit) || 9;
              const skip = (page - 1) * limit;

              // Fetch packages with pagination
              const packages = await PackageModel.find().skip(skip).limit(limit);

              const totalPackages = await PackageModel.countDocuments();

              // Calculate total pages
              const totalPages = Math.ceil(totalPackages / limit);

              return res.status(200).json({
                  packages,
                  totalPages,
                  currentPage: page,
                  totalPackages,
              });
          } catch (err) {
              return res.status(500).json({ message: "Error fetching packages", error: err.message });
          }
      }


      // Get Specific Package by Type
      static async getSpecificPackage(req, res) {
          const { id } = req.params;
          const { packageType } = req.query;

          try {
              const found = await PackageModel.findById(id);
              if (!found) {
                  return res.status(404).json({ message: "Package not found" });
              }

              const filtered = found.package.filter(pkg => pkg.packageType === packageType);
              return res.status(200).json({ packages: filtered });

          } catch (err) {
              return res.status(500).json({ message: "Failed to get specific package", error: err.message });
          }
      }

      // Update Package Price
      static async updatePackage(req, res) {
          const { price } = req.body;
          const user_id = req.user;
          const { id } = req.params;

          try {
              const user = await User.findById(user_id);
              if (!user || user.role !== 'TourManager') {
                  return res.status(403).json({ message: "Unauthorized" });
              }

              const found = await PackageModel.findById(id);
              if (!found || !found.package || found.package.length === 0) {
                  return res.status(404).json({ message: "Package not found" });
              }

              found.package[0].price = price; // Only updates the first item
              await found.save();

              return res.status(200).json({
                  message: "Package price updated successfully",
                  data: found.package[0]
              });

          } catch (err) {
              return res.status(500).json({ message: "Error updating package", error: err.message });
          }
      }
  }