import MySelect from '@components/ui/Input/SelectInput';
import { steps } from './types';
import Image from 'next/image';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useDropzone } from 'react-dropzone';
import React, { useEffect, useState } from 'react';
import { Button } from '@components/ui';
import router from 'next/router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import ListYears from '@functions/GenerateYears';

import {
  getAllAutoMakers,
  getAllAutoMakersModel,
  getShippingMethod,
  ShippingOrder,
  uploadImageToCloudinary,
  UpdateShippingOrder,
} from '@services/order';
import { PopoverPicker } from '@components/ui/ColorPicker';
import { toast } from 'react-toastify';

interface IPropsShip_step_one {
  selected: any;
  setSelected: any;
  selected2: any;
  setSelected2: any;
  selectYear: any;
  setSelectedYear: any;
  selectShippingMethod: any;
  setSelectShippingMethod: any;
  color: any;
  setColor: any;
  setSelectTransitionType: any;
  autoNumber: any;
  setAutoNumber: any;
  mileage: any;
  setMileage: any;
  transitionType: any;
  files: any;
  setFiles: any;
}

const Ship_step_one: React.FC<IPropsShip_step_one> = ({ ...props }) => {
  const reactQuery = useQueryClient();
  const order_id = reactQuery.getQueryData(['order_id']);

  const { mutateAsync: uploadImage } = useMutation(uploadImageToCloudinary, {});
  const { mutateAsync: updateShippingOrder, isLoading: loading } = useMutation(
    UpdateShippingOrder,
    {}
  );
  const { mutateAsync: shippingOrder, isLoading: ship_car_loading } =
    useMutation(ShippingOrder, {});
  const { data: auto_makers } = useQuery(
    ['getAllAutoMakers'],
    getAllAutoMakers,

    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
  const { data: shipping_method } = useQuery(
    ['getShippingMethod'],
    getShippingMethod,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  const { data: auto_makers_model, refetch } = useQuery(
    ['getAllAutoMakersModel', props.selected?.id],
    () => getAllAutoMakersModel(props.selected?.id),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (props.selected) {
      refetch();
      props.setSelected2([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch, props.selected]);

  // const [files, setFiles] = useState<any>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      const txt = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      props.setFiles([...props.files, txt[0]]);
    },
  });
  const thumbs = props.files.map((file: any, idx: any) => (
    <div className="inline-flex " key={idx}>
      <div className="overflow-hidden">
        <div className="w-[20rem]">
          <Image
            alt="imaaaa"
            src={file.preview}
            layout="responsive"
            width="100%"
            height="100%"
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </div>
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      props.files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [props.files]);

  //Function for image upload to cloudinary
  const handleImageUpload = (orderId: any) => {
    let formData = new FormData();
    let imgArr: any = [];
    for (let i = 0; i < props.files.length; i++) {
      let file = props.files[i];
      formData.append('file', file);
      formData.append('upload_preset', 'adeyemi_preset');
      // Todo:Fix memory leak on this function
      uploadImage(formData).then((res) => {
        imgArr.push(res);
        if (i === props.files.length - 1) {
          console.log(imgArr);
          console.log(typeof orderId);
          imgArr.find((item: any) => console.log(item.secure_url));
          const formdata = {
            autoItem: {
              images: {
                photo: 'defaultimage',
              },
            },
          };
          UpdateShippingOrder({ orderId: orderId, formdata });
        }
      });
    }
  };
  //Function for submit to form
  const handleOnSubmitContinue = () => {
    //Code: for image uploads to cloudinary
    if (
      props.selected.length === 0 ||
      props.selected2.length === 0 ||
      // (files.length === 0 && alert('img arr require least on image')) ||
      props.autoNumber === '' ||
      props.mileage === '' ||
      props.transitionType === '' ||
      props.selectShippingMethod === ''
    ) {
      return alert("can't be empty");
    } else {
      //submit form values:
      const formdata = {
        autoItem: {
          color: props?.color,
          autoMakerId: Number(props?.autoNumber),
          modelId: Number(props?.selected2.id),
          manufactureYear: props?.selectYear.name.toString(),
          minMilage: 1,
          maxMilage: 1,
          quantity: 0,
          autoTransmissionTypeId: Number(props?.transitionType),
          shippingMethodId: Number(props?.selectShippingMethod.id),
          images: [],
        },
      };
      if (!order_id) {
        shippingOrder({ formdata }).then((res) => {
          console.log(res);
          if (res.isSuccess) {
            toast.success(res.message);
            reactQuery.setQueryData(['order_id'], res.data.orderId);
            router.replace({
              pathname: '/dashboard/ship_car',
              query: { step_view: steps.pick_address, no: 1 },
            });
            handleImageUpload(res.data.orderId);
          } else {
            toast.warn(res.message);
          }
        });
      } else {
        updateShippingOrder({ orderId: order_id, formdata }).then((res) => {
          console.log(res);
          if (res.isSuccess) {
            toast.success(res.message);
            router.replace({
              pathname: '/dashboard/ship_car',
              query: { step_view: steps.pick_address, no: 1 },
            });
            handleImageUpload(order_id);
          } else {
            toast.warn(res.message);
          }
        });
      }
    }
  };

  return (
    <div
      // onSubmit={handleOnSubmitContinue}
      className="w-full px-4 pb-20 overflow-x-hidden rounded-md lg:p-5 lg:border lg:pb-10 lg:border-t-4 lg:shadow-md lg:bg-white lg:w-1/2 border-t-accent-1 h-fit "
    >
      {/* Mobile View */}
      <div className="mb-10 lg:hidden ">
        <div className="flex items-center my-3 mb-8">
          <IoIosArrowRoundBack className="text-primary" size={28} />
          <h1 className="font-bold text-primary">Ship a Car</h1>
        </div>
        <p className="max-w-xs leading-5 text-secondary">
          Follow the 5 steps below to complete and submit your request
        </p>
        <div className="mt-4">
          <p className="font-medium text-secondary">Step 1:</p>
          <h1 className="font-semibold text-accent-1">Car Information</h1>
        </div>
      </div>
      {/* Mobile View */}
      {/* Desktop View */}
      <div className="hidden lg:block">
        <p className="text-xs text-secondary">Step 1/5</p>
        <h1 className="text-[#0E172C] font-semibold">
          Let Starts with Car Information
        </h1>
      </div>
      {/* Desktop View */}

      <section>
        <div className="flex items-center mt-5 lg:mt-10">
          <h1 className="text-sm font-bold lg:font-normal text-primary lg:text-base">
            About Manufacturer
          </h1>
        </div>

        <div className="flex flex-col gap-4 mt-4 lg:mt-6">
          <div className="grid gap-4 lg:gap-10 lg:grid-cols-2">
            <MySelect
              data={auto_makers}
              label="Select Car Manufacturer"
              placeholder="Select Option"
              selected={props.selected}
              setSelected={props.setSelected}
            />
            <MySelect
              handleSelectChange={refetch}
              data={auto_makers_model}
              label="Select Car Model"
              placeholder="Select Option"
              selected={props.selected2}
              setSelected={props.setSelected2}
            />
          </div>
          <div className="grid items-center gap-4 lg:gap-10 lg:grid-cols-2 ">
            <MySelect
              selected={props.selectYear}
              setSelected={props.setSelectedYear}
              data={ListYears}
              label="Select Year Manufacturer"
              placeholder="Select Option"
            />
            <div className="flex flex-col gap-1 mt-1">
              <label className=" text-secondary">Set Mileage range</label>
              <input
                className="px-4 text-base w-full outline-none   focus:border-[#DDC38F]   h-[50px]  border  border-[#C9D5E2] text-secondary   placeholder:text-[#E1E8F1] rounded-lg"
                name="maxMilage"
                type="text"
                placeholder="e.g 1300"
                value={props.mileage}
                onChange={(e) => props.setMileage(e.target.value)}
              />
            </div>
            {/* <MySelect
              data={people}
            
              placeholder="e.g 1300"
            /> */}
          </div>
        </div>
      </section>
      <section>
        <div className="flex items-center mt-6 lg:mt-10">
          <h1 className="w-1/3 text-sm font-bold lg:font-normal text-primary lg:text-base ">
            Appearance
          </h1>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="relative flex flex-col gap-1 mt-1">
              <label className="text-sm text-secondary">Select Colour</label>
              <input
                className="px-4 pl-12 items-center flex text-base w-full outline-none   focus:border-[#DDC38F]   h-[50px]  border  border-[#C9D5E2] text-[#304157]  placeholder:text-[#E1E8F1] rounded-lg"
                name="maxMilage"
                type="text"
                placeholder={props.color}
              />
              <div className="absolute z-20 top-9 left-3">
                <PopoverPicker color={props.color} onChange={props.setColor} />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="-mt-1 text-sm text-secondary">
                Choose Transition type
              </span>
              <div className="flex gap-10 mt-2 ">
                <div className="flex items-center gap-1 ">
                  <input
                    className="custom-radio"
                    type="radio"
                    id="html"
                    name="fav_language"
                    checked={props.transitionType === 1 ? true : false}
                    value={props.transitionType}
                    onChange={() => {
                      console.log(props.transitionType);
                      props.setSelectTransitionType(1);
                    }}
                  />
                  <label
                    className="font-bold text-secondary lg:font-normal"
                    htmlFor="manual"
                  >
                    Auto
                  </label>
                </div>
                <div className="flex items-center gap-1 ">
                  <input
                    className="custom-radio"
                    type="radio"
                    id="html"
                    name="fav_language"
                    checked={props.transitionType === 2 ? true : false}
                    value={props.transitionType}
                    onChange={() => {
                      console.log(props.transitionType);
                      props.setSelectTransitionType(2);
                    }}
                  />
                  <label
                    className="font-bold text-secondary lg:font-normal"
                    htmlFor="manual"
                  >
                    Manual
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 lg:gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-1 mt-1">
              <label className="text-sm text-secondary">
                How many sedan do you want
              </label>
              <input
                className=" px-4 text-base w-full outline-none   focus:border-[#DDC38F]   h-[50px]  border  border-[#C9D5E2] text-[#304157]  placeholder:text-[#E1E8F1] rounded-lg"
                name="maxMilage"
                type="text"
                value={props.autoNumber}
                onChange={(e) => props.setAutoNumber(e.target.value)}
                placeholder="Enter number of sedan"
              />
            </div>
            <MySelect
              selected={props.selectShippingMethod}
              setSelected={props.setSelectShippingMethod}
              data={shipping_method}
              label="Preffered shipping method"
              placeholder="Select Option"
            />
          </div>
        </div>
      </section>

      <section className="container  relative mt-7 overflow-x-hidden pt-14 rounded-md lg:px-2   border border-dashed h-[20rem] flex justify-center overflow-y-auto  ">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />

          {props.files.length === 0 && (
            <>
              <div className="w-[6rem] h-[6rem] mx-auto mt-10">
                <Image
                  src="/assets/images/upload-image.svg"
                  alt="uplaod"
                  layout="responsive"
                  height="100%"
                  width="100%"
                />
              </div>

              <h1 className="mt-4 font-bold text-center lg:text-xl text-primary">
                Upload Image of your car
              </h1>
              <p className="text-sm text-center text-secondary">
                Drag and drop or{' '}
                <span className="text-accent-1">Select file</span> from your
                computer
              </p>
            </>
          )}
        </div>
        {props.files.length > 0 && (
          <>
            <div
              {...getRootProps({
                className:
                  'dropzone flex justify-end px-3 text-xs lg:text-sm items-center py-2 w-full top-0 absolute',
              })}
            >
              <input {...getInputProps()} />

              <button
                type="button"
                className="flex text-sm font-semibold text-accent-1 item-center"
              >
                Add image
              </button>
            </div>
          </>
        )}

        <aside className="grid gap-10 lg:grid-cols-2">{thumbs}</aside>
      </section>
      <div className="justify-center hidden mt-4 lg:flex">
        <Button
          type="button"
          onClick={() => handleOnSubmitContinue()}
          loading={(ship_car_loading && true) || (loading && true)}
          className="w-full py-2 "
        >
          Continue
        </Button>
      </div>
      <div className="flex justify-center mt-4 lg:hidden">
        <Button
          type="button"
          onClick={() => handleOnSubmitContinue()}
          loading={ship_car_loading && true}
          className="w-full py-2 "
        >
          Next Step
        </Button>
      </div>
    </div>
  );
};
export default Ship_step_one;
