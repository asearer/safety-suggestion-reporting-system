import axios from "axios";

const API_BASE_URL = "/api";

interface Report {
  id: number;
  title: string;
  description: string;
  location: string;
  status: "pending" | "in_review" | "resolved";
  createdAt: string;
  updatedAt: string;
}

interface CreateReportPayload {
  title: string;
  description: string;
  location: string;
}

const apiService = {
  async getReports(): Promise<Report[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/reports`);
      return response.data;
    } catch (error) {
      console.error("Error fetching reports:", error);
      throw new Error("Failed to fetch reports");
    }
  },

  async createReport(payload: CreateReportPayload): Promise<Report> {
    try {
      const response = await axios.post(`${API_BASE_URL}/reports`, payload);
      return response.data;
    } catch (error) {
      console.error("Error creating report:", error);
      throw new Error("Failed to create report");
    }
  },

  async deleteReport(reportId: number): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/reports/${reportId}`);
    } catch (error) {
      console.error("Error deleting report:", error);
      throw new Error("Failed to delete report");
    }
  },
};

export default apiService;
