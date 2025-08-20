export class UserController {
    private baseUrl: string;
    private token: string | null;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.token = localStorage.getItem("token");
    }

    private getHeaders(auth: boolean = false): HeadersInit {
        const headers: HeadersInit = { "Content-Type": "application/json" };
        if (auth && this.token) {
            headers["Authorization"] = `Bearer ${this.token}`;
        }
        return headers;
    }

    async registerUser(userData: any): Promise<any> {
        const response = await fetch(`${this.baseUrl}/users/register`, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error(`Failed to register: ${response.statusText}`);
        }
        return response.json();
    }

    async loginUser(credentials: any): Promise<any> {
        const response = await fetch(`${this.baseUrl}/users/login`, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify(credentials),
        });
        if (!response.ok) {
            throw new Error(`Login failed: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.token) {
            this.token = data.token;
            localStorage.setItem("token", this.token);
        }
        return data;
    }

    async getUserProfile(): Promise<any> {
        const response = await fetch(`${this.baseUrl}/users/profile`, {
            method: "GET",
            headers: this.getHeaders(true),
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }
        return response.json();
    }

    async updateUserProfile(updateData: any): Promise<any> {
        const response = await fetch(`${this.baseUrl}/users/profile`, {
            method: "PUT",
            headers: this.getHeaders(true),
            body: JSON.stringify(updateData),
        });
        if (!response.ok) {
            throw new Error(`Failed to update profile: ${response.statusText}`);
        }
        return response.json();
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem("token");
    }
}
