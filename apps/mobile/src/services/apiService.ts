import axios from "axios";

const API_BASE_URL = "https://api.example.com";

interface Report {
  title: string;
  description: string;
  location: string;
}

const apiService = {
  async getReports(): Promise<any[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/reports`);
      return response.data;
    } catch (error) {
      console.error("Error fetching reports:", error);
      throw new Error("Failed to fetch reports");
    }
  },

  async createReport(report: Report): Promise<any> {
    try {
      const response = await axios.post(`${API_BASE_URL}/reports`, report);
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
