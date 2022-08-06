import OtherLayout from '@components/commons/OtherLayout';
import React, { useEffect, useState } from 'react';
import { ship_loose_steps as steps } from './types';
import ShippingStep from '@components/ui/OrderStepStatus';
import Ship_step_one from './Ship_step_one';
import Ship_step_two from './Ship_step_two';
import Ship_step_4 from './Ship_step_4';
import Ship_step_3 from './Ship_step_3';

import { useRouter } from 'next/router';
import Ship_Payment_1 from './ShipPayment_1';
import Ship_Payment_2 from './ShipPayment_2';

const data2 = [
  {
    title: 'Car information',
    desc: 'Ongoing',
    icon: '',
    date: '',
    active: true,
  },
  {
    title: 'Pickup Address',
    desc: 'Pending',
    icon: '',
    date: '',
    active: false,
  },
  {
    title: 'Shipping Address',
    desc: 'Pending',
    icon: '',
    date: '',
    active: true,
  },
  {
    title: 'Request Summary',
    desc: 'Pending',
    icon: '',
    date: '',
    active: false,
  },
  {
    title: 'Payments',
    desc: 'Pending',
    icon: '',
    date: '',
    active: false,
  },
];

// Todo: Make this page exact with query strings to avoid blank pages

export default function Index() {
  // State values for step_one
  const [selected, setSelected] = useState();
  const [selected2, setSelected2] = useState();
  const [selectYear, setSelectedYear] = useState();
  const [transitionType, setSelectTransitionType] = useState();
  const [autoNumber, setAutoNumber] = useState('');
  const [selectShippingMethod, setSelectShippingMethod] = useState();
  const [mileage, setMileage] = useState('');
  const [color, setColor] = useState<string>('#aabbcc');
  // State values for step_one

  //State values for step_two
  const [selectedCountries, setSelectedCountries] = useState();
  const [selectedProvince, setSelectedProvince] = useState();
  const [streetName, setStreetName] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [postalCode, setPostalcode] = useState('');
  const [pickupDate, setPickdate] = useState();
  const [googleAddress, setGoogleAddress] = useState(null);
  const [shipingGoogleAddress, setShippingGoogleAddress] = useState(null);
  //State values for step_two

  //State values for step_three
  const [selectedShipCountries, setSelectedShipCountries] = useState();
  const [selectedShipProvince, setSelectedShipProvince] = useState();
  const [shipStreetName, setShipStreetName] = useState('');
  const [shipHouseNumber, setShipHouseNumber] = useState('');
  const [shipPostalCode, setShipPostalcode] = useState('');
  const [shipPickupDate, setShipPickdate] = useState();
  //State values for step_three
  const router = useRouter();

  return (
    <OtherLayout>
      {/* SubNav Section */}
      <div className="sticky top-[4rem] z-10 hidden bg-white border-b lg:block">
        <div className="  max-w-7xl lg:mx-auto py-[1rem]  w-full ">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl text-[#0E172C] font-medium">Ship a Car</h1>
              <p className="text-sm text-secondary">
                Follow the 4 steps below to complete and submits youu request
              </p>
            </div>
            <button className="flex items-center font-bold text-accent-1">
              Cancel
            </button>
          </div>
        </div>
      </div>
      {/* SubNav Section */}
      <div className="flex justify-center gap-10 mx-auto lg:px-4 max-w-7xl lg:mt-14 ">
        <div className="sticky hidden lg:block top-[15rem] self-start overflow-y-auto">
          <ShippingStep
            data={data2}
            directionLeft={true}
            directionRight={false}
          />
        </div>
        {router.query.step_view === steps.ship_item && (
          <Ship_step_one
            mileage={mileage}
            setMileage={setMileage}
            selected={selected}
            setSelected={setSelected}
            selected2={selected2}
            setSelected2={setSelected2}
            selectYear={selectYear}
            setSelectedYear={setSelectedYear}
            selectShippingMethod={selectShippingMethod}
            setSelectShippingMethod={setSelectShippingMethod}
            color={color}
            setColor={setColor}
            setSelectTransitionType={setSelectTransitionType}
            autoNumber={autoNumber}
            setAutoNumber={setAutoNumber}
            transitionType={transitionType}
          />
        )}
        {router.query.step_view === steps.pick_address && (
          <Ship_step_two
            setPickdate={setPickdate}
            pickupDate={pickupDate}
            setPostalcode={setPostalcode}
            houseNumber={houseNumber}
            setHouseNumber={setHouseNumber}
            postalCode={postalCode}
            setStreetName={setStreetName}
            streetName={streetName}
            selectedProvince={selectedProvince}
            setSelectedProvince={setSelectedProvince}
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
            googleAddress={googleAddress}
            setGoogleAddress={setGoogleAddress}
          />
        )}
        {router.query.step_view === steps.ship_address && (
          <Ship_step_3
            setPickdate={setShipPickdate}
            pickupDate={shipPickupDate}
            setPostalcode={setShipPostalcode}
            houseNumber={shipHouseNumber}
            setHouseNumber={setShipHouseNumber}
            postalCode={shipPostalCode}
            setStreetName={setShipStreetName}
            streetName={shipStreetName}
            selectedProvince={selectedShipProvince}
            setSelectedProvince={setSelectedShipProvince}
            selectedCountries={selectedShipCountries}
            setSelectedCountries={setSelectedShipCountries}
            googleAddress={shipingGoogleAddress}
            setGoogleAddress={setShippingGoogleAddress}
          />
        )}
        {router.query.step_view === steps.ship_summary && (
          <Ship_step_4
            car_manufacturer={selected}
            car_model={selected2}
            car_year={selectYear}
            color={color}
            transition_type={transitionType}
            auto_number={autoNumber}
            shipping_method={selectShippingMethod}
            pickupDate={pickupDate}
            pickup_houseNumber={houseNumber}
            pickup_country={selectedCountries}
            pickup_province={selectedProvince}
            pickup_postalCode={postalCode}
            pickup_streetName={streetName}
            shippingDate={shipPickupDate}
            shipping_houseNumber={shipHouseNumber}
            shipping_country={selectedShipCountries}
            shipping_province={selectedShipProvince}
            shipping_postalCode={shipPostalCode}
            shipping_streetName={shipStreetName}
          />
        )}
        {router.query.step_view === steps.ship_payment_1 && <Ship_Payment_1 />}
        {router.query.step_view === steps.ship_payment_2 && <Ship_Payment_2 />}
      </div>
    </OtherLayout>
  );
}
