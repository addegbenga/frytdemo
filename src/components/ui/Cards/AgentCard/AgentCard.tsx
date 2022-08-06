import React from 'react';
import Image from 'next/image';

const AgentCard: React.FC = () => {
  return (
    <div className="p-4 pb-10 bg-white border rounded-xl">
      <div className="flex items-center justify-between pb-2 border-b">
        <h1 className="text-sm lg:text-base text-secondary">Delivery Agent</h1>
        <div>
          <h1 className="text-sm text-secondary">Pickup Date</h1>
          <p className="text-xs lg:text-sm">12 jan 2022</p>
        </div>
      </div>

      <div className="flex gap-4 mt-6 ">
        <div className="mt-1">
          <Image
            src="/assets/images/profile.svg"
            layout="fixed"
            height={50}
            width={50}
            alt="profile"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-sm font-medium lg:text-base text-secondary">
            Abdulqahar Ozovehe Usman
          </h1>
          <p className="text-sm text-secondary">
            Has Completed{' '}
            <span className="text-sm font-semibold text-accent-1">
              24 Delivery
            </span>{' '}
          </p>
          <div className="-mt-6">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/icons/rating.svg"
                layout="fixed"
                height={70}
                width={70}
                alt="profile"
              />
              <span className="text-sm text-secondary">4.5 /5.0</span>
            </div>
            <p className="-mt-6 text-xs text-secondary">
              From Over 15 customers
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        <Image
          src="/assets/icons/sms-colored.svg"
          layout="fixed"
          height={25}
          width={25}
          alt="profile"
        />
        <h1 className="text-accent-1">Message Agent</h1>
      </div>
    </div>
  );
};

export default AgentCard;
