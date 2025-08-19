import express from "express";
import { ReportController } from "../controllers/reportController";
import { validateReportCreation, validateReportUpdate } from "../utils/validators";
import { authMiddleware } from "../middleware/authMiddleware";
import { ReportService } from "../services/reportService";

const router = express.Router();
const reportController = new ReportController(new ReportService());

// Create a new report
router.post("/", authMiddleware, validateReportCreation, (req, res) => reportController.createReport(req, res));

// Get all reports for the authenticated user
router.get("/", authMiddleware, (req, res) => reportController.getReports(req, res));

// Update a report
router.put("/:id", authMiddleware, validateReportUpdate, (req, res) => reportController.updateReport(req, res));

// Delete a report
router.delete("/:id", authMiddleware, (req, res) => reportController.deleteReport(req, res));

export default router;
