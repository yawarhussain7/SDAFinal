  import Company from '../models/CompanyVerfication.js';
  import User from '../models/User.js'
  import RegisteredBusiness from "../models/HotelVerfication.js";

  export class VerificationCompany {
      // verification company
      async companyVerification(req, res) {
          const {
              BusinessName,
              RegistrationNumber,
              PhysicalAddress,
              BusinessPhone,
              BusinessEmail,
              website, // optional           
              OwnerFullName,
              OwnerPhone,
              OwnerEmail
          } = req.body;

          const userId = req.user;

          try {
              const user = await User.findById(userId);
              if (!user) {
                  return res.status(404).json({ message: "User not found" });
              }

              if (user.role !== 'TourManager' && user.role != 'HotelManager') {
                  return res.status(403).json({ message: "You are not authorized to perform this action" });
              }

              const existingCompany = await RegisteredBusiness.findOne({ User: userId });
              if (existingCompany) {
                  return res.status(400).json({ message: "You have already registered a company" });
              }

              const newCompany = await RegisteredBusiness.create({
                  User: userId,
                  BusinessName,
                  RegistrationNumber,
                  PhysicalAddress,
                  BusinessPhone,
                  BusinessEmail,
                  OwnerFullName,
                  OwnerPhone,
                  OwnerEmail,
                  website
              });
              await newCompany.save();
              return res.status(201).json({
                  message: "Company verified successfully"
              });

          } catch (e) {
              console.error('Error verifying company:', e);
              return res.status(500).json({ message: "Internal Server Error" });
          }
      }

      // get verified company 
      async getVerifiedCompany(req, res) {
          /* const userId = req.user;

           const user = await User.findById(userId);
           if (!user) {
               return res.status(404).json({ message: "User not found" });
           } else if (user.role != 'TourManager' || user.role != 'HotelManager') {
               return res.status(403).json({ message: "You are not authorized to perform this action " });
           } */
          try {
              const company = await Company.findOne({ userId });
              if (!company) {
                  return res.status(404).json({ message: "Package not found" });
              }
              return res.status(200).json({
                  message: "Company found successfully",
                  data: company
              });


          } catch (err) {
              console.log(err);
          }
      }



      // get sepecifif owner compony;
      async getOwnerCompany(req, res) {
          try {
              const userId = req.user;
              const user = await User.findById(userId);
              if (!user) {
                  return res.status(404).json({ message: "User not found" });
              }

              if (user.role !== 'TourManager' && user.role != 'HotelManager') {
                  return res.status(403).json({ message: "You are not authorized to perform this action" });
              }

              const company = await Company.findOne({ User: userId });

              if (!company) {
                  return res.status(404).json({ message: "Company not found" });
              }

              return res.status(200).json({
                  message: "Company found successfully",
                  data: company
              });

          } catch (error) {
              console.error('Error fetching owner company:', error);
              return res.status(500).json({ message: "Internal server error", error });
          }
      };
      async deleteOwnerCompany(req, res) {
          try {
              const userId = req.user;
              const user = await User.findById(userId);

              if (!user) {
                  return res.status(404).json({ message: "User not found" });
              }

              if (user.role !== 'TourManager' && user.role != 'HotelManager') {
                  return res.status(403).json({ message: "You are not authorized to perform this action" });
              }

              const company = await Company.findOne({ User: userId });

              if (!company) {
                  return res.status(404).json({ message: "Company not found" });
              }

              await Company.deleteOne({ _id: company._id });

              return res.status(200).json({ message: "Company deleted successfully" });

          } catch (error) {
              console.error('Error deleting owner company:', error);
              return res.status(500).json({ message: "Internal server error", error });
          }
      }

  }