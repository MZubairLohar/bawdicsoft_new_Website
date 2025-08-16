import { FC } from "react";
interface servicesOfferProps { }
const SevicesOffer: FC<servicesOfferProps> = () => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="bg-white grid grid-cols-1 max-w-7xl md:grid-cols-2 gap-8 px-8 md:gap-16  pb-10   md:px:12 lg:px-12 pt-20 ">
          <p className="text-lg md:text-3xl font-bold">
            WHAT WE OFFER QUALITY AS A SERVICE, INNOVATION AS OUR CORE
          </p>
          <div className="flex flex-col flex-wrap gap-5 md:gap-8">
            <p className="text-md leading-7 font-semibold text-gray-600">
              Whatever your business is, we will bring value to it by
              incorporating our expertise and years of experience in
              transforming businesses using emerging tech.
            </p>
            <p className=" text-md leading-7 font-semibold text-gray-600">
              {" "}
              Being a lean startup, we believe in optimization and automation of
              platforms. Our development process has a different approach to
              verify user satisfaction while developing web application and
              blockchain application for you.
            </p>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="bg-white pb-10 mt-12">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 max-w-7xl md:grid-cols-3 px-5 md:px-10 gap-10">
            <div className=" relative p-6 bg-gray-200 rounded-lg shadow">
              <span className="absolute rounded-full -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-14 h-14 text-white bg-sky-900  flex justify-center items-center  text-[30px]">
                1
              </span>

              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center pt-5">
                Strategy & Research
              </h5>

              <p className="mb-3 font-normal text-gray-700 text-center">
                We collect information about your requirements early on while
                developing business applications or blockchain projects. We add
                value to the data collected, present facts and figures to you
                and keey you posted with the whole development process.
              </p>
            </div>
            <div className=" relative  p-6  bg-gray-200 rounded-lg shadow">
              <span className="absolute rounded-full -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-14 h-14 text-white bg-sky-900  flex justify-center items-center  text-[30px]">
                2
              </span>

              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center pt-5">
                Design
              </h5>

              <p className="mb-3 font-normal text-gray-700  text-center">
                Once project logic is finalized we jump right on to designing
                your front-end and dashboard. We share our inventory of
                pre-designed templates for your to choose from or start
                designing custom UI and UX as per your convenience.
              </p>
            </div>
            <div className=" relative p-6 bg-gray-200 rounded-lg shadow">
              <span className="absolute rounded-full -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-14 h-14 text-white bg-sky-900  flex justify-center items-center  text-[30px]">
                3
              </span>

              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center pt-5">
                Development
              </h5>

              <p className="mb-3 font-normal text-center">
                When the design is agreed upon, we build your website to the
                highest standards and the programming language is selected
                according to your platform requirement with your complete
                knowledge. We create responsive and agile web applications for
                you.
              </p>
            </div>
            <div className=" relative p-6 bg-gray-200 rounded-lg shadow">
              <span className="absolute rounded-full -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-14 h-14 text-white bg-sky-900  flex justify-center items-center  text-[30px]">
                4
              </span>

              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900  text-center pt-5">
                Revision
              </h5>

              <p className="mb-3 font-normal text-gray-700  text-center">
                After completion of the development process, we take you on a
                tour of your website or blockchain application and apply changes
                if required until the functions are upto your entire
                satisfaction.
              </p>
            </div>
            <div className=" relative  p-6  bg-gray-200  rounded-lg shadow  ">
              <span className="absolute rounded-full -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-14 h-14 text-white bg-sky-900  flex justify-center items-center  text-[30px]">
                5
              </span>

              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900   text-center pt-5">
                QA / Testing
              </h5>

              <p className="mb-3 font-normal text-gray-700  text-center">
                We make sure that the website is responsive and works up to
                international standards. We optimize speed and incorporate
                technical and on-page SEO in compliance with your requirement.
                We simulate and test on-page optimization while confirming SEO
                conformance at this stage.
              </p>
            </div>
            <div className=" relative  p-6 bg-gray-200   rounded-lg shadow  ">
              <span className="absolute rounded-full -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-14 h-14 text-white bg-sky-900  flex justify-center items-center  text-[30px]">
                6
              </span>

              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900   text-center pt-5">
                Launch
              </h5>

              <p className="mb-3 font-normal    text-center">
                Now that we have done everything possible to make sure that your
                website or application looks amazing, is functional, and most
                importantly meets our strict sustainability criteria, your
                website is attached to the host and domain to go live.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex max-w-7xl justify-center items-center">
            <div className="grid grid-col-1 mt-16  md:px-10 ">
              <div className="relative px-5 ">
                <span className="absolute rounded-full -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-14 h-14 text-white bg-sky-900  flex justify-center items-center  text-[30px]">
                  7
                </span>

                <div className="block   md:h-60 text-center  p-6 bg-gray-200   rounded-lg  ">
                  <h5 className=" text-2xl font-bold tracking-tight text-gray-900  pt-5">
                    Iteration
                  </h5>
                  <p className="font-normal text-gray-700  ">
                    After the launch we monitor user behaviour and performance
                    of your website/ application in the real world. Making
                    iterative corrections ensures that the product is up to the
                    mark and user-friendly. We ensure continuous improvements
                    and data collection from the user experience. .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SevicesOffer;
