import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Helper function to sanitize input and prevent CSV breaking
const cleanText = (text: string | undefined | null) => {
  if (!text) return "";
  return String(text)
    .replace(/\n/g, " ")
    .replace(/"/g, '""')
    .replace(/,/g, " "); // remove commas (IMPORTANT)
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // Extract fields
    const locationType = formData.get("locationType") as string;
    const villageName = formData.get("villageName") as string;
    const category = formData.get("category") as string;
    const duration = formData.get("duration") as string;
    const description = formData.get("description") as string;
    const isAnonymous = formData.get("isAnonymous") as string;
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const mediaFile = formData.get("media") as File | null;

    let mediaUrl = "";

    // Save the file locally if it exists
    if (mediaFile) {
      const bytes = await mediaFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Ensure uploads directory exists
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      // Create a unique filename and save
      const fileName = `${Date.now()}-${mediaFile.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const filePathLocal = path.join(uploadDir, fileName);
      fs.writeFileSync(filePathLocal, buffer);
      
      mediaUrl = `/uploads/${fileName}`; // URL path for the frontend
    }

    const filePath = path.join(process.cwd(), "data.csv");

    // Add UTF-8 BOM and Header Row if file doesn't exist
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(
        filePath,
        "\uFEFFtimestamp,locationType,villageName,category,description,duration,isAnonymous,name,phone,media\n",
        "utf8"
      );
    }

    // Final CSV Row Format (wrapped in quotes)
    const csvLine = `"${new Date().toISOString()}","${cleanText(locationType)}","${cleanText(villageName)}","${cleanText(category)}","${cleanText(description)}","${cleanText(duration)}","${isAnonymous}","${cleanText(name)}","${cleanText(phone)}","${mediaUrl}"\n`;

    // Append Properly
    fs.appendFileSync(filePath, csvLine, "utf8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error writing to CSV:", error);
    return NextResponse.json({ success: false, error: "Failed to save data" }, { status: 500 });
  }
}
