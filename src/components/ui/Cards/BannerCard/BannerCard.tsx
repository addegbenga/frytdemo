import React, { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
interface IBannerProps {
  data: any;
}

const BannerCard: React.FC<IBannerProps> = ({ data }) => {
  return (
    <section className="flex gap-4 lg:mt-14 ">
      {data.map((item: any, idx: any) => (
        <Fragment key={idx}>
          <Link
            href={{
              pathname: item.link,
              query: { step_view: item.querydata, no: item.no },
            }}
            passHref={true}
          >
            <div className="border border-[#FFEEE8] bg-white shadow-lg rounded-lg w-full pb-1">
              <div className="flex flex-col items-center gap-2 p-3 lg:p-4 lg:py-6 lg:items-start ">
                <div className="lg:hidden">
                  <Image
                    src={item.mobileIcon}
                    width="20"
                    layout="fixed"
                    height="20"
                    alt={item.alt}
                  />
                </div>
                <div className="hidden lg:block">
                  <Image
                    src={item.deskTopIcon}
                    width="35"
                    layout="fixed"
                    height="35"
                    alt={item.alt}
                  />
                </div>
                <h1 className="text-xs font-semibold text-center text-accent-1 lg:hidden">
                  Buy / Ship a car
                </h1>
                <h1 className="hidden text-lg font-semibold text-primary lg:block">
                  {item.name}
                </h1>
                <p className="hidden pr-6 text-sm lg:block text-secondary">
                  Ship your car to anywhere On the globe
                </p>
              </div>
              <div className=" hidden lg:flex justify-end p-4 border-t border-[#FFEEE8]">
                <button className="p-2 text-sm font-semibold border-2 rounded-md border-btn-primary text-accent-1">
                  Get Started
                </button>
              </div>
            </div>
          </Link>
        </Fragment>
      ))}
    </section>
  );
};

export default BannerCard;
