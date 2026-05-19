import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  if (cookieStore.get('admin_auth')?.value !== 'true') {
    return new NextResponse('Unauthorized: Please login first', { status: 401 });
  }

  const filePath = path.join(process.cwd(), 'data.csv');
  
  if (!fs.existsSync(filePath)) {
    return new NextResponse('No data available', { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Disposition': 'attachment; filename="data.csv"',
      'Content-Type': 'text/csv',
    },
  });
}
