import React from 'react';
import { IoLocationOutline, IoTerminal } from 'react-icons/io5';
import { BsArrowUpRightSquare } from 'react-icons/bs';
import { TbShip } from 'react-icons/tb';

interface IDisputeProps {
  data: {
    status: string;
    trackingNumber: string;
    category: string;
    qty: string;
    pickAddress: string;
    shipAddress: string;
  };
}
const DisputeCard: React.FC<IDisputeProps> = ({ data }) => {
  return (
    <section className="p-10 bg-white border rounded-2xl ">
      <div className="flex items-center justify-between pb-5 border-b">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <TbShip className="text-accent-1" size={24} />
            <h1 className="text-2xl font-bold">Ship Loose Item</h1>
          </div>

          <div className="bg-[#FFF7F4] border-[#FFE6DD] text-[#FF5805] p-2 rounded-full text-sm px-4">
            <span>{data.status}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#5650D1] font-bold">Raise Dispute</span>
          <BsArrowUpRightSquare size={20} className="text-[#5650D1]  " />
        </div>
      </div>
      <section className="flex flex-col gap-20 lg:flex-row">
        <div className="flex flex-col gap-4 mt-6">
          <div>
            <h1 className="text-secondary">Service</h1>
            <p>Ship</p>
          </div>
          <div>
            <h1 className="text-secondary">Tracking Number</h1>
            <p className="text-[#F2A809]">{data.trackingNumber}</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <IoLocationOutline className="text-accent-1" size={20} />
              <h1 className="font-medium text-secondary">Pickup Address</h1>
            </div>
            <p className="max-w-xs ml-6 text-sm text-secondary">
              {data.pickAddress}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <div>
            <h1 className="text-secondary">Quantity</h1>
            <p>{data.qty}</p>
          </div>
          <div>
            <h1 className="text-secondary">Item Category</h1>
            <p className="text-[#F2A809]">{data.category}</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <IoLocationOutline className="text-accent-1" size={20} />
              <h1 className="font-medium text-secondary">Shipping Address</h1>
            </div>
            <p className="max-w-xs ml-6 text-sm text-secondary">
              {data.shipAddress}
            </p>
          </div>
        </div>
      </section>
      <div className="flex items-center justify-center gap-1 mt-14">
        <h1 className="font-bold text-accent-1">Item Details</h1>
        <TbShip className="text-accent-1" size={24} />
      </div>
    </section>
  );
};

export default DisputeCard;
