import { Request, Response } from "express";
import { AuthenticatedRequest, JwtPayload } from "../middleware/authMiddleware";
import { ReportService } from "../services/reportService";
import { validationResult } from "express-validator";

export class ReportController {
  private reportService: ReportService;

  constructor(reportService: ReportService) {
    this.reportService = reportService;
  }

  async createReport(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const report = await this.reportService.createReport(
        req.body,
        ((req as AuthenticatedRequest).user as JwtPayload)?.id,
      );
      return res.status(201).json(report);
    } catch (error) {
      console.error("Error creating report:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getReports(req: Request, res: Response): Promise<Response> {
    try {
      const reports = await this.reportService.getReports(
        ((req as AuthenticatedRequest).user as JwtPayload)?.id,
      );
      return res.status(200).json(reports);
    } catch (error) {
      console.error("Error fetching reports:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateReport(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedReport = await this.reportService.updateReport(
        parseInt((req as AuthenticatedRequest).params.id, 10),
        req.body,
        ((req as AuthenticatedRequest).user as JwtPayload)?.id,
      );
      if (!updatedReport) {
        return res.status(404).json({ message: "Report not found" });
      }
      return res.status(200).json(updatedReport);
    } catch (error) {
      console.error("Error updating report:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteReport(req: Request, res: Response): Promise<Response> {
    try {
      const deleted = await this.reportService.deleteReport(
        parseInt((req as AuthenticatedRequest).params.id, 10),
        ((req as AuthenticatedRequest).user as JwtPayload)?.id,
      );
      if (!deleted) {
        return res.status(404).json({ message: "Report not found" });
      }
      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting report:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
