"use client";
import { useState } from 'react';

export default function DeepTracePage() {
  const [text, setText] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [count, setCount] = useState(0);

  const handleCheck = () => {
    if (count >= 2) {
      setShowForm(true);
    } else {
      setCount(count + 1);
      alert("Check complete! " + (2 - count) + " free checks left.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 mt-10 border rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold mb-4">Deep-Trace AI Detection</h1>
      
      {!showForm ? (
        <div className="space-y-4">
          <textarea 
            className="w-full h-48 p-4 border rounded-lg text-black"
            placeholder="Paste your content here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button 
            onClick={handleCheck}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Check for AI
          </button>
        </div>
      ) : (
        <div className="bg-yellow-50 p-8 rounded-lg border border-yellow-200 text-center">
          <h2 className="text-2xl font-bold mb-2">Limit Reached! 🚀</h2>
          <p className="mb-4">Get the full AI analysis by entering your email.</p>
          
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
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Get Full Report
            </button>
          </form>
        </div>
      )}
    </div>
  );
}