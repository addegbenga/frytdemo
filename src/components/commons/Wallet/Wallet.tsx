import React from 'react';
import Image from 'next/image';
import TransferView from '@components/transactions';

export default function Wallet() {
  return (
    <div className="lg:min-w-[25rem] 2xl:w-[30rem] overflow-x-hidden h-[100vh] hidden lg:block  ml-auto sticky top-0 bg-white border">
      <div className="p-5 mt-10">
        <h1 className="text-xl font-semibold text-primary">Your Wallet</h1>
        <div className="relative flex justify-center mt-10">
          <div className="-z-10 absolute top-0  bg-[#FFD6CA] h-[202px] w-11/12 rounded-[16px]"></div>
          <div className="rounded-[16px] bg-[#F1592D] h-[195px] w-full text-white relative">
            <Image
              src="/assets/icons/topCurve.svg"
              alt="hh"
              className="absolute z-0 w-full bottom-6"
              layout="fill"
            />
            <Image
              src="/assets/icons/bottomCurve.svg"
              alt=""
              layout="fill"
              className="absolute bottom-0 z-0 w-full"
            />
            <div className="absolute left-0 z-10 flex flex-col items-center justify-center w-full h-full">
              <p className="text-[12px] z-2 text-center">Wallet Ballance</p>
              <h1 className="font-semibold text-[24px] text-center z-2">
                $56,080,000.05
              </h1>
            </div>
          </div>
          <div className="flex justify-center py-6 absolute bottom-[-40px]">
            <button className="bg-white shadow-xl  rounded-[6px] text-sm p-4 text-accent-1 mx-2 font-semibold">
              Fund Wallet
            </button>
            <button className="bg-white shadow-xl rounded-[6px] text-sm p-4 text-accent-1 mx-2 font-semibold">
              Withdraw
            </button>
          </div>
        </div>
        <div className="mt-14">
          <TransferView />
        </div>
      </div>
    </div>
  );
}
