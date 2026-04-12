import React, { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

const MockGoogleAd = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show ad after a short delay to mimic real loading
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[9999] animate__animated animate__slideInUp">
      {/* Close Button */}
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute -top-8 right-4 bg-white/90 text-gray-500 hover:text-black p-1 rounded-t-lg shadow-lg border border-b-0 border-gray-200 transition-colors"
        title="Close Ad"
      >
        <X size={16} />
      </button>

      {/* Ad Container */}
      <div className="bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Ad Content */}
          <div className="flex items-center gap-4 flex-1">
            <div className="hidden sm:flex shrink-0 w-12 h-12 bg-emerald-100 rounded-lg items-center justify-center text-emerald-600 font-bold text-xl">
              T
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-bold px-1.5 py-0.5 border border-gray-400 text-gray-500 rounded uppercase tracking-tighter">Ad</span>
                <h4 className="text-sm font-bold text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
                  Discover Mt. Banahaw's Best Kept Secrets <ExternalLink size={12} />
                </h4>
              </div>
              <p className="text-xs text-gray-600 line-clamp-1">
                Book your healing journey today. Experience forest bathing and traditional rituals starting at ₱1,200.
              </p>
            </div>
          </div>

          {/* CTA & Branding */}
          <div className="flex items-center gap-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap">
              Visit Site
            </button>
            <div className="hidden lg:block text-right">
              <span className="text-[10px] text-gray-400 block uppercase tracking-widest">Ads by Google</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MockGoogleAd;
