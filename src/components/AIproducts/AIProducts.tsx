export default function AIProducts() {
    return (
        <section className="mt-24 md:mt-24 py-16 border-t border-gray-200">
            <div className="container mx-auto px-4">
                {/* Section Headline */}
                <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
                    Our AI Products — Live & In Production
                </h2>

                {/* Products Grid */}
                <div className="grid grid-cols-1 max-w-6xl mx-auto gap-8 md:grid-cols-3">

                    {/* Deep-Trace */}
                    <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                        <h3 className="text-xl text-blue-600 font-bold mb-3">Deep-Trace</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            AI detection for text, images & video. Know instantly if it is AI-generated or human-written.
                        </p>
                        <a href="https://deep-trace-snowy.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">
                            Try Live Demo  →
                        </a>
                    </div>

                    {/* CyberCity */}
                    <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                        <h3 className="text-xl text-blue-600 font-bold mb-3">CyberCity</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            AI-powered security audit agent. Run a free scan and get an instant vulnerability report.
                        </p>
                        <a href="https://vulnerability-dun.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">
                            Scan My Website Free  →
                        </a>
                    </div>

                    {/* Hashfor */}
                    <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                        <h3 className="text-xl text-blue-600 font-bold mb-3">Hashfor</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            AI visibility & SEO audit platform. Boost your rankings with data-driven insights.
                        </p>
                        <a href="https://www.hashfor.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">
                            Provide your email →
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
}