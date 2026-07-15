"use client";
import { useState } from 'react';

export default function CyberCityPage() {
  const [url, setUrl] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [count, setCount] = useState(0);

  const handleScan = () => {
    if (count >= 2) {
      setShowForm(true);
    } else {
      setCount(count + 1);
      alert("Scanning... " + (2 - count) + " free scans remaining.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 mt-10 border border-blue-200 rounded-xl shadow-lg bg-white">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">CyberCity Security Scanner</h1>
      <p className="text-gray-600 mb-6">Enter your website URL to detect critical security vulnerabilities.</p>
      
      {!showForm ? (
        <div className="space-y-4">
          <input 
            type="url"
            className="w-full p-4 border rounded-lg text-black"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button 
            onClick={handleScan}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Scan Website
          </button>
        </div>
      ) : (
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-200 text-center">
          <h2 className="text-2xl font-bold mb-2 text-blue-800">Vulnerabilities Detected! ⚠️</h2>
          <p className="mb-4">We found 3 critical issues. Enter your email to receive the full security report.</p>
          
          <form 
            className="flex justify-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Email captured! Hum jald hi report bhejenge.");
            }}
          >
            <input 
              type="email" 
              required
              placeholder="Enter your email" 
              className="p-2 border rounded-lg text-black w-64"
            />
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Get Security Report
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
