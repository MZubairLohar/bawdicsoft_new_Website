import { FC } from "react"
interface WeOfferSectionProps { }
const PlatFormSection: FC<WeOfferSectionProps> = () => {
    return (
        <div >
            <div className="bg-sky-950 flex justify-center">
            <div className="pt-10   max-w-7xl md:pt-16 pb-20 md:pb-20 ">

                <p className="text-4xl font-bold text-center text-white">PLATFORM</p>
                <div className="grid grid-cols-1 md:grid-cols-2 pt-8  md:px-16 gap-10">

                    <div className=" border-2 hover:border-sky-500   p-6   border-gray-200 rounded-lg shadow ">
                        <span >
                            <h5 className="mb-2 text-3xl font-bold tracking-tight  text-white  ">Shopify</h5>
                        </span>
                        <p className="mb-3 text-lg  text-white ">Shopify is hands down one of the best platforms to build your E-Commerce store. It provides features like your tailored storefront which can be further customized to your needs. Data can be integrated with Google Analytics to get useful insights for your business.</p>
                        <ul className="text-white list-disc pl-8">
                            <li >Built-in blogging engine</li>
                            <li>SEO</li>
                            <li>Mobile App functionality</li>
                            <li>Web hosting and Security</li>
                            <li>Round the clock support</li>
                        </ul>
                    </div>
                    <div className=" border-2 hover:border-sky-500  p-6   border-gray-200 rounded-lg shadow  ">
                        <span >
                            <h5 className="mb-2 text-3xl font-bold tracking-tight  text-white  ">Wix</h5>
                        </span>
                        <p className="mb-3 text-lg  text-white ">Wix is an awesome platform built with in-built features such as visitor analytics, inventory tracking, payment/ refund handling and auto invoicing. Not limited to that, you get SEO and workflow integration to make it easy to use, hassle free and profitable.</p>
                        <ul className="text-white list-disc pl-8 ">
                            <li >Shipping and Tax calculatione</li>
                            <li>Customized Shopping Carts</li>
                            <li>Automated order processing</li>
                            <li>Payment Scheduling</li>
                         
                        </ul>
                    </div>
                    <div className=" border-2 hover:border-sky-500   p-6   border-gray-200 rounded-lg shadow  ">
                        <span >
                            <h5 className="mb-2 text-3xl font-bold tracking-tight text-white  ">WebFlow
</h5>
                        </span>
                        <p className="mb-3 text-lg   text-white ">Webflow provides fully customizable web building while integrating your E-Commerce business to Zapier. It's HTML/ CSS code allows for full customization and web integration</p>
                        <ul className="text-white list-disc pl-8">
                            <li >Advanced Design building</li>
                            <li>Tons of Designs</li>
                            <li>Parallax Scrolling</li>
                            <li>Animations</li>
                         
                        </ul>
                    </div>
                    <div className=" border-2 hover:border-sky-500   p-6   border-gray-200 rounded-lg shadow  ">
                        <span >
                            <h5 className="mb-2 text-3xl font-bold tracking-tight  text-white  ">WordPress
</h5>
                        </span>
                        <p className="mb-3 text-lg   text-white ">Plugins is the word that buzzez in mind when WordPress is said. With thousands of plugins to choose from, there are very limited capabilities that WordPress cannot offer for your E-Store. With unlimited customization and integration capabilities, WordPress is capable of building state of the art E-Commerce solutions for your business.</p>
                        <ul className="text-white  list-disc pl-8">
                            <li >WooCommerce (Specifically built E-Commerce plugin)</li>
                            <li>Multi Development (Multi side)</li>
                            <li>Archives</li>
                            <li>Data security</li>
                         
                        </ul>
                    </div>
                   

                </div>
                <p className="text-gray-200 px-12 text-center pt-8 text-xl">With your professionally built and customized E-Commerce website, your business can grow exponentially as we remove the technological barriers for you by taking care of the technical side of building your web store. Schedule a free consultation with one of our consultants to know more about it.</p>
            </div>
            </div>

       <div className="flex justify-center mx-5 ">
            <div className="bg-sky-900 text-center my-16  rounded-[20px] max-w-7xl   py-8 px-4 flex flex-col justify-center items-center">
                <p className="text-white font-bold text-2xl  md:text-3xl lg:text-4xl">Need tokens? Talk to one of our experts and get a quote on your project.</p>
                <a  className="text-gray-700 max-w-sm font-semibold  text-md px-5 hover:bg-sky-400 hover:text-white py-3 bg-gray-100 mt-5">Talk To Us</a>
            </div>
       </div>

        </div>)
}
export default PlatFormSection;