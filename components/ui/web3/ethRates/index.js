import { useEthPrice, COURSE_PRICE } from "@components/hooks/useEthPrice";
import { Loader } from "@components/ui/common";
import Image from "next/image";

export default function EthRates() {
  const {
    eth: { data: price, perItem },
  } = useEthPrice();

  return (
    <div className="flex flex-col xs:flex-row text-center">
      <div className="p-6 border drop-shadow rounded-md mr-2">
        <div className="flex items-center justify-center">
          {price ? (
            <>
              <Image
                layout="fixed"
                height="35"
                width="35"
                src="/small-eth.webp"
                alt="ETH"
              />
              <span className="text-xl font-bold"> = {price}$</span>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <Loader />
            </div>
          )}
        </div>
        <p className="text-lg text-gray-500">Current eth Price</p>
      </div>

      <div className="p-6 border drop-shadow rounded-md">
        <div className="flex items-center justify-center">
          {price ? (
            <>
              <span className="text-xl font-bold">{perItem}</span>
              <Image
                layout="fixed"
                height="35"
                width="35"
                src="/small-eth.webp"
                alt="ETH"
              />

              <span className="text-xl font-bold">= {COURSE_PRICE}$</span>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <Loader />
            </div>
          )}
        </div>
        <p className="text-lg text-gray-500">Price per course</p>
      </div>
    </div>
  );
}
