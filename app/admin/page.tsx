import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
import LoginForm from './LoginForm';
import ClearDataButton from './ClearDataButton';

// Force the page to be dynamic so it reads the CSV file on every request
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('admin_auth')?.value === 'true';

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const filePath = path.join(process.cwd(), 'data.csv');
  let data: string[][] = [];
  let headers: string[] = [];

  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      // Split by newlines, ignoring any trailing empty line
      const rows = fileContent.trim().split('\n');
      
      if (rows.length > 0) {
        // A simple CSV parser that respects quoted fields containing commas
        const parseCSVRow = (row: string) => {
          const result = [];
          let insideQuote = false;
          let currentWord = '';
          
          for (let i = 0; i < row.length; i++) {
            const char = row[i];
            
            if (char === '"') {
              // Handle escaped quotes ""
              if (i + 1 < row.length && row[i + 1] === '"') {
                currentWord += '"';
                i++; // Skip the next quote
              } else {
                insideQuote = !insideQuote;
              }
            } else if (char === ',' && !insideQuote) {
              result.push(currentWord);
              currentWord = '';
            } else {
              currentWord += char;
            }
          }
          result.push(currentWord);
          return result;
        };

        headers = parseCSVRow(rows[0]);
        // Parse the remaining rows
        data = rows.slice(1).map(parseCSVRow);
      }
    }
  } catch (error) {
    console.error("Failed to read CSV", error);
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Admin Dashboard
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <div className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full font-medium text-sm w-fit">
              Total Submissions: {data.length}
            </div>
            {data.length > 0 && (
              <div className="flex items-center gap-3">
                <a 
                  href="/api/download"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium text-sm transition-colors shadow-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  डाउनलोड CSV
                </a>
                <ClearDataButton />
              </div>
            )}
          </div>
        </div>
        
        {data.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 text-center">
            <svg className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">No submissions found.</p>
            <p className="text-slate-400 dark:text-slate-500 mt-1">When users submit forms, they will appear here.</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    {headers.map((header, idx) => (
                      <th 
                        key={idx} 
                        className="p-5 font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wider whitespace-nowrap"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {data.reverse().map((row, rowIdx) => (
                    <tr key={rowIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                      {row.map((cell, cellIdx) => (
                        <td 
                          key={cellIdx} 
                          className="p-5 text-slate-600 dark:text-slate-400 text-sm max-w-xs truncate group-hover:whitespace-normal"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
