import React, { FC, ReactNode, MouseEvent } from 'react';
import needImage from "../../../../public/images/webApplication/Ui-Ux-design.png"
import Image, { StaticImageData } from 'next/image';
import AnimatedComponentRight from '@/components/home/animationRight';
interface UiUxSectionProps { }

type imageList = {
    image: StaticImageData
}
const imageData: imageList = { image: needImage }

const UiUxSection: FC<UiUxSectionProps> = () => {
    console.log(imageData);
    return (
        <div className='bg-sky-950 flex justify-center items-center'>

       <div className=' grid grid-cols-1 gap-5 max-w-7xl md:grid-cols-2    py-16'>
        <div className='max-w-lg lg:max-w-lg  pt-10 px-5  md:pt-5 order-2 md:order-none'>
    <p className='mb-4 text-2xl text-white font-semibold tracking-tight leading-7 md:text-3xl lg:text-4xl '>UI/ UX Design​</p>
    <p className='text-md text-gray-200 leading-6'>Your user interface is your initial impression on the user who may be a potential client or partner for your business. We know the value of a carefully designed user interface and an engaging user experience so we design your UI/ UX considering all the important aspects including a gorgeous colour theme, an emotionally engaging design, ease of access, ease of use, delicately coupled grids, brand representation in design and a lot more. We wireframe everything nice for you and present a mockup so you could practically experience what it is going to look like. Our expert UI and UX developers can sketch your ideas into a visual reality.</p>
        </div>
        {/* <AnimatedComponentRight> */}
        <div>
            <Image src={imageData.image.src} alt='' width={430} height={400} className=' w-full h-60 md:w-[500px] md:h-96  order-1 md:order-none'/>
        </div>
        {/* </AnimatedComponentRight> */}
       </div>
        </div>

    );
};

export default UiUxSection;