import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Extract fields from the incoming JSON
    const { locationType, villageName, category, description, isAnonymous, name, phone } = data;
    
    // Helper function to safely format CSV fields (escape quotes and wrap in quotes)
    const escapeCsv = (str: any) => {
      const stringValue = String(str || '');
      return `"${stringValue.replace(/"/g, '""')}"`;
    };
    
    // Create the CSV row
    const row = [
      escapeCsv(new Date().toISOString()),
      escapeCsv(locationType),
      escapeCsv(villageName),
      escapeCsv(category),
      escapeCsv(description),
      escapeCsv(isAnonymous),
      escapeCsv(name),
      escapeCsv(phone)
    ].join(',') + '\n';
    
    // Path to data.csv in the project root
    const filePath = path.join(process.cwd(), 'data.csv');
    
    // Define CSV headers
    const headers = 'timestamp,locationType,villageName,category,description,isAnonymous,name,phone\n';
    
    // If file doesn't exist, create it with headers
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, headers, 'utf8');
    }
    
    // Append the new submission row
    fs.appendFileSync(filePath, row, 'utf8');
    
    return NextResponse.json({ success: true, message: 'Data saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving data to CSV:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
