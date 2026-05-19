"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import bayanaBg from "../../public/bayana-bg.jpg.jpg";
import ruralNamaste from "../../public/rural_namaste.png";

export default function ReportPage() {
  const [step, setStep] = useState(0); // 0 is welcome screen
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  
  const [formData, setFormData] = useState({
    locationType: "",
    villageName: "",
    category: "",
    duration: "",
    description: "",
    isAnonymous: true,
    name: "",
    phone: "",
  });
  const [media, setMedia] = useState<File | null>(null);

  const showFeedbackAndNext = (nextStep: number, msg: string) => {
    setFeedback(msg);
    setTimeout(() => {
      setFeedback("");
      setStep(nextStep);
    }, 700);
  };

  const handleBack = () => {
    if (step === 3 && formData.locationType === "शहर") {
      setStep(1);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, String(value));
      });
      if (media) {
        formDataToSend.append("media", media);
      }
      
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        alert("आपकी बात प्रशासन तक पहुंचाई जाएगी 🙏 जनहित में आपके योगदान के लिए धन्यवाद!");
        window.location.href = "/";
      } else {
        alert("कुछ गलत हो गया। कृपया फिर से प्रयास करें।");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("कुछ गलत हो गया। कृपया फिर से प्रयास करें।");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateForm = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const totalSteps = 7;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative bg-slate-50 font-sans p-4">
      {/* Background Image with Light Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bayanaBg}
          alt="Bayana Background"
          fill
          priority
          placeholder="blur"
          className="object-cover opacity-40"
        />
      </div>
      <div className="absolute inset-0 bg-white/80"></div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Trust Indicators (Top) */}
        <div className="mb-4 flex flex-col items-center gap-1">
          <p className="text-slate-800 text-sm font-bold flex items-center gap-2 bg-white/80 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-sm border border-slate-200">
            <span>🔒</span> आपकी पहचान सुरक्षित रखी जाएगी
          </p>
          <p className="text-slate-700 text-xs font-semibold flex items-center gap-1.5 bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm border border-slate-200">
            <span>📍</span> यह प्लेटफॉर्म केवल बयाना–रूपवास क्षेत्र के लिए है
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-[450px]">
          
          {/* Header & Progress */}
          {step > 0 && (
            <div className="bg-white/50 border-b border-slate-200 p-4 flex items-center justify-between">
              <button 
                onClick={handleBack}
                className="text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1 font-medium px-2 py-1 rounded-lg hover:bg-slate-100"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
                <span>पीछे</span>
              </button>
              <span className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                स्टेप {step} / {totalSteps}
              </span>
            </div>
          )}

          {/* Form Body */}
          <div className="p-6 sm:p-8 flex-grow flex flex-col justify-center relative">
            
            {/* Feedback Overlay */}
            {feedback && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-3xl animate-in fade-in zoom-in duration-200">
                <div className="bg-green-100 text-green-800 px-6 py-3 rounded-full text-2xl font-bold shadow-lg flex items-center gap-3">
                  {feedback}
                </div>
              </div>
            )}

            {/* Step 0: Welcome Screen */}
            {step === 0 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
                {/* 📸 1. WELCOME SCREEN */}
                <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                  <Image 
                    src={ruralNamaste} 
                    alt="Welcome Namaste" 
                    fill
                    priority
                    placeholder="blur"
                    className="object-cover" 
                  />
                </div>
                
                <h2 className="text-3xl font-extrabold text-slate-800 mb-4 leading-tight">
                  नमस्ते!<br/>हम आपकी बात सुनने के लिए यहां हैं
                </h2>
                <p className="text-lg text-slate-600 mb-8 font-medium">
                  आपकी एक जानकारी किसी की मदद कर सकती है और हमारे क्षेत्र को बेहतर बना सकती है।
                </p>
                <button
                  onClick={() => setStep(1)}
                  className="w-full py-4 bg-green-700 hover:bg-green-800 active:scale-95 text-white font-bold text-xl rounded-2xl transition-all shadow-lg shadow-green-700/30"
                >
                  शुरू करें
                </button>
                <Link href="/" className="inline-block mt-6 text-slate-500 hover:text-slate-800 font-medium border-b border-transparent hover:border-slate-800 transition-all">
                  वापस जाएं
                </Link>
              </div>
            )}

            {/* Step 1: Location Type */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">आप कहाँ से हैं?</h2>
                <p className="text-slate-500 mb-6 text-lg">कृपया अपना क्षेत्र चुनें</p>
                
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: "शहर से हूँ", val: "शहर", icon: "🏙️" },
                    { label: "गांव से हूँ", val: "गांव", icon: "🏡" }
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => {
                        updateForm("locationType", item.val);
                        showFeedbackAndNext(item.val === "शहर" ? 3 : 2, "✅ ठीक है");
                      }}
                      className="py-5 px-6 rounded-2xl border-2 border-slate-200 text-xl font-bold transition-all text-left flex items-center gap-4 hover:border-green-600 hover:bg-green-50 active:scale-95 text-slate-700"
                    >
                      <span className="text-3xl">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Village Name */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">अपने गांव का नाम बताएं</h2>
                <p className="text-slate-500 mb-6 text-lg">ताकि परेशानी का सही स्थान पता चल सके</p>
                
                <input
                  type="text"
                  value={formData.villageName}
                  onChange={(e) => updateForm("villageName", e.target.value)}
                  placeholder="गांव का नाम लिखें..."
                  className="w-full p-5 text-xl rounded-2xl border-2 border-slate-300 focus:border-green-600 focus:ring-0 text-slate-800 placeholder-slate-400 transition-colors mb-6 shadow-sm"
                  autoFocus
                />
                
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      if(formData.villageName.trim()) {
                        showFeedbackAndNext(3, "👍 समझ गए");
                      }
                    }}
                    disabled={!formData.villageName.trim()}
                    className="w-full py-4 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-200 disabled:text-slate-400 active:scale-95 text-white font-bold text-xl rounded-2xl transition-all shadow-md"
                  >
                    आगे बढ़ें
                  </button>
                  <button
                    onClick={() => showFeedbackAndNext(3, "✅ कोई बात नहीं")}
                    className="w-full py-4 bg-transparent border-2 border-slate-200 hover:bg-slate-50 text-slate-600 active:scale-95 font-bold text-lg rounded-2xl transition-all"
                  >
                    यह छोड़ सकते हैं (Skip)
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Issue Category */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">आपको सबसे ज्यादा परेशानी किस चीज़ से है?</h2>
                <p className="text-slate-500 mb-6 text-lg">कोई एक विकल्प चुनें</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                  {[
                    { label: "सड़क खराब होना", icon: "🛣️" },
                    { label: "पानी की कमी", icon: "💧" },
                    { label: "बिजली की समस्या", icon: "⚡" },
                    { label: "महिला सुरक्षा / खतरे", icon: "🚨" },
                    { label: "पंचायत / प्रशासन", icon: "🏛️" },
                    { label: "भ्रष्टाचार / अवैध काम", icon: "🛑" },
                    { label: "स्कूल / अस्पताल", icon: "🏥" },
                    { label: "अन्य समस्याएं", icon: "❓" }
                  ].map((cat) => (
                    <button
                      key={cat.label}
                      onClick={() => {
                        updateForm("category", cat.label);
                        showFeedbackAndNext(4, "✅ ठीक है");
                      }}
                      className="py-4 px-4 rounded-2xl border-2 border-slate-200 text-lg font-bold transition-all text-left flex items-center gap-3 hover:border-green-600 hover:bg-green-50 active:scale-95 text-slate-700 bg-white"
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      <span className="leading-tight">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Description */}
            {step === 4 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col h-full">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">अपनी परेशानी बताएं</h2>
                <p className="text-slate-500 mb-4 text-lg">थोड़ा और खुलकर बताएं, क्या हुआ है?</p>
                
                <textarea
                  value={formData.description}
                  onChange={(e) => updateForm("description", e.target.value)}
                  placeholder="यहाँ अपनी बात लिखें..."
                  rows={5}
                  className="w-full p-5 text-xl rounded-2xl border-2 border-slate-300 focus:border-green-600 focus:ring-0 text-slate-800 placeholder-slate-400 transition-colors resize-none mb-4 shadow-sm"
                  autoFocus
                />
                
                <div className="mt-auto">
                  <button
                    onClick={() => {
                      if(formData.description.trim()) {
                        showFeedbackAndNext(5, "👍 बहुत बढ़िया");
                      }
                    }}
                    disabled={!formData.description.trim()}
                    className="w-full py-4 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-200 disabled:text-slate-400 active:scale-95 text-white font-bold text-xl rounded-2xl transition-all shadow-md"
                  >
                    आगे बढ़ें
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Duration */}
            {step === 5 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">यह परेशानी कब से है?</h2>
                <p className="text-slate-500 mb-6 text-lg">समय बताने से मदद जल्दी मिल सकती है</p>
                
                <div className="grid grid-cols-1 gap-4">
                  {["हाल ही में (1-2 दिन)", "कुछ समय से (1 हफ्ता)", "काफी समय से (महीनों से)"].map((duration) => (
                    <button
                      key={duration}
                      onClick={() => {
                        updateForm("duration", duration);
                        showFeedbackAndNext(6, "👍 समझ गए");
                      }}
                      className="py-5 px-6 rounded-2xl border-2 border-slate-200 text-xl font-bold transition-all text-left flex items-center justify-between hover:border-green-600 hover:bg-green-50 active:scale-95 text-slate-700"
                    >
                      <span>{duration}</span>
                      <span className="text-2xl">⏳</span>
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      updateForm("duration", "पता नहीं");
                      showFeedbackAndNext(6, "✅ ठीक है");
                    }}
                    className="py-4 mt-2 bg-transparent border-2 border-slate-200 hover:bg-slate-50 text-slate-600 active:scale-95 font-bold text-lg rounded-2xl transition-all"
                  >
                    यह छोड़ सकते हैं (Skip)
                  </button>
                </div>
              </div>
            )}

            {/* Step 6: Media Upload */}
            {step === 6 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col h-full">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
                  अगर आप चाहें तो समस्या की फोटो या वीडियो भी जोड़ सकते हैं
                </h2>
                <p className="text-slate-500 mb-6 text-lg">(यह वैकल्पिक है)</p>

                <div className="border-4 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 rounded-3xl p-8 mb-4 text-center relative transition-colors flex-grow flex flex-col justify-center items-center">
                  <input 
                    type="file" 
                    accept="image/*,video/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setMedia(e.target.files[0]);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  {media ? (
                    <div className="flex flex-col items-center">
                      <span className="text-4xl mb-2">✅</span>
                      <span className="text-lg font-bold text-slate-700">{media.name}</span>
                      <span className="text-sm text-slate-500 mt-1">बदलने के लिए क्लिक करें</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center pointer-events-none">
                      <span className="text-5xl mb-3">📷</span>
                      <span className="text-xl font-bold text-slate-700">फोटो / वीडियो अपलोड करें</span>
                      <span className="text-sm text-slate-500 mt-2">टैप करें या फाइल चुनें</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 mt-auto">
                  <button
                    onClick={() => showFeedbackAndNext(7, "👍 बहुत बढ़िया")}
                    disabled={!media}
                    className="w-full py-4 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-200 disabled:text-slate-400 active:scale-95 text-white font-bold text-xl rounded-2xl transition-all shadow-md"
                  >
                    अपलोड करें और आगे बढ़ें
                  </button>
                  <button
                    onClick={() => showFeedbackAndNext(7, "✅ कोई बात नहीं")}
                    className="w-full py-4 bg-transparent border-2 border-slate-200 hover:bg-slate-50 text-slate-600 active:scale-95 font-bold text-lg rounded-2xl transition-all"
                  >
                    छोड़ें (Skip)
                  </button>
                  <p className="text-center text-slate-400 text-sm mt-1">आप बिना फोटो के भी आगे बढ़ सकते हैं</p>
                </div>
              </div>
            )}

            {/* Step 7: Identity */}
            {step === 7 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">अंतिम चरण!</h2>
                <p className="text-slate-500 mb-6 text-lg">क्या आप अपना नाम देना चाहेंगे?</p>
                
                <div className="space-y-4 mb-8">
                  <button
                    onClick={() => updateForm("isAnonymous", true)}
                    className={`w-full py-5 px-6 rounded-2xl border-2 text-lg font-bold transition-all text-left flex items-center justify-between active:scale-95 ${
                      formData.isAnonymous 
                        ? 'border-green-600 bg-green-50 text-green-800' 
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🕵️</span>
                      <span>नहीं, पहचान गुप्त रखें (Anonymous)</span>
                    </div>
                    {formData.isAnonymous && <span className="text-green-600 text-2xl">✓</span>}
                  </button>
                  
                  <button
                    onClick={() => updateForm("isAnonymous", false)}
                    className={`w-full py-5 px-6 rounded-2xl border-2 text-lg font-bold transition-all text-left flex items-center justify-between active:scale-95 ${
                      !formData.isAnonymous 
                        ? 'border-blue-600 bg-blue-50 text-blue-800' 
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">👤</span>
                      <span>हाँ, मेरा नाम शामिल करें</span>
                    </div>
                    {!formData.isAnonymous && <span className="text-blue-600 text-2xl">✓</span>}
                  </button>
                </div>

                {!formData.isAnonymous && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-4 mb-6">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateForm("name", e.target.value)}
                      placeholder="आपका पूरा नाम (वैकल्पिक)"
                      className="w-full p-4 text-xl rounded-2xl border-2 border-slate-300 focus:border-blue-600 focus:ring-0 text-slate-800"
                    />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateForm("phone", e.target.value)}
                      placeholder="फ़ोन नंबर (वैकल्पिक)"
                      className="w-full p-4 text-xl rounded-2xl border-2 border-slate-300 focus:border-blue-600 focus:ring-0 text-slate-800"
                    />
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-4 mt-2 bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white font-bold text-xl rounded-2xl transition-all shadow-lg active:scale-95 flex justify-center items-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>जमा हो रहा है...</span>
                    </>
                  ) : (
                    <span>सबमिट करें 🚀</span>
                  )}
                </button>
                <p className="text-center text-slate-500 mt-4 font-medium text-sm">
                  आपकी बात प्रशासन तक पहुंचाई जाएगी 🙏
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
      `}</style>
    </main>
  );
}