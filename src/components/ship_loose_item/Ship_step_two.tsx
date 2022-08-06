import MySelect from '@components/ui/Input/SelectInput';
import { Button } from '@components/ui';
import { IoIosArrowRoundBack } from 'react-icons/io';
import GooglePlace from '@components/ui/GooglePlaces/GooglePlace';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ship_loose_steps as steps } from './types';
import { useQuery } from '@tanstack/react-query';
import { getAllCountries, getCountryProvince } from '@services/order';

import { useEffect } from 'react';

//Todo: Setup the correct type for this interface
interface IStepTwoProps {
  setPickdate: any;
  pickupDate: any;
  setPostalcode: any;
  houseNumber: any;
  setHouseNumber: any;
  postalCode: any;
  setStreetName: any;
  streetName: any;
  selectedProvince: any;
  setSelectedProvince: any;
  selectedCountries: any;
  setSelectedCountries: any;
  googleAddress: any;
  setGoogleAddress: any;
}

const Ship_loose_step_two: React.FC<IStepTwoProps> = ({ ...props }) => {
  const router = useRouter();

  const { data: all_countries } = useQuery(
    ['getAllCountries'],
    getAllCountries
  );
  const { data: province_data, refetch } = useQuery(
    ['getAllProvince', props.selectedCountries?.id],
    () => getCountryProvince(props.selectedCountries?.id),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (props.selectedCountries) {
      refetch();
      props.setSelectedProvince([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch, props.selectedCountries]);

  const handleContinue = () => {
    router.replace({
      pathname: '/dashboard/Ship_loose_car',
      query: { step_view: steps.ship_address, no: 2 },
    });
  };
  return (
    <div className="w-1/2 p-5 overflow-x-hidden bg-white border border-t-4 rounded-md shadow-md border-t-accent-1 h-fit ">
      <Link
        passHref={true}
        href={{
          pathname: '/dashboard/Ship_loose_car',
          query: { step_view: steps.ship_item, no: 0 },
        }}
      >
        <button className="mb-5 flex cursor-pointer items-center gap-1 text-xs text-[#304157] font-medium ">
          <IoIosArrowRoundBack size={24} />
          Previous
        </button>
      </Link>
      <div>
        <p className="text-xs text-secondary">Step 2/5</p>
        <h1 className="text-[#0E172C] font-semibold">Pickup Address</h1>
      </div>
      <div className="flex gap-10 my-10">
        <button className="px-6 py-2 text-sm font-medium border-2 rounded-md border-accent-1 text-accent-1">
          Use Google Maps
        </button>
        <div className="w-1/2">
          <GooglePlace
            value={props.googleAddress}
            setValue={props.setGoogleAddress}
          />
        </div>

        {/* <button className="px-6 py-1 text-sm font-medium text-secondary">
          Enter Address Manually
        </button> */}
      </div>
      <section>
        <div className="flex items-center mt-10">
          <h1 className="w-full text-[#304157]">Pickup Address Information</h1>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <div className="grid grid-cols-2 gap-10">
            <MySelect
              data={all_countries}
              label="Select Country"
              placeholder="Select Option"
              selected={props.selectedCountries}
              setSelected={props.setSelectedCountries}
            />
            <MySelect
              data={province_data}
              label="Select State/Province"
              placeholder="Select Option"
              selected={props.selectedProvince}
              setSelected={props.setSelectedProvince}
            />
          </div>
          <div className="grid gap-10">
            <div className="flex flex-col gap-1 mt-1">
              <label className="text-sm text-secondary">Street Name</label>
              <input
                className=" px-4 text-base w-full outline-none   focus:border-[#DDC38F]   h-[50px]  border  border-[#C9D5E2] text-secondary   placeholder:text-[#E1E8F1] rounded-lg"
                name="maxMilage"
                type="text"
                placeholder="Queen's Bush Road, Wellesley, ON."
                value={props.streetName}
                onChange={(e) => props.setStreetName(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-1 mt-1">
              <label className="text-sm text-secondary">House Number</label>
              <input
                className=" px-4 text-base w-full outline-none   focus:border-[#DDC38F]   h-[50px]  border  border-[#C9D5E2] text-secondary   placeholder:text-[#E1E8F1] rounded-lg"
                name="maxMilage"
                type="text"
                placeholder="2xyt-zyt"
                value={props.houseNumber}
                onChange={(e) => props.setHouseNumber(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1 mt-1">
              <label className="text-sm text-secondary">Postal Code</label>
              <input
                className=" px-4 text-base w-full outline-none   focus:border-[#DDC38F]   h-[50px]  border  border-[#C9D5E2] text-secondary   placeholder:text-[#E1E8F1] rounded-lg"
                name="maxMilage"
                type="text"
                placeholder="H9R 3Z3"
                value={props.postalCode}
                onChange={(e) => props.setPostalcode(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-1 mt-1">
              <label className="text-sm text-secondary">
                Preferred Pickup Date
              </label>
              <input
                className=" px-4 text-base w-full outline-none   focus:border-[#DDC38F]   h-[50px]  border  border-[#C9D5E2] text-secondary   placeholder:text-[#E1E8F1] rounded-lg"
                name="maxMilage"
                type="date"
                placeholder=""
                value={props.pickupDate}
                onChange={(e) => props.setPickdate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>
      <div className="flex justify-center my-8 mb-2">
        <Button onClick={() => handleContinue()} className="w-full py-2 ">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Ship_loose_step_two;
