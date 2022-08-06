import MySelect from '@components/ui/Input/SelectInput';
import { ship_loose_steps as steps } from './types';
import Image from 'next/image';
import React from 'react';
import { Button } from '@components/ui';
import { useRouter } from 'next/router';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Link from 'next/link';

interface ISummaryProps {
  car_manufacturer: any;
  car_model: any;
  car_year: any;
  color: any;
  transition_type: any;
  auto_number: any;
  shipping_method: any;
  pickupDate: any;
  pickup_houseNumber: any;
  pickup_country: any;
  pickup_province: any;
  pickup_postalCode: any;
  pickup_streetName: any;
  shippingDate: any;
  shipping_houseNumber: any;
  shipping_country: any;
  shipping_province: any;
  shipping_postalCode: any;
  shipping_streetName: any;
}

const Ship_loose_step_4: React.FC<ISummaryProps> = ({ ...props }) => {
  const router = useRouter();

  const handleContinue = () => {
    const txt = (router.query.step_view = steps.ship_payment_1);
    router.push({
      pathname: '/dashboard/Ship_loose_car',
      query: { step_view: txt, no: 4 },
    });
  };

  return (
    <div className="w-1/2 p-5 overflow-x-hidden bg-white border border-t-4 rounded-md shadow-md border-t-accent-1 h-fit ">
      <Link
        passHref={true}
        href={{
          pathname: '/dashboard/Ship_loose_car',
          query: { step_view: steps.ship_address, no: 2 },
        }}
      >
        <button className="mb-5 flex cursor-pointer items-center gap-1 text-xs text-[#304157] font-medium ">
          <IoIosArrowRoundBack size={24} />
          Previous
        </button>
      </Link>
      <div>
        <p className="text-xs text-secondary">Step 4/5</p>
        <h1 className="text-[#0E172C] font-semibold">Request Summary</h1>
      </div>
      <h1 className="my-8 font-medium text-accent-1">1. Car Information </h1>
      <section>
        <div className="flex items-center mt-10">
          <h1 className="w-1/3 text-sm text-primary">About Manufacturer</h1>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <div className="grid grid-cols-2 gap-10">
            <MySelect
              label="Select Car Manufacturer"
              defaultValue={props.car_manufacturer?.name}
            />
            <MySelect
              label="Select Car Model"
              defaultValue={props.car_model?.name}
            />
          </div>
          <div className="grid grid-cols-2 gap-10">
            <MySelect
              label="Select Year Manufacturer"
              defaultValue={props.car_year?.name}
            />
            <MySelect label="Set Mileage range" defaultValue="e.g 1300" />
          </div>
        </div>
      </section>
      <section>
        <div className="flex items-center mt-10">
          <h1 className="w-1/3 text-primary ">Appearance</h1>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <div className="grid items-center grid-cols-2 gap-10">
            <MySelect label="Select Color" defaultValue={props.color} />
            <div className="flex flex-col">
              <span className="-mt-1 text-sm text-secondary">
                Choose Transtion type
              </span>
              <div className="flex gap-10 mt-2 ">
                <div className="flex items-center gap-1 ">
                  <input
                    className="custom-radio"
                    type="radio"
                    id="html"
                    name="fav_language"
                    defaultChecked={props.transition_type === 1 ? true : false}
                  />
                  <label className="text-secondary" htmlFor="manual">
                    Auto
                  </label>
                </div>
                <div className="flex items-center gap-1 ">
                  <input
                    className="custom-radio"
                    type="radio"
                    id="html"
                    name="fav_language"
                    defaultChecked={props.transition_type === 2 ? true : false}
                  />
                  <label className="text-secondary" htmlFor="manual">
                    Manual
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <MySelect
              label="How many sedan do you want"
              defaultValue={props.auto_number}
            />
            <MySelect
              label="Preffered shipping method"
              defaultValue={props.shipping_method?.type}
            />
          </div>
        </div>
      </section>
      <section className="container mt-5 border border-dashed h-[15rem] flex justify-center  ">
        <div>
          <div className="w-[6rem] h-[6rem] mx-auto mt-10">
            <Image
              src="/assets/images/upload-image.svg"
              alt="uplaod"
              layout="responsive"
              height="100%"
              width="100%"
            />
          </div>

          <h1 className="mt-4 text-xl font-bold text-center text-primary">
            Upload Image of your car
          </h1>
          <p className="text-sm text-center text-secondary">
            Drag and drop or <span className="text-accent-1">Select file</span>{' '}
            from your computer
          </p>
        </div>
      </section>
      <section className="flex flex-col gap-8 mt-8">
        <div>
          <h1 className="font-semibold text-accent-1 ">2. Pickup Address</h1>
          <div className="flex items-center justify-between">
            <p className="max-w-xs text-xs text-secondary">
              {props.pickup_streetName}
            </p>
            <div>
              <h1 className="text-sm text-[#304157]">{props.pickupDate}</h1>
              <span className="text-xs text-secondary">2:30PM</span>
            </div>
          </div>
        </div>
        <div>
          <h1 className="font-semibold text-accent-1">2. Delivery Address</h1>
          <div className="flex items-center justify-between">
            <p className="max-w-xs text-xs text-secondary">
              {props.shipping_streetName}
            </p>
            <div>
              <h1 className="text-sm text-[#304157]">{props.shippingDate}</h1>
              <span className="text-xs text-secondary">2:30PM</span>
            </div>
          </div>
        </div>
      </section>
      <div className="flex justify-center mt-4">
        <Button onClick={() => handleContinue()} className="w-full py-2 ">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Ship_loose_step_4;
