// "use client";
// import { useState, useEffect } from 'react';

// export default function ExitPopup() {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const handleMouseLeave = (e: MouseEvent) => {
//       // Sirf ek baar trigger ho, bar bar nahi
//       if (e.clientY <= 0 && !localStorage.getItem('popupShown')) {
//         setIsVisible(true);
//         localStorage.setItem('popupShown', 'true'); // Taake bar bar na aaye
//       }
//     };

//     document.addEventListener('mouseleave', handleMouseLeave);
//     return () => document.removeEventListener('mouseleave', handleMouseLeave);
//   }, []);

//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
//       <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
        
//         {/* Close (X) Button */}
//         <button 
//           onClick={() => setIsVisible(false)} 
//           className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold"
//         >
//           ×
//         </button>

//         <h2 className="text-2xl font-bold text-gray-900 mb-4">Wait — Before You Go</h2>
//         <p className="text-gray-600 mb-6">
//           Get a free AI Readiness Audit. We'll identify 3 areas where AI can cut your costs or grow your revenue — completely free.
//         </p>
        
//         <div className="space-y-4">
//           <input 
//             type="email" 
//             placeholder="Enter Your Business Email" 
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
//           />
//           {/* Button linked to your Calendly */}
//           <a 
//             href="https://calendly.com/lishayarain087" 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="block w-full text-center bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all"
//           >
//             Get My Free Audit
//           </a>
//         </div>
        
//         <p className="text-center text-xs text-gray-400 mt-4">
//           No spam. Just one actionable report.
//         </p>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState, useEffect } from 'react';
// import Link from 'next/link';

// export default function ExitPopup() {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const handleMouseLeave = (e: MouseEvent) => {
//       // Logic: Sirf tab dikhe jab mouse upar jaye
//       if (e.clientY <= 0) { setIsVisible(true); }
//     };
//     document.addEventListener('mouseleave', handleMouseLeave);
//     return () => document.removeEventListener('mouseleave', handleMouseLeave);
//   }, []);

//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60 p-4">
//       <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
//         <button 
//           onClick={() => setIsVisible(false)} 
//           className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl"
//         >
//           ×
//         </button>

//         <h2 className="text-2xl font-bold text-gray-900 mb-4">Wait — Before You Go</h2>
//         <p className="text-gray-600 mb-6">
//           Get a free AI Readiness Audit. We'll identify 3 areas where AI can cut your costs or grow your revenue.
//         </p>
        
//         <Link 
//           href="/free-audit"
//           className="block w-full text-center bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all"
//         >
//           Get My Free Audit
//         </Link>
        
//         <p className="text-center text-xs text-gray-400 mt-4">
//           No spam. Just one actionable report.
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ExitPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      const popupClosed = sessionStorage.getItem("exitPopupClosed");

      if (!popupClosed && e.clientY <= 0) {
        setIsVisible(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Temporary close (Cross button)
  const closeTemporary = () => {
    setIsVisible(false);
  };

  // Permanent close for this session
  const closeForever = () => {
    sessionStorage.setItem("exitPopupClosed", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">

        <button
          onClick={closeTemporary}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Wait — Before You Go
        </h2>

        <p className="text-gray-600 mb-6">
          Get a free AI Readiness Audit. We'll identify 3 areas where AI can cut your costs or grow your revenue.
        </p>

        <Link
          href="/free-audit"
          className="block w-full text-center bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all"
        >
          Get My Free Audit
        </Link>

        <button
          onClick={closeForever}
          className="w-full text-center text-sm text-gray-400 mt-4 hover:text-gray-600"
        >
          Don't show again
        </button>

        <p className="text-center text-xs text-gray-400 mt-3">
          No spam. Just one actionable report.
        </p>

      </div>
    </div>
  );
}


