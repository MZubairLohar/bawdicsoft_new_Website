import GetInTouchWithUs from "@/components/contactUs/getInTouch";
import Link from "next/link";
import { FC } from "react"
interface PageNotFoundProps {}

const PageNotFound :FC<PageNotFoundProps> = () => {
return (<div>
    <div className="flex justify-center items-start bg-gray-100 py-32">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 max-w-2xl">
        <div className="flex flex-col items-center gap-4 mx-5 md:mx-0">
            <p className="text-3xl text-gray-700 lg:text-4xl font-semibold">Error</p>
    <h1 className="text-sky-950 font-bold text-6xl lg:text-9xl">404</h1>
        </div>
        <div className=" p-5 md:p-10 lg:p-16 flex flex-col bg-white shadow-2xl gap-3 rounded-3xl">
            <h2 className="text-sky-950 font-bold text-2xl md:text-4xl lg:text-5xl">Page not found</h2>
            <p className="text-sky-950  text-md">Sorry, but the page you were looking for could not be found.</p>
            <Link href={"/"} className="p-2 md:p-4 bg-sky-950 hover:bg-sky-700 text-white text-center rounded-xl">Back Home</Link>
        </div>
    </div>
    </div>
    <GetInTouchWithUs />
</div>)
}
export default PageNotFound;