import React, { FC, ReactNode, MouseEvent } from 'react';
import heroImage from "../../../../public/images/webApplication/WebApplication.jpg"
import { StaticImageData } from 'next/image';
interface deFiSectionProps { }

type imageList = {
    image: StaticImageData
}
const imageData: imageList = { image: heroImage }

const HeroSection: FC<deFiSectionProps> = () => {
    console.log(imageData);
    return (
        <section className=" pt-32 md:pt-0 bg-center bg-cover bg-no-repeat  bg-gray-500 bg-blend-multiply" style={{
            backgroundImage: `url(${imageData.image.src})`,
            height: 'calc(100vh - 48px)', 
        }}>
            <div className="px-4 mx-auto  max-w-7xl text-center  md:pt-56 lg:py-56">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white  lg:text-6xl -ml-30">  
                Crypto Token Development​</h1>
                <p className="mb-8  md:text-lg font-normal text-gray-300 lg:text-xl sm:px-16 ">
Crypto Token Development
Utilize our expertise in developing trusted, secured and customized crypto tokens and instantly deploy any service of your choice on the Blockchain.

                </p>

            </div>
        </section>

    );
};

export default HeroSection;