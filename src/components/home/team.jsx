import Image from 'next/image';

const OurTeam = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Syed Bilal Hashmi",
      position: "CEO",
      description: "Since 2018, Bawdicsoft has been the navigator for businesses in the digital age. We blend bold vision with practical software solutions to transform complex challenges into clear competitive advantages. Our purpose is to be the catalyst that turns our clients' potential into measurable progress.",
      image: "/assets/sir-bilal-pic.jpg"
    },
    {
      id: 2,
      name: "Muhammad Zubair",
      position: "Director",
      description: "We run a tight ship, leveraging streamlined processes and a lean team to deliver flawlessly executed technology. Our unwavering goal is to master the balance of 'perfection on a budget,' making high-quality, robust solutions accessible to every client, without exception. We are proving that excellence isn't about the size of the investment, but the intelligence of the execution.",
      image: "/assets/sir-zubair-ai.jpeg"
    }
  ];
  

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Team</span>
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the visionary leaders driving innovation and excellence at Bawdicsoft
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div 
              key={member.id}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8`}
            >
              {/* Image Container */}
              <div className="relative group flex justify-center flex-shrink-0">
                <div className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Decorative Element */}
                <div className={`absolute -z-10 w-64 h-64 rounded-2xl bg-blue-200 transform rotate-6 top-2 ${
                  index % 2 === 0 ? 'left-2' : 'right-2'
                }`}></div>
              </div>

              {/* Content Container */}
              <div className={`flex-1 text-center lg:text-left ${index % 2 === 1 ? 'lg:pr-0' : 'lg:pl-12'}`}>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-2">
                    {member.position}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  {member.description}
                </p>
                
                {/* Signature Style */}
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <div className="w-8 h-0.5 bg-blue-600"></div>
                  <span className="text-sm text-gray-500 font-medium">
                    {member.position.split(' : ')[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;