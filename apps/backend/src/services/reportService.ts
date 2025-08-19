import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ReportService {
    async createReport(data: any, userId: number) {
        return await prisma.report.create({
            data: {
                ...data,
                userId,
            },
        });
    }

    async getReports(userId: number) {
        return await prisma.report.findMany({
            where: { userId },
            include: { mediaAttachments: true },
        });
    }

    async updateReport(reportId: number, data: any, userId: number) {
        const report = await prisma.report.findUnique({
            where: { id: reportId },
        });

        if (!report || report.userId !== userId) {
            return null;
        }

        return await prisma.report.update({
            where: { id: reportId },
            data,
        });
    }

    async deleteReport(reportId: number, userId: number) {
        const report = await prisma.report.findUnique({
            where: { id: reportId },
        });

        if (!report || report.userId !== userId) {
            return null;
        }

        return await prisma.report.delete({
            where: { id: reportId },
        });
    }
}
