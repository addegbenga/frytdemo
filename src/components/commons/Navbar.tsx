import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IoCaretDown, IoNotificationsOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import DropDown from '@components/ui/DropDown/DropDown';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { route } from 'next/dist/server/router';

const data = [
  {
    name: 'Home',
    icon: '/assets/icons/home.svg',
    link: '/dashboard',
  },
  {
    name: 'Orders',
    icon: '/assets/icons/orders.svg',
    link: '/dashboard/orders',
  },
  {
    name: 'Messages',
    icon: '/assets/icons/sms.svg',
    link: '/dashboard/messages',
  },
];
const dropdown = [
  {
    name: 'Setting',
    icon: '/assets/icons/setting-2.svg',
    link: '/dashboard/setting',
  },
  {
    name: 'Support',
    icon: '/assets/icons/24-support 2.svg',
    link: '/support',
  },
  {
    name: 'Logout',
    icon: '/assets/icons/logout.svg',
    link: '/dashboard',
  },
];

interface INavProps {
  userdata: any;
}
const Navbar: React.FC = () => {
  const reactQuery = useQueryClient();
  const auth_data: any = reactQuery.getQueryData(['auth_data']);
  const order_id = reactQuery.getQueryData(['order_id']);

  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const handleOpenDropDown = () => {
    setOpenDropDown(!openDropDown);
  };

  useEffect(() => {
    if (router.asPath.includes('/dashboard/ship_car?') === false) {
      reactQuery.setQueryData(['order_id'], null);
    } else {
      console.log('it includes order id');
    }
  }, []);

  const router = useRouter();
  return (
    <div className="sticky top-0 z-20 w-full py-4 bg-white border-b lg:py-0 ">
      <div className="container flex items-center justify-between px-4 mx-auto ">
        <div className="hidden gap-8 lg:flex">
          {data.map((item, idx) => (
            <div
              key={idx}
              className={` ${
                router.asPath === item.link
                  ? 'border-b-2 border-btn-primary text-accent-1'
                  : 'text-secondary'
              } flex items-center gap-1 py-6  cursor-pointer`}
            >
              <Image
                src={item.icon}
                height={20}
                width={20}
                alt=""
                layout="fixed"
              />
              <Link passHref={true} href={item.link}>
                <h1 className="text-sm ">{item.name}</h1>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 lg:hidden">
          <div className="w-10 h-10 overflow-hidden rounded-full bg-slate-600">
            <Image
              src="/assets/images/profile.svg"
              height={40}
              width={40}
              alt=""
              layout="fixed"
            />
          </div>
          <div>
            <p>
              <span className="italic"> Hello, </span>
              <span className="text-sm font-medium ">
                {' '}
                {auth_data?.firstName} <span> {auth_data?.lastName} </span>{' '}
              </span>
            </p>
          </div>
        </div>
        <div className="lg:hidden">
          <IoNotificationsOutline size={24} className="text-secondary" />
        </div>
        {/* DESKTOP VIEW */}
        <div className="items-center hidden gap-10 lg:flex">
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 overflow-hidden rounded-full">
              <Image
                src="/assets/icons/usa.svg"
                height={20}
                width={20}
                alt=""
                layout="fixed"
              />
            </div>

            <span className="text-sm text-secondary">USD</span>
            <IoCaretDown />
          </div>
          <IoNotificationsOutline size={24} className="text-secondary" />

          <div className="flex items-center gap-3 group ">
            <button className="flex group-focus:border-btn-primary items-center justify-center w-10 h-10 p-0.5  focus:border-btn-primary overflow-hidden border rounded-full ">
              <Image
                src="/assets/images/profile.svg"
                height={40}
                width={40}
                alt=""
                layout="fixed"
              />
            </button>
            <div
              onClick={handleOpenDropDown}
              className="relative flex items-center cursor-pointer"
            >
              <p className="flex gap-1 capitalize">
                {auth_data?.firstName} <span> {auth_data?.lastName} </span>{' '}
              </p>

              <IoCaretDown />
              <DropDown openDropDown={openDropDown}>
                {dropdown.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Image
                      src={item.icon}
                      height={20}
                      width={20}
                      alt=""
                      layout="fixed"
                    />
                    <Link passHref={true} href={item.link}>
                      <p className="text-sm text-primary">{item.name}</p>
                    </Link>
                  </div>
                ))}
              </DropDown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
