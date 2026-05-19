import Link from "next/link";

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center relative bg-slate-900 overflow-hidden"
    >
      {/* Background Image with Dark Overlay */}
      <div
        className="absolute inset-0 bg-[url('/bayana-bg.jpg.jpg')] bg-cover bg-center bg-no-repeat"
        aria-hidden="true"
      ></div>
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-2xl px-6 py-12 mx-auto flex flex-col items-center text-center">

        {/* Transparent Glass Card */}
        <div className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-2xl border border-white/20 w-full flex flex-col items-center">

          {/* Header Section */}
          <div className="space-y-4 mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              अपनी बात
            </h1>
            <p className="text-lg md:text-xl text-slate-700 font-medium max-w-lg mx-auto leading-relaxed">
              बयाना–रूपवास क्षेत्र की समस्याएं सुरक्षित तरीके से साझा करें
            </p>
          </div>

          {/* CTA Button */}
          <Link
            href="/report"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-green-700 hover:bg-green-800 text-white text-xl font-bold rounded-xl transition-all shadow-lg hover:shadow-xl focus:ring-4 focus:ring-green-700/30 active:scale-[0.98]"
          >
            <span>समस्या दर्ज करें</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          {/* Trust Indicators */}
          <div className="mt-10 pt-6 border-t border-slate-200 w-full space-y-2">
            <div className="flex items-center justify-center gap-2 text-slate-600">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className="text-sm font-medium">आपकी पहचान सुरक्षित रखी जाएगी</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-600">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium">यह प्लेटफॉर्म केवल जनहित के लिए है</p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
