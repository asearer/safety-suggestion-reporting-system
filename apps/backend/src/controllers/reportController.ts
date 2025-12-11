import { Request, Response } from "express";
import { AuthenticatedRequest, JwtPayload } from "../middleware/authMiddleware";
import { ReportService } from "../services/reportService";
import { validationResult } from "express-validator";

/**
 * Controller for handling report-related operations.
 */
export class ReportController {
  private reportService: ReportService;

  constructor(reportService: ReportService) {
    this.reportService = reportService;
  }

  /**
   * Create a new report.
   * @route POST /api/reports
   */
  async createReport(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const report = await this.reportService.createReport(req.body, req.user.id);
      return res.status(201).json(report);
    } catch (error) {
      console.error("Error creating report:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Get all reports for the current user.
   * @route GET /api/reports
   */
  async getReports(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const reports = await this.reportService.getReports(req.user.id);
      return res.status(200).json(reports);
    } catch (error) {
      console.error("Error fetching reports:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Update a report.
   * @route PUT /api/reports/:id
   */
  async updateReport(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const reportId = parseInt(req.params.id);
      const updatedReport = await this.reportService.updateReport(reportId, req.body, req.user.id);

      if (!updatedReport) {
        return res.status(404).json({ message: "Report not found or unauthorized" });
      }

      return res.status(200).json(updatedReport);
    } catch (error) {
      console.error("Error updating report:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Delete a report.
   * @route DELETE /api/reports/:id
   */
  async deleteReport(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const reportId = parseInt(req.params.id);
      const deletedReport = await this.reportService.deleteReport(reportId, req.user.id);

      if (!deletedReport) {
        return res.status(404).json({ message: "Report not found or unauthorized" });
      }

      return res.status(200).json({ message: "Report deleted successfully" });
    } catch (error) {
      console.error("Error deleting report:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
