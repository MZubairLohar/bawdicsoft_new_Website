"use client";

export default function StickyHeader() {
  return (
    <div className="absolute top-18 left-0 w-full bg-blue-900 text-white py-3 px-4 z-20 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
        <p className="text-sm font-medium">
          Free AI Audit for Your Business — <span className="font-bold">Limited Spots Available This Month</span>
        </p>
        <a 
      href="https://wa.me/923178866631?text=Hi, I am interested in an AI Audit for my business." 
  target="_blank" 
  rel="noopener noreferrer"
  className="bg-white text-blue-900 px-4 py-1 rounded-full text-sm font-bold hover:bg-gray-100 transition-all"
>
  Claim Yours →
</a>
      </div>
    </div>
  );
}