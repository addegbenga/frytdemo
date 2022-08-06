import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import Image from 'next/image';

const data = [
  {
    name: 'Fund Wallet',
    icon1: '/assets/icons/notification-2.svg',
    icon2: '/assets/icons/polaris.svg',
    account: 'Polaris *** *** 4865',
    price: '$45K',
    time: '9:00am',
  },
  {
    name: 'Withdraw  From Wallet',
    icon1: '/assets/icons/notification-2.svg',
    icon2: '/assets/icons/polaris.svg',
    account: 'Polaris *** *** 4865',
    price: '$45K',
    time: '9:00am',
  },
  {
    name: 'Delivery Payment',
    icon1: '/assets/icons/notification-2.svg',
    icon2: '/assets/icons/polaris.svg',
    account: 'Polaris *** *** 4865',
    price: '$45K',
    time: '9:00am',
  },
  {
    name: 'Car Purchase Down Payments',
    icon1: '/assets/icons/notification-2.svg',
    icon2: '/assets/icons/polaris.svg',
    account: 'Polaris *** *** 4865',
    price: '$45K',
    time: '9:00am',
  },
  {
    name: 'Car Purchase Down Payments',
    icon1: '/assets/icons/notification-2.svg',
    icon2: '/assets/icons/polaris.svg',
    account: 'Polaris *** *** 4865',
    price: '$45K',
    time: '9:00am',
  },
];

// Todo: Make this component reusable

const TransactionView: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between mt-20">
        <h1 className="text-lg font-semibold text-primary">
          Recent Transactions
        </h1>
        <IoIosSearch size={20} />
      </div>
      <div className="flex flex-col gap-3 mt-8">
        {data.map((item, idx: any) => (
          <section
            key={idx}
            className="flex justify-between pb-6 border-b border-opacity-10"
          >
            <div className="flex items-center gap-3">
              <Image
                src={item.icon1}
                alt="icon"
                height="30"
                width="30"
                layout="fixed"
              />
              <div>
                <h1 className="text-sm font-semibold">{item.name}</h1>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 overflow-hidden rounded-full">
                    <Image
                      src={item.icon2}
                      alt="icon"
                      height="18"
                      width="18"
                      layout="fixed"
                    />
                  </div>

                  <span className="text-xs text-secondary">{item.account}</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-success ">
                {item.price}
              </p>
              <span className="text-xs text-secondary">{item.time}</span>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default TransactionView;
