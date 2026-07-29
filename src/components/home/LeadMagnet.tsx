export default function LeadMagnet() {
  return (
   <section className="bg-blue-500 py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Not Sure Where AI Can Help Your Business?
        </h2>
        <p className="text-gray-300 text-lg md:text-xl mb-12">
          Get a Free AI & Web Readiness Audit. We'll identify exactly where AI or automation can save you time and money — at no cost.
        </p>

        {/* Lead Magnet Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-8 rounded-2xl shadow-xl">
          <input type="text" placeholder="Your Full Name" className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
          <input type="email" placeholder="Your Business Email" className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
          <input type="url" placeholder="Your Website URL (optional)" className="w-full p-4 border border-gray-300 rounded-lg" />
          <select className="w-full p-4 border border-gray-300 rounded-lg">
            <option>What Are You Looking to Build?</option>
            <option>AI Automation</option>
            <option>Web Application</option>
            <option>Security Audit</option>
            <option>Other</option>
          </select>
          <button className="md:col-span-2 bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition">
            Provide your details →
          </button>
        </form>
      </div>
    </section>
  );
}