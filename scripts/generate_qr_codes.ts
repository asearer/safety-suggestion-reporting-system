// generate_qr_codes.ts
// This script generates QR codes for location tagging in the Safety Suggestions Reporting System.
// It uses the 'qrcode' library to generate QR codes and saves them as image files.

import QRCode from "qrcode";
import fs from "fs";
import path from "path";

/**
 * Generates a QR code for a given location and saves it as a PNG file.
 * @param locationId - The unique identifier for the location.
 * @param locationName - The name of the location.
 * @param outputDir - The directory where the QR code image will be saved.
 */
async function generateQRCode(
  locationId: string,
  locationName: string,
  outputDir: string,
): Promise<void> {
  try {
    const qrData = JSON.stringify({ id: locationId, name: locationName });
    const qrCodePath = path.join(outputDir, `${locationId}.png`);

    // Generate QR code and save it as a PNG file
    await QRCode.toFile(qrCodePath, qrData, {
      color: {
        dark: "#000000", // Black dots
        light: "#FFFFFF", // White background
      },
    });

    console.log(
      `QR code for location "${locationName}" saved at: ${qrCodePath}`,
    );
  } catch (error) {
    console.error(
      `Failed to generate QR code for location "${locationName}":`,
      error,
    );
  }
}

/**
 * Main function to generate QR codes for multiple locations.
 */
async function main() {
  const locations = [
    { id: "loc1", name: "Main Entrance" },
    { id: "loc2", name: "Emergency Exit" },
    { id: "loc3", name: "Conference Room" },
  ];

  const outputDir = path.resolve(__dirname, "../qr_codes");

  // Ensure the output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const location of locations) {
    await generateQRCode(location.id, location.name, outputDir);
  }

  console.log("QR code generation completed.");
}

// Execute the main function
main().catch((error) => {
  console.error("Error during QR code generation:", error);
});
