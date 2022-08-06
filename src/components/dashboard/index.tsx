import React, { Fragment } from 'react';
import ProductCard from '@components/ui/Cards/ProductCard';
import Image from 'next/image';
// import Layout from '@components/commons/Layout';
import { Button, Slider } from '@components/ui';
import BannerCard from '@components/ui/Cards/BannerCard';
import RecentCard from '@components/ui/Cards/RecentCard';
import { steps } from '@components/ship_car/types';
import dynamic from 'next/dynamic';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const Layout = dynamic(() => import('@components/commons/Layout'), {
  ssr: false,
});

const data = [
  {
    img: '/assets/images/benz-1.jpg',
    alt: 'hdhd',
  },
  {
    img: '/assets/images/benz-2.jpg',
    alt: 'kdkd',
  },
  {
    img: '/assets/images/benz-3.jpg',
    alt: 'ddkd',
  },
  {
    img: '/assets/images/benz-4.jpg',
    alt: 'ddkd',
  },
  {
    img: '/assets/images/benz-1.jpg',
    alt: 'ddkd',
  },
  {
    img: '/assets/images/benz-1.jpg',
    alt: 'ddkd',
  },
];
const bannerData = [
  {
    deskTopIcon: '/assets/images/car.svg',
    mobileIcon: '/assets/images/carOutline.svg',
    alt: 'hdhd',
    link: '/dashboard/ship_car',
    query: 'step_view',
    querydata: steps.ship_item,
    name: 'Ship a car',
    no: 0,
  },
  {
    deskTopIcon: '/assets/images/box-open-black.svg',
    mobileIcon: '/assets/icons/box-open.svg',
    link: '/dashboard/ship_car',
    query: 'step_view',
    querydata: steps.ship_item,
    name: 'Ship a Loose item',
    no: 0,
  },
  {
    deskTopIcon: '/assets/images/car.svg',
    mobileIcon: '/assets/images/carOutline.svg',
    link: '/dashboard/ship_car',
    query: 'step_view',
    querydata: steps.ship_item,
    name: 'Buy & ship a car',
    no: 0,
  },
];

const recentdata = [
  {
    name: 'Shipping Sedan 2016',
    lastUpdate: '2hrs ago',
    status: 'Ongoing',
  },
  {
    name: 'Shipping Sedan 2016',
    lastUpdate: '2hrs ago',
    status: 'Ongoing',
  },
  {
    name: 'Shipping Sedan 2016',
    lastUpdate: '2hrs ago',
    status: 'Ongoing',
  },
];

export default function DashboardView() {
  const router = useRouter();
  const reactQuery = useQueryClient();
  const auth_data: any = reactQuery.getQueryData(['auth_data']);

  return (
    <Layout>
      {auth_data ? (
        <section className="w-full pb-10 lg:pb-20 bg-[#FFFFFF] ">
          <div className="px-4 mx-auto mt-10 ">
            <div>
              <div className="lg:hidden">
                <Slider>
                  {data.map((item, idx) => (
                    <div key={idx}>
                      <div className="h-[40vh] bg-orange-900 keen-slider__slide  ">
                        <Image
                          src={item.img}
                          width="100"
                          layout="responsive"
                          height="100"
                          alt={item.alt}
                        />
                      </div>
                      <div className="relative z-10 flex justify-between bg-black bg-opacity-50 -mt-[5rem] p-3">
                        <div>
                          <h1 className="font-bold text-white">
                            Lexus Sharpshot 2021
                          </h1>
                          <span className="text-sm text-white">
                            Clearance Deals Available
                          </span>
                        </div>
                        <Button className="px-4 ">Buy Now</Button>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            <div className="flex justify-center lg:border-b pb-14 ">
              <BannerCard data={bannerData} />
            </div>
          </div>
          {/* Desktop Section */}
          <section className="hidden px-10 mt-10 lg:block">
            <h1 className="text-xl font-bold text-primary">
              New Cars For Sale
            </h1>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {data.map((item, idx) => (
                <div key={idx}>
                  <ProductCard img={item.img} alt={item.alt} />
                </div>
              ))}
            </div>
          </section>
          {/* Mobile section */}
          <div className="px-4 lg:hidden">
            <div className="flex items-center justify-between mb-5">
              <h1 className="font-semibold text-primary">Recent Activities</h1>
              <p className="text-sm text-accent-1">View all</p>
            </div>
            <div className="flex flex-col gap-4">
              {recentdata.map((item, idx) => (
                <Fragment key={idx}>
                  <RecentCard props={item} />
                </Fragment>
              ))}
            </div>
          </div>
        </section>
      ) : (
        router.push('/auth/login')
      )}
    </Layout>
  );
}
