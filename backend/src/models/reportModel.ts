import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Fetches a report by its ID.
 * @param id - The ID of the report to fetch.
 * @returns The report object or null if not found.
 */
export async function getReportById(id: number) {
  return await prisma.report.findUnique({
    where: { id },
    include: { mediaAttachments: true, user: true },
  });
}

/**
 * Creates a new report.
 * @param data - The data for the new report.
 * @returns The created report object.
 */
export async function createReport(data: {
  title: string;
  description: string;
  location: string;
  userId: number;
}) {
  return await prisma.report.create({
    data,
  });
}

/**
 * Updates an existing report.
 * @param id - The ID of the report to update.
 * @param data - The updated data for the report.
 * @returns The updated report object or null if not found.
 */
export async function updateReport(
  id: number,
  data: Partial<{
    title: string;
    description: string;
    location: string;
    status: string;
  }>,
) {
  return await prisma.report.update({
    where: { id },
    data,
  });
}

/**
 * Deletes a report by its ID.
 * @param id - The ID of the report to delete.
 * @returns The deleted report object or null if not found.
 */
export async function deleteReport(id: number) {
  return await prisma.report.delete({
    where: { id },
  });
}
