import React, { FC, ReactNode, MouseEvent } from "react";
import HerSectionimg from "../../../public/images/aboutusImg.webp";
import Image, { StaticImageData } from "next/image";
interface recruitmentSectionProps {}
type heroImg = {
  img: StaticImageData;
};
const data: heroImg = { img: HerSectionimg };
const RecruitmentSection: FC<recruitmentSectionProps> = () => {
  return (
    <section className="flex justify-center items-center flex-col py-10 md:py-20  ">
      <div className="px-4 pb-2 md:pb-5 lg:pb-10">
        <h1 className="mb-4 text-center text text-2xl md::text-4xl font-bold tracking-tight leading-none  md:text-5xl lg:text-6xl ">
          Our Recruitment Process
        </h1>
        <p className="text-gray-800 text-center text-sm md:text-lg max-w-5xl pb-4 md:pb-0 ">
          We’ve designed a streamlined hiring process to ensure a smooth and
          transparent experience for our candidates:
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl px-5 md:px-10">
        <div className="text-center border bg-white p-8 md:p-14 rounded-3xl flex flex-col justify-start items-center gap-4">
          <svg
            className="fill-current"
            height="50px"
            width="50px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 204.376 204.376"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#082f49", stopOpacity: 1 }}
                />
                <stop
                  offset="30%"
                  style={{ stopColor: "#0369a1", stopOpacity: 1 }}
                />
                <stop
                  offset="70%"
                  style={{ stopColor: "#0284c7", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <path
              fill="url(#gradient)"
              d="M171.247,204.376c2.484,0,4.5-2.015,4.5-4.5V61.35h-51.744c-7.502,0-13.605-6.107-13.605-13.614V0H33.13
	c-2.485,0-4.5,2.015-4.5,4.5v195.376c0,2.485,2.015,4.5,4.5,4.5H171.247z M74.999,94.627h79.5v10h-79.5V94.627z M74.999,119.627
	h79.5v10h-79.5V119.627z M74.999,144.626h79.5v10h-79.5V144.626z M57.999,92.627c3.865,0,7,3.134,7,7s-3.135,7-7,7s-7-3.134-7-7
	S54.134,92.627,57.999,92.627z M57.999,117.627c3.865,0,7,3.134,7,7s-3.135,7-7,7s-7-3.134-7-7S54.134,117.627,57.999,117.627z
	 M57.999,142.626c3.865,0,7,3.134,7,7c0,3.866-3.135,7-7,7s-7-3.134-7-7C50.999,145.761,54.134,142.626,57.999,142.626z
	 M120.397,47.736V10.396l43.802,40.953h-40.196C122.014,51.35,120.397,49.729,120.397,47.736z"
            />
          </svg>
          <h1 className="text-lg md:text-2xl lg:text-3xl  font-bold">
            Application
          </h1>
          <p className="text-sm  md:text-base text-gray-700">
            Submit your resume and a cover letter highlighting your skills and
            passion for technology. Our team reviews applications carefully to
            identify candidates who align with our vision and values.
          </p>
        </div>
        <div className="text-center border bg-white p-8 md:p-14 rounded-3xl flex flex-col justify-start items-center gap-4">
          <svg
            className="fill-current"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            viewBox="0 0 943.118 943.118"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#082f49", stopOpacity: 1 }}
                />
                <stop
                  offset="30%"
                  style={{ stopColor: "#0369a1", stopOpacity: 1 }}
                />
                <stop
                  offset="70%"
                  style={{ stopColor: "#0284c7", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <g>
              <g>
                <g>
                  <path
                    fill="url(#gradient)"
                    d="M54.182,670.915v189.128c0,11.047,8.955,20,20,20h362.347c-3.137-6.688-4.899-14.143-4.899-22.006V670.915H54.182z"
                  />
                  <path
                    fill="url(#gradient)"
                    d="M30,639.904h24.182h377.446V622.67v-24.418c0-0.229,0.007-0.456,0.009-0.685c0.107-15.218,3.8-29.6,10.277-42.337
				c2.796-5.496,6.107-10.688,9.873-15.506c4.478-5.729,9.597-10.934,15.245-15.507c16.361-13.248,37.182-21.197,59.827-21.197
				h22.555v-43.313c0-32.846-26.627-59.473-59.473-59.473h-53.809c-10.504,0-19.628,7.229-22.029,17.455l-25.013,106.529
				l-3.642,15.507l-2.578,10.977c-0.36,1.538-0.785,3.049-1.271,4.528h-16.584c-0.183-5.188-0.711-10.367-1.577-15.506
				c-0.148-0.892-0.306-1.779-0.476-2.666l-3.326-12.841l-19.571-75.542l15.62-34.473c2.965-6.545-1.82-13.968-9.006-13.968h-33.525
				c-7.186,0-11.972,7.423-9.006,13.968l15.62,34.473l-20.313,75.542l-3.086,11.478c-0.268,1.339-0.506,2.683-0.728,4.029
				c-0.848,5.14-1.36,10.317-1.527,15.506h-15.88c-0.484-1.48-0.909-2.99-1.271-4.528l-2.578-10.977l-3.641-15.508l-25.013-106.525
				c-2.401-10.227-11.524-17.455-22.029-17.455h-53.808c-32.846,0-59.473,26.627-59.473,59.473v64.513v15.506v15.506H30
				c-16.568,0-30,13.431-30,30v24.674C0,626.474,13.432,639.904,30,639.904z"
                  />
                  <path
                    fill="url(#gradient)"
                    d="M329.919,368.094c73.717,0,133.477-59.76,133.477-133.477V92.744c0-18.391-16.561-32.347-34.686-29.233
				c-39.276,6.747-128.839,24.62-184.565,35.864c-27.752,5.599-47.704,29.986-47.704,58.297v76.946
				C196.442,308.335,256.202,368.094,329.919,368.094z"
                  />
                  <path
                    fill="url(#gradient)"
                    d="M526.859,533.021c-10.345,0-20.121,2.418-28.812,6.703c-7.723,3.809-14.576,9.102-20.201,15.506
				c-9.95,11.325-16.036,26.118-16.204,42.337c-0.002,0.229-0.017,0.455-0.017,0.685v24.418v17.234v15.505v15.506v187.122
				c0,12.154,9.853,22.006,22.005,22.006h334.086h103.396c12.153,0,22.006-9.852,22.006-22.006V598.252
				c0-31.565-22.422-57.893-52.209-63.928c-4.207-0.852-8.562-1.303-13.021-1.303H549.414H526.859L526.859,533.021z"
                  />
                  <path
                    fill="url(#gradient)"
                    d="M702.375,497.769c80.854,0,146.4-65.546,146.4-146.4v-84.396c0-31.052-21.886-57.8-52.322-63.941
				c-61.123-12.332-159.355-31.935-202.434-39.336c-1.879-0.323-3.743-0.478-5.577-0.478c-17.574,0-32.468,14.276-32.468,32.542
				v155.609C555.975,432.223,621.52,497.769,702.375,497.769z"
                  />
                </g>
              </g>
            </g>
          </svg>
          <h1 className="text-lg md:text-2xl lg:text-3xl font-bold">
            Interview
          </h1>
          <p className="text-sm  md:text-base text-gray-700">
            If shortlisted, you’ll participate in a series of interviews,
            including technical assessments and discussions with our team. This
            is your chance to showcase your expertise and learn more about
            BawdicSoft.
          </p>
        </div>
        <div className="text-center border bg-white p-8 md:p-14 rounded-3xl flex flex-col justify-start items-center gap-4">
          <svg
            className="fill-current"
            width="50px"
            height="50px"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#082f49", stopOpacity: 1 }}
                />
                <stop
                  offset="30%"
                  style={{ stopColor: "#0369a1", stopOpacity: 1 }}
                />
                <stop
                  offset="70%"
                  style={{ stopColor: "#0284c7", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <path
              d="M452,120h-76C376,53.726,322.274,0,256,0h0c-66.274,0-120,53.726-120,120H60c-33.137,0-60,26.863-60,60v272  c0,33.137,26.863,60,60,60h392c33.137,0,60-26.863,60-60V180C512,146.863,485.137,120,452,120z M256,60c33.137,0,60,26.863,60,60  H196C196,86.863,222.863,60,256,60z M402,260v20c0,16.569-13.431,30-30,30h0c-16.569,0-30-13.431-30-30v-20H170v20  c0,16.569-13.431,30-30,30h0c-16.569,0-30-13.431-30-30v-20c-16.569,0-30-13.431-30-30s13.431-30,30-30h292  c16.569,0,30,13.431,30,30S418.569,260,402,260z"
              fill="url(#gradient)"
            />
          </svg>
          <h1 className="text-lg md:text-2xl lg:text-3xl font-bold">
            Onboarding
          </h1>
          <p className="text-sm  md:text-base text-gray-700">
            Once selected, our comprehensive onboarding process ensures you
            integrate seamlessly into our team. You’ll receive training,
            resources, and support to kickstart your journey with BawdicSoft.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RecruitmentSection;
