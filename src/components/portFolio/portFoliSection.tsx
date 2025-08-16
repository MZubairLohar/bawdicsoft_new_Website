"use client";
import Image, { StaticImageData } from "next/image";
import React, { FC, ReactNode, MouseEvent, useState } from "react";
import { allData } from "../allData";
import Link from "next/link";

interface PortFolioSectionProps { }

const PortFolioSection: FC<PortFolioSectionProps> = () => {
  const allDataReciev = allData;

  const [data, setData] = useState(allDataReciev);
  const [num, setNum] = useState(false);
  const filterHandler = (data: string) => {
    if (data === "all") {
      setNum(false);
      setData(allDataReciev);
    } else if (
      data === "wordpress" ||
      data === "wordpress-ecommerce" ||
      data === "wordpress-blog" ||
      data === "wordpress-others"
    ) {
      setNum(true);
      if (data === "wordpress") {
        const filterDataWordpress = allDataReciev.filter(
          (product) => product.category === data
        );
        setData(filterDataWordpress);
      } else if (data === "wordpress-ecommerce") {
        const fileDataEcommerce = allDataReciev.filter(
          (product) => product.subCategory === data
        );
        setData(fileDataEcommerce);
      } else if (data === "wordpress-blog") {
        const fileDataBlog = allDataReciev.filter(
          (product) => product.subCategory === data
        );
        setData(fileDataBlog);
      } else if (data === "wordpress-others") {
        const fileDataOthers = allDataReciev.filter(
          (product) => product.subCategory === data
        );
        setData(fileDataOthers);
      }
    } else {
      setNum(false);
      const filterData = allDataReciev.filter(
        (product) => product.category === data
      );
      setData(filterData);
    }
  };
  return (
    <div className=" bg-gradient-to-r from-sky-950    via-sky-700 via-30% to-sky-600 to-70% flex justify-center">
      <div className=" bg-gradient-to-r from-sky-950    via-sky-700 via-30% to-sky-600 to-70% pt-24 max-w-7xl">
        <p className="text-center">
          {" "}
          <a className="text-3xl hover:bg-sky-600 font-bold py-3 md:py-5 px-10 md:px-40 border-4 border-white rounded-[35px] bg-sky-700 text-white">
            Portfolio{" "}
          </a>
        </p>
        <div className=" py-20 grid grid-cols-1 gap-5  md:grid-cols-3 lg:grid-cols-4 md:px-12 px-5 ">
          <button
            className="text-lg border-blue-400 md:text-xl font-bold  cursor-pointer rounded-[35px] border-4 hover:border-blue-600 active:bg-sky-900 focus:outline-none focus:ring focus:ring-blue-600   focus:border-none  py-3 min-w-min text-white"
            onClick={() => filterHandler("all")}
          >
            All
          </button>
          <button
            className="text-lg border-blue-400 md:text-xl font-bold  cursor-pointer rounded-[35px] border-4 hover:border-blue-600 py-3 min-w-min text-white active:bg-sky-900 focus:outline-none focus:ring focus:ring-blue-600   focus:border-none"
            onClick={() => filterHandler("wordpress")}
          >
            Wordpress
          </button>
          <button
            className="text-lg border-blue-400 md:text-xl font-bold  cursor-pointer rounded-[35px] border-4 hover:border-blue-600 py-3 min-w-min text-white active:bg-sky-900 focus:outline-none focus:ring focus:ring-blue-600   focus:border-none"
            onClick={() => filterHandler("ai")}
          >
            AI
          </button>
          <button
            className="text-lg border-blue-400 md:text-xl font-bold  cursor-pointer rounded-[35px] border-4 hover:border-blue-600 py-3 min-w-min text-white active:bg-sky-900 focus:outline-none focus:ring focus:ring-blue-600   focus:border-none"
            onClick={() => filterHandler("threeDWeb")}
          >
            3D Model Website
          </button>
        </div>

        {num && (
          <div className="flex justify-center items-center">
            <div className="pb-20 grid grid-cols-1 gap-5  md:grid-cols-3   ">
              <button
                className="text-md border-blue-400 md:text-md font-bold  cursor-pointer  rounded-[35px] border-4 hover:border-blue-600 py-3 min-w-min text-white active:bg-sky-900 focus:outline-none focus:ring focus:ring-blue-600 px-2 focus:border-none"
                onClick={() => filterHandler("wordpress-ecommerce")}
              >
                E-commerce
              </button>
              <button
                className="text-md border-blue-400 md:text-md font-bold  cursor-pointer  rounded-[35px] border-4 hover:border-blue-600 py-3 min-w-min text-white active:bg-sky-900 focus:outline-none focus:ring focus:ring-blue-600 px-2 focus:border-none"
                onClick={() => filterHandler("wordpress-blog")}
              >
                Blog
              </button>
              <button
                className="text-md border-blue-400 md:text-md font-bold  cursor-pointer  rounded-[35px] border-4 hover:border-blue-600 py-3 min-w-min text-white active:bg-sky-900 focus:outline-none focus:ring focus:ring-blue-600 px-2 focus:border-none"
                onClick={() => filterHandler("wordpress-others")}
              >
                Others
              </button>
            </div>
          </div>
        )}
        {/* All Data Render */}
        <div>
          <div className=" gap-8 grid grid-cols-1 md:grid-cols-3 px-5  md:px-12 py-10">
            {data.map((product) => (
              // <Link
              //   key={product.id}
              //   className=" relative  group"
              //   href={
              //     product.category.includes("ai")
              //       ? `/productDetailes/${product.id}`
              //       : product.href
              //   }
              // >
              <div>
                <Image
                  src={product.projectImage}
                  alt=""
                  width={400}
                  height={400}
                  className="w-full h-60 rounded-[20px] hover:opacity-25 duration-500 transition-opacity"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="flex justify-center items-center md:gap-1 ">
                    <div>
                      <span className=" text-2xl mx-auto md:text-md break-words lg:text-3xl font-bold hidden group-hover:block text-white  ">
                        {product.projectName.length > 10
                          ? product.projectName.slice(0, 10)
                          : product.projectName}
                      </span>
                    </div>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-10 h-10 md:w-5 m:h-5  lg:w-10 lg:h-10 font-bold  hidden group-hover:block text-white  "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </div>
                </div>
                </div>
              // </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PortFolioSection;

{
  /* <Link
key={product.id}
href={`${product.href}`}
className="relative"
>
<div className="relative">
  <Image
    width={500}
    height={500}
    alt={product.alternate}
    src={product.projectImage}
    className="rounded-2xl"
  />
  <div className="hover:bg-[#3e7cba] opacity-[0.8] absolute top-0 w-full rounded-2xl h-full transition duration-500">
    <div className="flex gap-2 justify-center items-center h-full opacity-0 hover:opacity-100">
      <div className="font-extrabold text-slate-100 text-2xl">
        {product.projectName}
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8 font-extrabold text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
      </div>
    </div>
  </div>
</div>
<div className="mt-4 text-center md:text-xl text-base  text-white font-mono">
  <h4>{product.mainTitle}</h4>
</div>
</Link> */
}
