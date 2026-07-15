"use client";
import { useState } from 'react';
import jsPDF from 'jspdf';
import Link from 'next/link';

export default function FreeAuditPage() {
  const [formData, setFormData] = useState({ email: "", website: "" });
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState("");

  const handleAudit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setReport(data.report);
    } catch (error) {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("BawdicSoft AI Audit Report", 20, 20);
    
    // Line separator
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);
    
    // Report Content
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    
    // Clean text: symbols remove karna
    const cleanReport = report.replace(/\*\*/g, '').replace(/##/g, '').replace(/#/g, '');
    const lines = doc.splitTextToSize(cleanReport, 170);
    doc.text(lines, 20, 40);
    
    doc.save("BawdicSoft_Audit_Report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
        {!report ? (
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">AI Readiness Audit</h1>
            <p className="text-lg text-gray-600 mb-8">Get actionable insights to scale your business.</p>
            
            <div className="space-y-4 text-left">
              <input 
                type="text" 
                placeholder="Business Website (e.g. www.yourbusiness.com)" 
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                onChange={(e) => setFormData({...formData, website: e.target.value})}
              />
              <input 
                type="email" 
                placeholder="Business Email" 
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <button 
              onClick={handleAudit}
              disabled={loading}
              className="w-full mt-6 bg-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition shadow-lg shadow-blue-200"
            >
              {loading ? "Analyzing..." : "Generate My Audit"}
            </button>

            <div className="mt-6">
              <Link href="/" className="text-gray-400 hover:text-gray-600 font-medium transition">
                ← Return to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-700">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Audit Report</h2>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-gray-700 leading-relaxed mb-8 whitespace-pre-line shadow-inner">
              {report}
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={downloadPDF} 
                className="flex-1 bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition"
              >
                Download PDF Report
              </button>
              <button 
                onClick={() => window.location.reload()} 
                className="px-8 py-4 rounded-xl border border-gray-200 font-semibold text-gray-600 hover:bg-gray-100 transition"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}