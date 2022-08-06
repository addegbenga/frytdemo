import MySelect from '@components/ui/Input/SelectInput';
import { Button } from '@components/ui';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { steps } from './types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAllCountries,
  getCountryProvince,
  UpdateShippingOrder,
} from '@services/order';
import { useEffect } from 'react';
import { Tab } from '@headlessui/react';
import dynamic from 'next/dynamic';
import AutoComplete from '@components/ui/GoogleMap/AutoComplete';
import { toast } from 'react-toastify';
const GoogleMap = dynamic(() => import('@components/ui/GoogleMap/GoogleMap'), {
  ssr: false,
});

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

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
  googleShippingAddress: any;
  setGoogleShippingAddress: any;
  googleShippingDate: any;
  setGoogleShippingDate: any;
  shippingLatitude: any;
  setShippingLatitude: any;
  shippingLongitude: any;
  setShippingLongitude: any;
}

const Ship_step_3: React.FC<IStepTwoProps> = ({ ...props }) => {
  const router = useRouter();
  const reactQuery = useQueryClient();
  const order_id = reactQuery.getQueryData(['order_id']);
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

  const { mutateAsync: updateShippingOrder, isLoading: loading } = useMutation(
    UpdateShippingOrder,
    {
      onSuccess: async (res) => {
        return;
      },
      onSettled: async () => {
        return;
      },
      onError: async () => {},
    }
  );

  useEffect(() => {
    if (props.selectedCountries) {
      refetch();
    }
  }, [refetch, props.selectedCountries]);

  //Function for submit to form for google address tabs
  const handleOnSubmitGoogleAddress = () => {
    //Code: for image uploads to cloudinary
    if (
      props.googleShippingAddress === '' ||
      props.googleShippingAddress === ''
    ) {
      return alert("can't be empty");
    } else {
      //submit form values:
      const lat = props.googleShippingAddress.geometry.location.lat();
      const lng = props.googleShippingAddress.geometry.location.lng();
      const formdata = {
        sourceAddress: {
          streetName: props.googleShippingAddress.formatted_address,
          pickupDate: props.googleShippingDate,
          latitude: lat,
          longitude: lng,
        },
      };
      updateShippingOrder({ orderId: order_id, formdata }).then((res) => {
        console.log(res);
        if (res.isSuccess) {
          toast.success(res.message);
          router.replace({
            pathname: '/dashboard/ship_car',
            query: { step_view: steps.ship_summary, no: 3 },
          });
        } else {
          toast.warn(res.message);
        }
      });
    }
  };

  //Function for submit to form for google address tabs
  const handleOnSubmitManualAddress = () => {
    //Code: for image uploads to cloudinary
    if (
      props.selectedCountries === '' ||
      props.selectedProvince === '' ||
      props.streetName === '' ||
      props.houseNumber === '' ||
      props.postalCode === '' ||
      props.pickupDate === '' ||
      props.shippingLatitude === '' ||
      props.shippingLongitude === ''
    ) {
      return alert("can't be empty");
    } else {
      //submit form values:
      const formdata = {
        sourceAddress: {
          countryId: props.selectedCountries.id,
          provinceId: props.selectedProvince.id,
          streetName: props.streetName,
          homeNumber: props.houseNumber,
          postalCode: props.postalCode,
          pickupDate: props.pickupDate,
          latitude: props.shippingLatitude,
          longitude: props.shippingLongitude,
        },
      };
      updateShippingOrder({ orderId: order_id, formdata }).then((res) => {
        console.log(res);
        if (res.isSuccess) {
          toast.success(res.message);
          router.replace({
            pathname: '/dashboard/ship_car',
            query: { step_view: steps.ship_summary, no: 3 },
          });
        } else {
          toast.warn(res.message);
        }
      });
    }
  };
  return (
    <div className="w-full px-2 mt-4 overflow-x-hidden lg:mt-0 lg:border lg:shadow-md lg:p-5 lg:bg-white lg:rounded-md lg:border-t-4 lg:w-1/2 bg:border-t-accent-1 h-fit ">
      <Link
        passHref={true}
        href={{
          pathname: '/dashboard/ship_car',
          query: { step_view: steps.pick_address, no: 1 },
        }}
      >
        <button className="mb-5 flex cursor-pointer items-center gap-1 text-xs text-[#304157] font-medium ">
          <IoIosArrowRoundBack size={24} />
          Previous
        </button>
      </Link>
      <div className="mb-10">
        <p className="text-xs text-secondary">Step 2/5</p>
        <h1 className="text-[#0E172C] font-semibold">Shipping Address</h1>
      </div>

      <Tab.Group>
        <Tab.List className="flex justify-between rounded-xl">
          <Tab
            // onClick={() => router.reload()}
            as="div"
            className={({ selected }) =>
              classNames(
                '   text-sm font-medium px-4 lg:px-0 border text-secondary focus:outline-none ',
                '',
                selected
                  ? ' text-accent-1  border-btn-primary  rounded-sm border-2'
                  : ''
              )
            }
          >
            <button className="py-2 text-sm font-medium rounded-sm lg:px-6 border-accent-1">
              Use Google Maps
            </button>
          </Tab>
          <Tab
            // onClick={() => handleMapTwo()}
            as="div"
            className={({ selected }) =>
              classNames(
                '   text-sm font-medium border px-4 lg:px-0 text-secondary focus:outline-none ',
                '',
                selected
                  ? ' text-accent-1  rounded-sm border-2 border-btn-primary'
                  : ''
              )
            }
          >
            <button className="py-2 text-sm font-medium rounded-sm lg:px-6 border-accent-1 ">
              Enter Address Manually
            </button>
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-8">
          <Tab.Panel
            className={classNames('rounded-xl  ', '  focus:outline-none ')}
          >
            <div className="h-[20rem] ">
              <GoogleMap
                setGooglePickupDate={props.setGoogleShippingDate}
                setGooglePickupAddress={props.setGoogleShippingAddress}
                label="Ship To"
              />
            </div>

            <div className="flex justify-center my-8 mb-2">
              <Button
                loading={loading && true}
                onClick={() => handleOnSubmitGoogleAddress()}
                className="w-full py-2 "
              >
                Continue
              </Button>
            </div>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'rounded-xl  lg:p-3',
              '  focus:outline-none '
            )}
          >
            <section>
              <div className="flex items-center ">
                <h1 className="w-full text-[#304157]">
                  Shipping Address Information
                </h1>
              </div>

              <div className="flex flex-col gap-4 mt-6 lg:gap-4">
                <div className="grid gap-4 lg:gap-10 lg:grid-cols-2">
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
                <AutoComplete
                  label="Ship To"
                  streetName={props.streetName}
                  setStreetName={props.setStreetName}
                  setPickupLongitude={props.setShippingLongitude}
                  setPickupLatitude={props.setShippingLatitude}
                />

                <div className="grid gap-4 lg:gap-10 lg:grid-cols-2">
                  <div className="flex flex-col gap-1 mt-1">
                    <label className="text-sm text-secondary">
                      House Number
                    </label>
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
                    <label className="text-sm text-secondary">
                      Postal Code
                    </label>
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
                <div className="grid gap-10 lg:grid-cols-2">
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
              <div className="flex justify-center my-8 mb-2">
                <Button
                  loading={loading && true}
                  onClick={() => handleOnSubmitManualAddress()}
                  className="w-full py-2 "
                >
                  Continue
                </Button>
              </div>
            </section>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Ship_step_3;
