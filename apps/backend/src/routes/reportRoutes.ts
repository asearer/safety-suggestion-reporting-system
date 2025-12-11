import express, { Response } from "express";
import { ReportController } from "../controllers/reportController";
import { ReportService } from "../services/reportService";
import { validateReportCreation, validateReportUpdate } from "../utils/validators";
import { authMiddleware, AuthenticatedRequest } from "../middleware/authMiddleware";

const router = express.Router();
const reportController = new ReportController(new ReportService());

// Create a new report
/**
 * @route POST /api/reports
 * @desc Create a new safety report
 * @access Private
 */
router.post(
    "/",
    authMiddleware,
    validateReportCreation,
    (req: AuthenticatedRequest, res: Response) => reportController.createReport(req, res)
);

// Get all reports for the authenticated user
/**
 * @route GET /api/reports
 * @desc Get all reports for the current user
 * @access Private
 */
router.get(
    "/",
    authMiddleware,
    (req: AuthenticatedRequest, res: Response) => reportController.getReports(req, res)
);

// Update a report
/**
 * @route PUT /api/reports/:id
 * @desc Update an existing report
 * @access Private
 */
router.put(
    "/:id",
    authMiddleware,
    validateReportUpdate,
    (req: AuthenticatedRequest, res: Response) => reportController.updateReport(req, res)
);

// Delete a report
/**
 * @route DELETE /api/reports/:id
 * @desc Delete a report
 * @access Private
 */
router.delete(
    "/:id",
    authMiddleware,
    (req: AuthenticatedRequest, res: Response) => reportController.deleteReport(req, res)
);

export default router;
