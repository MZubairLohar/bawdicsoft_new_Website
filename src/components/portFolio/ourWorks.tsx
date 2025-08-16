// import Image, { StaticImageData } from 'next/image';
// import React, { FC, ReactNode, MouseEvent } from 'react';
// import modelWebsitesImg from "../../../public/images/portFolio/modelWebsites.png"
// import corporateWebsitesImg from "../../../public/images/portFolio/corporateWebsites.jpg"
// import ecommerceImg from "../../../public/images/portFolio/ecommerce.jpg"
// import blogsImg from "../../../public/images/portFolio/blogs.jpg"
// import portfolioImg from "../../../public/images/portFolio/portfolio.jpeg"
// import landingPagesImg from "../../../public/images/portFolio/landingPages.jpg"
// import landingPagesImg1 from "../../../public/images/WebApplication.jpg"


// interface ourWorksProps { }

// type MyImageList = {
//     title: string,
//     image: StaticImageData
// }
// const imgList: MyImageList[] = [{ title: "3D Models Websites", image: landingPagesImg1 }, { title: "Corporate Websites", image: corporateWebsitesImg }, { title: "E-commerce", image: ecommerceImg }, { title: "Blog", image: blogsImg }, { title: "Portfolios", image: portfolioImg }, { title: "Landing Pages", image: landingPagesImg },]

// const OurWorks: FC<ourWorksProps> = () => {
//     {console.log(imgList)}
//     return (
//         <div>
//             <p className='text-3xl md:text-4xl font-bold text-center '>Our Works</p>
//             <div className=' py-20 flex justify-center items-center flex-wrap gap-5  sm:px-32'>
//                 {imgList.map((idx) => {
//                     return <section key={Math.random()} className="group transition-all h-[260px] w-[400px] bg-center bg-cover bg-no-repeat  bg-gray-400 hover:bg-gray-600 bg-blend-multiply" style={{ backgroundImage: `url(${idx.image.src})` }}>
//                         <div className=" mx-auto pt-32 text-center ">
//                             <h1 className="mb-4 text-lg font-bold tracking-tight leading-none text-white  hidden transition-transform transform group-hover:bg-white-500 group-hover:block  ">{idx.title}​</h1>
//                             <p className="mb-4 text-sm  tracking-tight leading-none text-white  hidden transition-transform transform group-hover:bg-white-500 group-hover:block  ">{idx.title}​</p>
//                         </div>
//                     </section>
//                 })}

//             </div>
//         </div>
//     );
// }
// export default OurWorks;
