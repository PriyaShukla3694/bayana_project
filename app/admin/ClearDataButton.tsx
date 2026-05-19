'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ClearDataButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClear = async () => {
    if (!confirm('क्या आप वाकई सभी रिकॉर्ड हटाना चाहते हैं? यह वापस नहीं लाया जा सकेगा! (Are you sure you want to delete all records? This cannot be undone!)')) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/clear', { method: 'DELETE' });
      if (res.ok) {
        alert('सभी रिकॉर्ड सफलतापूर्वक हटा दिए गए हैं।');
        router.refresh(); // Refresh the server component to show empty state
      } else {
        alert('कुछ गलत हो गया।');
      }
    } catch (err) {
      alert('कुछ गलत हो गया।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClear}
      disabled={loading}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium text-sm transition-colors shadow-sm flex items-center gap-2 disabled:bg-red-400 disabled:cursor-not-allowed"
      title="Clear all records"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      {loading ? 'मिटा रहा है...' : 'सभी रिकॉर्ड मिटाएं'}
    </button>
  );
}
