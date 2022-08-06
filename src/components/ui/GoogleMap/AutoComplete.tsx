/* eslint-disable no-unused-vars */

/* eslint-disable no-unused-vars */
import { useJsApiLoader } from '@react-google-maps/api';
import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { useQueryClient } from '@tanstack/react-query';

interface IMapProps {
  label: string;
  googlePickupAddress?: any;
  setGooglePickupAddress?: any;
  streetName: any;
  setStreetName: any;
  setPickupLongitude: any;
  setPickupLatitude: any;
}

const MyComponent: React.FC<IMapProps> = ({
  streetName,
  setStreetName,
  setPickupLatitude,
  setPickupLongitude,
}) => {
  const libraries: any = ['places'];
  const fields: any = ['place_id', 'geometry', 'name', 'formatted_address'];
  const reactQuery = useQueryClient();
  // const [map, setMap] = React.useState(null);
  const [autoComplete, setAutocomplete] = useState<any>(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as any,
    libraries: libraries as any,
    // ...otherOptions
  });
  const place_instance: any = reactQuery.getQueryData(['place_instance']);

  const handleOnLoad = (autocomplete: any) => {
    console.log('autocomplete: ', autocomplete);
    reactQuery.setQueryData(['place_instance'], autocomplete);
    setAutocomplete(autocomplete);
  };
  const onPlaceChanged = () => {
    if (typeof place_instance === 'object' && autoComplete !== null) {
      const lng = place_instance?.getPlace().geometry.location.lng();
      const lat = place_instance?.getPlace().geometry.location.lat();
      const result = place_instance?.getPlace();
      console.log(result);
      setStreetName(result.formatted_address);
      setAutocomplete(result.formatted_address);
      setPickupLatitude(lat);
      setPickupLongitude(lng);
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const loadMap = () => {
    return (
      <Autocomplete
        onLoad={(auto) => handleOnLoad(auto)}
        onPlaceChanged={() => onPlaceChanged()}
        fields={fields}
      >
        <div className="grid gap-10">
          <div className="flex flex-col gap-1 mt-1">
            <label className="text-sm text-secondary">Address</label>
            <input
              className=" px-4 text-sm  w-full outline-none   focus:border-[#DDC38F] h-[45px]  lg:h-[50px]  border  border-[#C9D5E2] text-secondary   placeholder:text-[#E1E8F1] rounded-md"
              name="maxMilage"
              type="text"
              placeholder="Queen's Bush Road, Wellesley, ON."
              //   value={props.streetName}
              //   onChange={(e) => props.setStreetName(e.target.value)}
            />
          </div>
        </div>
      </Autocomplete>
    );
  };
  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? loadMap() : <div>Loading</div>;

  // </LoadScript>
};

export default React.memo(MyComponent);
