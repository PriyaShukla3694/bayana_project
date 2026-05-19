import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    if (cookieStore.get('admin_auth')?.value !== 'true') {
      return new NextResponse('Unauthorized: Please login first', { status: 401 });
    }

    const filePath = path.join(process.cwd(), 'data.csv');
    
    if (fs.existsSync(filePath)) {
      // Just delete the file. The submission route automatically creates a new one with headers.
      fs.unlinkSync(filePath);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to clear data:", error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
