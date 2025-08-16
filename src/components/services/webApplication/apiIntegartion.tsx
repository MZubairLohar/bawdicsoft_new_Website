import React, { FC, ReactNode, MouseEvent } from 'react';
import needImage from "../../../../public/images/webApplication/apiintigration.jpg"
import Image, { StaticImageData } from 'next/image';
import AnimatedComponentLeft from '@/components/home/animationLeft';
interface ApiIntegrationProps { }

type imageList = {
    image: StaticImageData
}
const imageData: imageList = { image: needImage }

const ApiIntegration: FC<ApiIntegrationProps> = () => {
    console.log(imageData);
    return (
        <div className='flex justify-center items-center'>

       <div className=' grid grid-cols-1 gap-5 max-w-7xl  md:grid-cols-2    py-16'>
        {/* <AnimatedComponentLeft> */}
        <div>
            <Image src={imageData.image.src} alt='' width={430} height={400} className=' h-60 w-full md:w-[500px] md:h-96  '/>
        </div>
        {/* </AnimatedComponentLeft> */}
        <div className='max-w-lg self-center lg:max-w-lg  px-5   '>
    <p className='mb-4 text-2xl  font-semibold tracking-tight leading-7 md:text-3xl lg:text-4xl '>
API Integration​​</p>
    <p className='text-md text-gray-800 leading-6'>Your web application must know what data to save where, and when and how to fetch it back so API integration plays a major role in making your web application fully functional. We provide advanced API integration within while developing your web application to make your data safe, secure, swift and organised.​</p>
        </div>
       </div>
        </div>

    );
};

export default ApiIntegration;