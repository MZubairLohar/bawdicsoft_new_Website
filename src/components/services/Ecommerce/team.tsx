import React, { FC, ReactNode, MouseEvent } from 'react';
import needImage from "../../../../public/images/e-commerce/group-people-working-out-business-plan-office-1.jpg"
import Image, { StaticImageData } from 'next/image';
import AnimatedComponentLeft from '@/components/home/animationLeft';
interface TeamSectionProps { }

type imageList = {
    image: StaticImageData
}
const imageData: imageList = { image: needImage }

const TeamSection: FC<TeamSectionProps> = () => {
    console.log(imageData);
    return (
        <div className='bg-gray-200 flex justify-center items-center'>

       <div className=' grid grid-cols-1 gap-5  md:grid-cols-2    py-16'>
        <AnimatedComponentLeft>
        <div>
            <Image src={imageData.image.src} alt='' width={430} height={400} className=' w-full h-60 md:w-[500px] md:h-96  '/>
        </div>
        </AnimatedComponentLeft>
        <div className='max-w-lg lg:max-w-lg  pt-10 px-5  md:pt-5 '>
    <p className='mb-4 text-2xl  font-bold tracking-tight leading-7 md:text-3xl lg:text-4xl '>Why get it done by a professional team?​</p>
    <p className='text-md text-gray-800 leading-6'>Being a business person, you need to focus on building/ procuring your products for the right price, at the right time and making it available to your customers when strategically convenient. There are technical aspect of building a website as a whole lot of features can be integrated into your website which help you run your business easily and enable you to focus more on the core job.</p>
        </div>
       </div>
        </div>

    );
};

export default TeamSection;