import React from 'react';
import { AiOutlineCar } from 'react-icons/ai';

interface IRecentActivityCardProps {
  props: {
    name: string;
    lastUpdate: string;
    status: string;
  };
}
const RecentActivityCard: React.FC<IRecentActivityCardProps> = ({ props }) => {
  return (
    <div>
      <div className=" lg:bg-[#F2F5F8] border lg:border-0 bg-white sm:opacity-100 rounded-lg p-5 flex items-center bg-opacity-50  ">
        <div className="icon bg-white shadow lg:shadow-none rounded-lg p-2 max-w-[48px] max-h-[48px] flex items-center justify-center text-accent-1 text-2xl">
          <AiOutlineCar />
        </div>
        <div className="flex flex-col gap-1 ml-4">
          <h1 className="font-bold text-sm sm:text-base m-0 capitalize text-[#0E172C]">
            {props.name}
          </h1>
          <h1 className="text-xs font-medium capitalize text-custom-secondary-100 text-secondary ">
            status:
            <span className="font-medium text-[#0E172C]"> {props.status}</span>
          </h1>
        </div>
        <div className="flex flex-col gap-1 ml-auto ">
          <h1 className="text-xs font-medium capitalize text-secondary">
            Last Updated
          </h1>
          <h1 className="font-medium text-xs  text-[#0E172C] capitalize text-right">
            {props.lastUpdate}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default RecentActivityCard;
