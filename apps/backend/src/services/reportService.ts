import { PrismaClient, Report, MediaAttachment } from "@prisma/client";

const prisma = new PrismaClient();

export interface CreateReportDTO {
    title: string;
    description: string;
    location: string;
    mediaAttachments?: { url: string; type: string }[];
}

export interface UpdateReportDTO {
    title?: string;
    description?: string;
    location?: string;
    status?: string;
}

/**
 * Service for handling report-related operations.
 */
export class ReportService {
    /**
     * Creates a new report.
     * @param data - The report data.
     * @param userId - The ID of the user creating the report.
     * @returns The created report.
     */
    async createReport(data: CreateReportDTO, userId: number): Promise<Report> {
        const { mediaAttachments, ...reportData } = data;
        return await prisma.report.create({
            data: {
                ...reportData,
                userId,
                mediaAttachments: {
                    create: mediaAttachments,
                },
            },
            include: {
                mediaAttachments: true,
            },
        });
    }

    /**
     * Retrieves all reports for a specific user.
     * @param userId - The ID of the user.
     * @returns A list of reports with their media attachments.
     */
    async getReports(userId: number): Promise<(Report & { mediaAttachments: MediaAttachment[] })[]> {
        return await prisma.report.findMany({
            where: { userId },
            include: { mediaAttachments: true },
        });
    }

    /**
     * Updates an existing report.
     * @param reportId - The ID of the report to update.
     * @param data - The data to update.
     * @param userId - The ID of the user attempting to update the report.
     * @returns The updated report or null if not found/unauthorized.
     */
    async updateReport(
        reportId: number,
        data: UpdateReportDTO,
        userId: number
    ): Promise<Report | null> {
        const report = await prisma.report.findUnique({
            where: { id: reportId },
        });

        if (!report || report.userId !== userId) {
            return null;
        }

        return await prisma.report.update({
            where: { id: reportId },
            data,
            include: { mediaAttachments: true },
        });
    }

    /**
     * Deletes a report.
     * @param reportId - The ID of the report to delete.
     * @param userId - The ID of the user attempting to delete the report.
     * @returns The deleted report or null if not found/unauthorized.
     */
    async deleteReport(reportId: number, userId: number): Promise<Report | null> {
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
