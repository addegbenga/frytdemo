import Layout from '@components/commons/OtherLayout';
import AgentCard from '@components/ui/Cards/AgentCard/AgentCard';
import DisputeCard from '@components/ui/Cards/DisputeCard/DisputeCard';
import GoogleMap from '@components/ui/GoogleMap/GoogleMap';
import { IoIosArrowForward, IoMdArrowBack } from 'react-icons/io';
import Steps from '@components/ui/OrderStepStatus';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import Link from 'next/link';
import router from 'next/router';

let mobileViewData = {
  'Pickup/Delivery Agent': [
    {
      name: 'Shipping Sedan 2016',
      status: 'Ongoing',
      lastUpdate: '2hrs Ago',
    },
  ],
  'Shipping Agent': [
    {
      name: 'Shipping Sedan 2016',
      status: 'Ongoing',
      lastUpdate: '2hrs Ago',
    },
  ],
};
const data = {
  status: 'Not shipped Yet',
  qty: '02',
  category: 'Loose',
  pickAddress:
    'Sector F car car wash by green access Pharmacy, F.H.A Lugbe Airport Road, Abuja',
  shipAddress:
    'Sector F car car wash by green access Pharmacy, F.H.A Lugbe Airport Road, Abuja',
  trackingNumber: 'Not Yet Assigned',
};
const data2 = [
  {
    title: 'Assigning Agents',
    desc: 'Ongoing',
    icon: '',
    date: '9 Jul, 12:00am',
    active: true,
  },
  {
    title: 'Order Pickuped Up',
    desc: 'Pending',
    icon: '',
    date: '9 Jul',
    active: false,
  },
  {
    title: 'Order Shipped',
    desc: 'Pending',
    icon: '',
    date: '',
    active: true,
  },
  {
    title: 'Order Has Arrived Nigeria',
    desc: 'Pending',
    icon: '',
    date: '',
    active: false,
  },
  {
    title: 'Clear Order',
    desc: 'Pending',
    icon: '',
    date: '',
    active: false,
  },
];
// Todo: Refactor to its own module
const MobileViewTabs = () => {
  return (
    <div className="w-full sm:px-0 ">
      <Tab.Group>
        <Tab.List className="flex px-1 py-1 rounded-xl ">
          {Object.keys(mobileViewData)?.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full  h-14 focus:outline-none  text-sm font-medium leading-5 text-secondary',
                  '',
                  selected
                    ? ' border-b-2 border-accent-1 text-accent-1'
                    : 'text-secondary  '
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(mobileViewData).map((posts: any, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl  p-3',
                'ring-white focus:outline-none '
              )}
            >
              <Link passHref={true} href={`/dashboard/orders/${idx}`}>
                <div className="flex flex-col gap-2">
                  {posts.map((post: any, idx: any) => (
                    <div className="cursor-pointer" key={idx}>
                      <AgentCard />
                    </div>
                  ))}
                </div>
              </Link>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
const MobileView = () => {
  return (
    <div className="px-4 py-6 lg:hidden">
      <div className="flex gap-2 pb-3 border-b ">
        <div className="flex flex-col gap-2 ">
          <div className="flex items-center gap-2">
            <IoMdArrowBack onClick={() => router.back()} />
            <h1 className="font-bold">Shipping Sedan 2016</h1>
          </div>

          <p className="text-sm text-secondary">Order ID:4abdulqahar/05322 </p>
        </div>
      </div>

      <div className="flex gap-20 mt-4 ">
        <div>
          <h1 className="text-xs text-secondary">Service</h1>
          <p className="text-sm">Buy and Ship</p>
        </div>
        <div>
          <h1 className="text-xs text-secondary">Quantity</h1>
          <p className="text-sm">02</p>
        </div>
      </div>
      <div className="flex justify-between my-4 mb-6 text-sm font-semibold text-accent-1">
        <div>
          <h1 className="text-sm lg:text-base">Item details</h1>
        </div>
        <div>
          <h1 className="text-sm lg:text-base">Raise Disputes</h1>
        </div>
      </div>
      <div className="">
        <Steps directionLeft={false} directionRight={true} data={data2} />
      </div>
      <div className="flex flex-col gap-8 py-8">
        <div>
          <h1 className="text-xs mb-2 font-bold text-[#44556B]">
            Pickup Address
          </h1>
          <p className="text-sm text-secondary">
            Sector F car car wash by green access Pharmacy, F.H.A Lugbe Airport
            Road, Abuja
          </p>
        </div>
        <div>
          <h1 className="text-xs font-bold mb-2 text-[#44556B]">
            Shipping Address
          </h1>
          <p className="text-sm text-secondary">
            Sector F car car wash by green access Pharmacy, F.H.A Lugbe Airport
            Road, Abuja
          </p>
        </div>
      </div>
      <div className="">
        <MobileViewTabs />
      </div>
    </div>
  );
};

export default function index() {
  return (
    <Layout>
      <section className="">
        {/* Desktop View */}
        <div className="sticky top-[4rem] z-10 hidden bg-white border-b lg:block">
          <div className="  max-w-7xl lg:mx-auto py-[1rem] w-full ">
            <h1 className="flex items-center gap-1 text-xl">
              Orders{' '}
              <span>
                <IoIosArrowForward size={18} className="text-[#F1592D]" />
              </span>
              <span className="text-sm text-[#F1592D]">
                Order/4abdulqahar/05322
              </span>
            </h1>
          </div>
        </div>
        <div className="self-start hidden overflow-y-auto lg:flex 2xl:container 2xl:mx-auto">
          <div className="pb-20 mx-auto mt-10">
            <DisputeCard data={data} />
            <div className="grid w-full grid-cols-2 gap-4 mt-7">
              <AgentCard />
              <AgentCard />
            </div>
          </div>
          <div className="hidden pb-20  lg:block sticky top-[30rem]  ml-auto -mt-20 bg-white lg:min-w-[25rem] 2xl:w-[30rem] border">
            <div className="h-[25rem] ">
              <GoogleMap label="Ship" />
            </div>
            <div>
              <h1 className="py-5 text-sm text-center border-b text-secondary">
                Shipment will arrive in{' '}
                <span className="font-bold text-accent-1">
                  Lagos Nigeria on 18 May 2022
                </span>
              </h1>
            </div>
            <div className="flex justify-center mt-10">
              <Steps data={data2} directionLeft={false} directionRight={true} />
            </div>
          </div>
        </div>
        {/* Desktop View */}
        {/* Mobile View */}
        <MobileView />
        {/* Mobile View */}
      </section>
    </Layout>
  );
}
