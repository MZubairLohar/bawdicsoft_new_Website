import React, { FC, ReactNode, MouseEvent } from 'react';
import heroImage from "../../../../public/images/e-commerce/laptop-shopping-bags-online-shopping-concept.jpg"
import { StaticImageData } from 'next/image';
interface deFiSectionProps { }

type imageList = {
    image: StaticImageData
}
const imageData: imageList = { image: heroImage }

const HeroSection: FC<deFiSectionProps> = () => {
    console.log(imageData);
    return (
        <section className="pt-32 md:pt-0 bg-center bg-cover bg-no-repeat  bg-gray-500 bg-blend-multiply" style={{
            backgroundImage: `url(${imageData.image.src})`,
            height: 'calc(100vh - 48px)', 
        }}>
            <div className="px-4 mx-auto  text-center  md:pt-56 lg:py-56">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white  lg:text-6xl -ml-30">  
              
E-Commerce Solutions​</h1>
                <p className="mb-8  md:text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                Wix, WordPress, Shopify, Webflow. You name it...
We have the solution for all your E-Commerce needs.

                </p>

            </div>
        </section>

    );
};

export default HeroSection;