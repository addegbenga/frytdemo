import { Select } from '@components/ui';
import Link from 'next/link';
import router from 'next/router';
import React from 'react';
import { IoArrowBack } from 'react-icons/io5';

const SelectUserType: React.FC = () => {
  return (
    <section className="px-6 py-8 lg:py-0 lg:px-0 lg:flex ">
      <div className="min-h-screen hidden pb-20 lg:block w-[70vw] bg-primary"></div>
      <div className="lg:w-full lg:px-20">
        <div className="flex flex-col lg:hidden ">
          <span className="cursor-pointer" onClick={() => router.back()}>
            <IoArrowBack size={24} />
          </span>
          <h1 className="mt-5 text-2xl font-bold text-primary">
            Create Account
          </h1>
          <p className="max-w-xs pr-10 mt-4 text-secondary">
            Select the type of Account you want to create below
          </p>
        </div>
        <div className="container items-center justify-between hidden py-10 lg:flex">
          <div className="flex flex-col ">
            <h1 className="text-2xl font-bold text-accent-1">Create Account</h1>
            <p>
              (Shipping Agent){' '}
              <span className="font-bold text-accent-1">Change Account</span>
            </p>
          </div>
          <div>
            <h1 className="text-secondary">
              Already in the hub?{' '}
              <span className="font-bold text-accent-1">
                {' '}
                <Link href="/auth/login">Login</Link>
              </span>
            </h1>
          </div>
        </div>
        <div className="my-10 ">
          <Select />
        </div>
      </div>
    </section>
  );
};

export default SelectUserType;
