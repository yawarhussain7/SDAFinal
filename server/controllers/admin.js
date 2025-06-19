  // controllers/admin.js
  import User from '../models/User.js';
  import Company from '../models/CompanyVerfication.js';

  export class AdminController {
      // Get all companies
      static async getCompany(req, res) {
          try {
              const userId = req.user;
              const user = await User.findById(userId);
              if (!user) {
                  return res.status(404).json({ message: "User not found" });
              }



              const companies = await Company.find();
              return res.status(200).json({
                  data: companies,
                  message: "Companies fetched successfully"
              });
          } catch (error) {
              console.error("Error in getCompany:", error);
              return res.status(500).json({ message: "Internal server error" });
          }
      }

      static async approvedCompany(req, res) {
          try {
              const userId = req.user;
              const { companyId } = req.body;

              if (!companyId) {
                  return res.status(400).json({ message: "Company ID is missing", success: false });
              }

              const user = await User.findById(userId);
              if (!user || user.role !== 'Admin') {
                  return res.status(403).json({ message: "You are not authorized", success: false });
              }

              const company = await Company.findById(companyId);
              if (!company) {
                  return res.status(404).json({ message: "Company not found", success: false });
              }

              company.verificationStatus = "approved";
              await company.save();

              return res.status(200).json({ message: "Company approved", success: true });
          } catch (error) {
              console.error("Error approving company:", error);
              return res.status(500).json({ message: "Internal server error", success: false });
          }
      }

      // Reject company
      static async notApprovedCompany(req, res) {
          try {
              const userId = req.user;
              const { companyId } = req.body;

              const user = await User.findById(userId);
              if (!user || user.role !== 'Admin') {
                  return res.status(403).json({ message: "You are not authorized", success: false });
              }

              const company = await Company.findById(companyId);
              if (!company) {
                  return res.status(404).json({ message: "Company not found", success: false });
              }

              company.verificationStatus = "rejected";
              await company.save();

              return res.status(200).json({ message: "Company rejected", success: true });
          } catch (error) {
              console.error("Error rejecting company:", error);
              return res.status(500).json({ message: "Internal server error", success: false });
          }
      }

      // Delete company
      static async deleteCompany(req, res) {
          try {
              const userId = req.user;
              const { companyId } = req.body;

              const user = await User.findById(userId);
              if (!user || user.role !== 'Admin') {
                  return res.status(403).json({ message: "You are not authorized", success: false });
              }

              const company = await Company.findByIdAndDelete(companyId);
              if (!company) {
                  return res.status(404).json({ message: "Company not found", success: false });
              }

              return res.status(200).json({ message: "Company deleted successfully", success: true });
          } catch (error) {
              console.error("Error deleting company:", error);
              return res.status(500).json({ message: "Internal server error", success: false });
          }
      }
  }