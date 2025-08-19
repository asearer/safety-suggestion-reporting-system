import nodemailer from "nodemailer";

export class NotificationService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    async sendEmail(to: string, subject: string, text: string): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: process.env.EMAIL_USER,
                to,
                subject,
                text,
            });
            console.log(`Email sent to ${to}`);
        } catch (error) {
            console.error("Error sending email:", error);
            throw new Error("Failed to send email");
        }
    }

    async sendReportNotification(userEmail: string, reportTitle: string): Promise<void> {
        const subject = "New Safety Report Submitted";
        const text = `Your safety report titled "${reportTitle}" has been successfully submitted. Our team will review it shortly.`;
        await this.sendEmail(userEmail, subject, text);
    }
}
