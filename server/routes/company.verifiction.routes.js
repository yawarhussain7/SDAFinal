import express from 'express';
import { authorized } from '../middleware/authMiddleware.js';
import { VerificationCompany } from '../controllers/company.verification.js';

// route to used to register the company;
const verification = new VerificationCompany();
const router = express.Router();
// route to register te company
router.post('/company/register', authorized, (req, res) => verification.companyVerification(req, res));
// route to  get all company to admin for verfiction
router.get('/company', (req, res) =>
    verification.getVerifiedCompany(req, res)
);
// route to get only company that owner add
router.get('/get/ownerCompany', authorized, verification.getOwnerCompany);
// route to delete the owner the company;
router.delete('/delete/ownerCompany', authorized, verification.deleteOwnerCompany);
export default router;