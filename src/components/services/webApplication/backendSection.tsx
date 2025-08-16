import React, { FC, ReactNode, MouseEvent } from 'react';
import needImage from "../../../../public/images/webApplication/backend.jpg"
import Image, { StaticImageData } from 'next/image';
import AnimatedComponentLeft from '@/components/home/animationLeft';
interface backendSectionProps { }

type imageList = {
    image: StaticImageData
}
const imageData: imageList = { image: needImage }

const BackendSection: FC<backendSectionProps> = () => {
    console.log(imageData);
    return (
        <div className='flex justify-center items-center'>

       <div className=' grid grid-cols-1 gap-5 max-w-7xl   md:grid-cols-2    py-16'>
        {/* <AnimatedComponentLeft> */}
        <div>
            <Image src={imageData.image.src} alt='' width={430} height={400} className=' h-60 w-full md:w-[500px] md:h-96  '/>
        </div>
        {/* </AnimatedComponentLeft> */}
        <div className='max-w-lg self-center  lg:max-w-lg   px-5  '>
    <p className='mb-4 text-2xl font-semibold tracking-tight leading-7 md:text-3xl lg:text-4xl '>Backend​</p>
    <p className='text-md text-gray-800 leading-6'>Non-functional links and incorrectly mapped navigation can destroy a website’s whole user experience so backend code is one of the most important factors while building a web application. Our team of expert programmers is capable of creating on-point, errorless backend code that works like a backbone for your entire web experience while integrating your web application with a trusted database to bring security and agility to your online presence.</p>
        </div>
       </div>
        </div>

    );
};

export default BackendSection;