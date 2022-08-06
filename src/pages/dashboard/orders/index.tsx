import Layout from '@components/commons/OtherLayout';
import { Table, Tabs } from '@components/ui';
import RecentActivityCard from '@components/ui/Cards/RecentCard';
import { Tab } from '@headlessui/react';
import Link from 'next/link';
import classNames from 'classnames';
let categories = {
  'In Progress': [
    {
      table: <Table />,
    },
  ],
  Completed: [
    {
      table: <Table />,
    },
  ],
};
let mobileViewData = {
  'In Progress': [
    {
      name: 'Shipping Sedan 2016',
      status: 'Ongoing',
      lastUpdate: '2hrs Ago',
    },
    {
      name: 'Shipping Sedan 2016',
      status: 'Ongoing',
      lastUpdate: '2hrs Ago',
    },
    {
      name: 'Shipping Sedan 2016',
      status: 'Ongoing',
      lastUpdate: '2hrs Ago',
    },
  ],
  Completed: [
    {
      name: 'Shipping Sedan 2016',
      status: 'Ongoing',
      lastUpdate: '2hrs Ago',
    },
    {
      name: 'Shipping Sedan 2016',
      status: 'Ongoing',
      lastUpdate: '2hrs Ago',
    },
    {
      name: 'Shipping Sedan 2016',
      status: 'Ongoing',
      lastUpdate: '2hrs Ago',
    },
  ],
};

// Todo: Refactor to its own module
const MobileViewTabs = () => {
  return (
    <div className="w-full max-w-md px-2 sm:px-0 ">
      <Tab.Group>
        <Tab.List className="flex px-1 mx-3 py-1 bg-[#F2F5F8] rounded-xl ">
          {Object.keys(mobileViewData)?.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg h-14 focus:outline-none  text-sm font-medium leading-5 text-secondary',
                  '',
                  selected
                    ? 'bg-white text-accent-1'
                    : 'text-secondary hover:bg-white/[0.12] hover:text-white'
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
                      <RecentActivityCard props={post} />
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

export default function index() {
  return (
    <Layout>
      <div className="sticky top-0 hidden bg-white border-b lg:block">
        <div className=" max-w-7xl lg:mx-auto py-[1rem] w-full items-center ">
          <h1 className="text-xl">Orders</h1>
        </div>
      </div>
      <div className="hidden pb-20 lg:block max-w-7xl lg:mx-auto">
        <Tabs props={categories} />
      </div>
      <div className="py-10 lg:hidden ">
        <MobileViewTabs />
      </div>
    </Layout>
  );
}
