import { allData } from "@/components/allData";

const ProductDetails = ({ params }: { params: { productId: string } }) => {
  const productOneDetail = allData.find(
    (product) => product.id.toString() === params.productId.toString()
  );
  console.log(params);
  console.log(productOneDetail);
  return (
    <div className="flex justify-center bg-gray-100">
      {productOneDetail?.Video && (
        <div className="flex   max-w-7xl">
          {/* video section */}
          <div className="grid grid-cols-1 md:grid-cols-1 content-center lg:grid-cols-2">
            <div className=" p-5  mx-auto pt-8 px-8 md:pt-16 md:px-16  ">
              <video
                className="w-full h-auto border-gray-500 border rounded-md shadow-xl shadow-gray-700 "
                autoPlay
                controls
              >
                <source src={productOneDetail.Video} type="video/mp4" />
              </video>
            </div>
            <div className="flex justify-center pt-16  pb-10 md:pb-8 bg-gray-100 flex-col  pr-5">
              <p className=" text-2xl md:text-3xl font-bold  px-10 lg:px-0 ">
                {productOneDetail?.mainTitle}
              </p>
              <p className="text-md font-md    px-10 md:pl-10 lg:pl-0 md:pr-10  pt-5  ">
                {productOneDetail?.projectDesc}
              </p>
              {productOneDetail?.ourAIpowered ? (
                <p className="text-md font-md    px-10 md:pl-10 lg:pl-0 md:pr-10  pt-5  ">
                  {productOneDetail?.ourAIpowered}
                </p>
              ) : (
                ""
              )}
              {productOneDetail?.thinkAboutIt ? (
                <p className="text-md font-md    px-10 md:pl-10 lg:pl-0 md:pr-10  pt-5  ">
                  {productOneDetail?.thinkAboutIt}
                </p>
              ) : (
                ""
              )}
              {productOneDetail?.thisIsnt ? (
                <p className="text-md font-md    px-10 md:pl-10 lg:pl-0 md:pr-10  pt-5  ">
                  {productOneDetail?.thisIsnt}
                </p>
              ) : (
                ""
              )}
              {productOneDetail?.WithOurEas ? (
                <p className="text-md font-md    px-10 md:pl-10 lg:pl-0 md:pr-10  pt-5  ">
                  {productOneDetail?.WithOurEas}
                </p>
              ) : (
                ""
              )}
              {productOneDetail?.iReally ? (
                <p className="text-md font-md    px-10 md:pl-10 lg:pl-0 md:pr-10  pt-5  ">
                  {productOneDetail?.iReally}
                </p>
              ) : (
                ""
              )}
              {productOneDetail?.theGoal ? (
                <p className="text-md font-md    px-10 md:pl-10 lg:pl-0 md:pr-10   pt-5">
                  {productOneDetail?.theGoal}
                </p>
              ) : (
                ""
              )}
              {productOneDetail?.imReally ? (
                <p className="text-md font-md    px-10 md:pl-10 lg:pl-0 md:pr-10  pt-5  ">
                  {productOneDetail?.imReally}
                </p>
              ) : (
                ""
              )}
              {productOneDetail?.thisWould ? (
                <p className="text-md font-md    px-10 md:pl-10 lg:pl-0 md:pr-10  pt-5  ">
                  {productOneDetail?.thisWould}
                </p>
              ) : (
                ""
              )}
              {productOneDetail?.imExcited ? (
                <p className="text-md font-md    px-10 md:pl-10 lg:pl-0 md:pr-10  pt-5  ">
                  {productOneDetail?.imExcited}
                </p>
              ) : (
                ""
              )}
              {productOneDetail.foodRecognization ? (
                <div className="pl-10  pr-10 lg:pr-0 lg:pl-0">
                  <b className="text-md font-bold    ">
                    {productOneDetail?.foodRecognization}
                  </b>
                  <span className="text-md font-md        ">
                    {productOneDetail.foodRecognizationDec}
                  </span>
                </div>
              ) : (
                ""
              )}
              {productOneDetail.qualityAssessment ? (
                <div className="pl-10  pr-10 lg:pr-0 lg:pl-0">
                  <b className="text-md font-bold     ">
                    {productOneDetail?.qualityAssessment}
                  </b>
                  <span className="text-md font-md      ">
                    {productOneDetail.qualityAssessmentDec}
                  </span>
                </div>
              ) : (
                ""
              )}
              {productOneDetail.realTimeMonitoring ? (
                <div className="pl-10  pr-10 lg:pr-0 lg:pl-0">
                  <b className="text-md font-bold     ">
                    {productOneDetail?.realTimeMonitoring}
                  </b>
                  <span className="text-md font-md       ">
                    {productOneDetail.realTimeMonitoringDec}
                  </span>
                </div>
              ) : (
                ""
              )}
              {productOneDetail.Applications ? (
                <div className="pl-10 pr-10 lg:pr-0 lg:pl-0">
                  <b className="text-md font-bold     ">
                    {productOneDetail?.Applications}
                  </b>
                  <span className="text-md font-md      ">
                    {productOneDetail.applicationsDec}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* text section */}
        </div>
      )}
    </div>
  );
};
//
export default ProductDetails;
