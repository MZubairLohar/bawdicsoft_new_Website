'use client';
import { FC, useState } from "react";
import { allData } from "@/components/allData";
import Image from "next/image";

const OfferSectionWebDesign: FC = () => {
  const categoriesToShow = ["ai", "blog", "threeDWeb", "wordpress"];

  // Show 2 projects per category by default
  const [visibleProjects, setVisibleProjects] = useState<{ [key: string]: number }>(() => {
    const initial: { [key: string]: number } = {};
    categoriesToShow.forEach(cat => initial[cat] = 2);
    return initial;
  });

  const handleViewMore = (category: string) => {
    setVisibleProjects(prev => ({
      ...prev,
      [category]: prev[category] + 2,
    }));
  };

  const groupedProjects = categoriesToShow.map((category) => {
    const projects = allData.filter((p) => p.category === category);
    return { category, projects, visibleCount: visibleProjects[category] };
  });

  return (
    <div className="flex flex-col gap-16">
      {groupedProjects.map(({ category, projects, visibleCount }) => (
        <div key={category} className="border shadow-lg rounded-md p-6 bg-white">
          <div className="flex flex-col lg:flex-row justify-between gap-6">

            {/* Left Section */}
            <div className="lg:w-1/3 w-full sticky top-24 self-start">
              <h1 className="text-3xl font-semibold capitalize text-indigo-700 mb-4">
                {category.replace("-", " ")}
              </h1>
              <p className="text-gray-600">
                Explore our projects in {category.replace("-", " ")} and discover how we deliver innovative, effective solutions.
              </p>
            </div>

            {/* Right Section - 2 cards per row, vertical scroll */}
            <div className="lg:w-2/3 w-full flex flex-col gap-4 max-h-[550px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.slice(0, visibleCount).map((project) => (
                  <div
                    key={project.id}
                    className="border rounded-lg shadow-sm hover:shadow-md transition p-4 bg-gray-50"
                  >
                    <a href={project.href} target="_blank" rel="noopener noreferrer">
                      <div className="relative w-full h-40 rounded overflow-hidden mb-2">
                        <Image
                          src={project.projectImage}
                          alt={project.alternate}
                          layout="fill"
                          objectFit="cover"
                          className="rounded"
                        />
                      </div>
                      <h3 className="text-lg font-bold text-indigo-800">{project.projectName}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{project.projectDesc}</p>
                    </a>
                  </div>
                ))}
              </div>

              {/* View More */}
              {visibleCount < projects.length && (
                <button
                  onClick={() => handleViewMore(category)}
                  className="self-start mt-2 px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                >
                  View More
                </button>
              )}
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default OfferSectionWebDesign;
