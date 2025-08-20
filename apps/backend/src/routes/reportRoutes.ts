import express, { Response } from "express";
import { ReportController } from "../controllers/reportController";
import { ReportService } from "../services/reportService";
import { validateReportCreation, validateReportUpdate } from "../utils/validators";
import { authMiddleware, AuthenticatedRequest } from "../middleware/authMiddleware";

const router = express.Router();
const reportController = new ReportController(new ReportService());

// Create a new report
router.post(
    "/",
    authMiddleware,
    validateReportCreation,
    (req: AuthenticatedRequest, res: Response) => reportController.createReport(req, res)
);

// Get all reports for the authenticated user
router.get(
    "/",
    authMiddleware,
    (req: AuthenticatedRequest, res: Response) => reportController.getReports(req, res)
);

// Update a report
router.put(
    "/:id",
    authMiddleware,
    validateReportUpdate,
    (req: AuthenticatedRequest, res: Response) => reportController.updateReport(req, res)
);

// Delete a report
router.delete(
    "/:id",
    authMiddleware,
    (req: AuthenticatedRequest, res: Response) => reportController.deleteReport(req, res)
);

export default router;
