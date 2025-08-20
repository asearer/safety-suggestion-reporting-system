export class ReportController {
    private baseUrl: string;
    private token: string | null;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.token = localStorage.getItem("token"); // store JWT token in localStorage
    }

    private getHeaders(): HeadersInit {
        const headers: HeadersInit = { "Content-Type": "application/json" };
        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`;
        }
        return headers;
    }

    async createReport(reportData: any): Promise<any> {
        const response = await fetch(`${this.baseUrl}/reports`, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify(reportData),
        });
        if (!response.ok) {
            throw new Error(`Failed to create report: ${response.statusText}`);
        }
        return response.json();
    }

    async getReports(): Promise<any[]> {
        const response = await fetch(`${this.baseUrl}/reports`, {
            method: "GET",
            headers: this.getHeaders(),
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch reports: ${response.statusText}`);
        }
        return response.json();
    }

    async updateReport(id: number, reportData: any): Promise<any> {
        const response = await fetch(`${this.baseUrl}/reports/${id}`, {
            method: "PUT",
            headers: this.getHeaders(),
            body: JSON.stringify(reportData),
        });
        if (!response.ok) {
            throw new Error(`Failed to update report: ${response.statusText}`);
        }
        return response.json();
    }

    async deleteReport(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/reports/${id}`, {
            method: "DELETE",
            headers: this.getHeaders(),
        });
        if (!response.ok) {
            throw new Error(`Failed to delete report: ${response.statusText}`);
        }
    }
}
