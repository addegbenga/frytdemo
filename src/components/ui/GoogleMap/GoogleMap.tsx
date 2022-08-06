/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useQueryClient } from '@tanstack/react-query';

const containerStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
};

interface IMapProps {
  label: string;
  googlePickupAddress?: any;
  setGooglePickupAddress?: any;
  googlePickupDate?: any;
  setGooglePickupDate?: any;
}

const MyComponent: React.FC<IMapProps> = ({
  setGooglePickupAddress,
  setGooglePickupDate,
  label,
}) => {
  // const [map, setMap] = React.useState(null);
  const libraries: any = ['places'];
  const fields: any = ['place_id', 'geometry', 'name', 'formatted_address'];
  const [autoComplete, setAutocomplete] = useState<any>(null);
  const reactQuery = useQueryClient();
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as any,
    libraries: libraries as any,

    // ...otherOptions
  });

  // const [latitude, setLatitude] = useState(null);
  const [position, setPosition] = useState<any>({
    lat: 40.5811115302841,
    lng: -50.29251555555555,
    zoom: 2,
  });

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(position);
    // map.fitBounds(bounds);
    console.log(map, 'sjjsj');
    reactQuery.setQueryData(['map_instance'], map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    // console.log('remove map');
    reactQuery.setQueryData(['map_instance'], map);
  }, []);

  const handleOnLoad = (autocomplete: any) => {
    console.log('autocomplete: ', autocomplete);
    reactQuery.setQueryData(['place_instance'], autocomplete);
    setAutocomplete(autocomplete);
  };
  const onPlaceChanged = () => {
    if (autoComplete !== null) {
      const result = autoComplete.getPlace();
      reactQuery.setQueryData(['place_instance'], autoComplete);
      console.log(result);
      setGooglePickupAddress(result);
      console.log(autoComplete.getPlace().geometry.location.lng());
      setPosition({
        lat: autoComplete.getPlace().geometry.location.lat(),
        lng: autoComplete.getPlace().geometry.location.lng(),
        zoom: 15,
      });
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const loadMap = () => {
    return (
      <GoogleMap
        // id="searchbox-example"
        mapContainerStyle={containerStyle}
        center={position}
        zoom={position.zoom}
        onLoad={(instance) => onLoad(instance)}
        onClick={(e) => console.log(e)}
        onUnmount={onUnmount}
        options={{
          mapTypeControl: false,
          zoomControl: true,
        }}
      >
        <Autocomplete
          onLoad={(auto) => handleOnLoad(auto)}
          onPlaceChanged={() => onPlaceChanged()}
          fields={fields}
        >
          <div>
            <div className="container absolute z-20 flex flex-col items-center justify-center gap-2 px-4 mt-3 ">
              <div className="flex rounded">
                <button className="flex items-center w-full justify-center gap-2 px-4 bg-white border-[#DDC38F] border-2 border-r-0 rounded-l-md">
                  <svg
                    width="13"
                    height="15"
                    viewBox="0 0 13 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1V13.8224"
                      stroke="#F1592D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M1 1H11.897L9.76033 4.8474L11.897 8.69481H1"
                      stroke="#F1592D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-xs text-secondary">{label}</span>
                  <div className="h-4 w-[1px] bg-secondary"></div>
                </button>
                <input
                  type="text"
                  className="py-2 text-sm border-[#DDC38F] placeholder:text-secondary border-t-2 border-b-2 w-full lg:w-[200px] placeholder:text-sm focus:outline-none"
                  placeholder="Address"
                />
                <button className="flex border-[#DDC38F] items-center justify-center pr-4 bg-white border-t-2 border-b-2 border-r-2 rounded-r-md">
                  <svg
                    className="w-5 h-5 text-secondary"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
                  </svg>
                </button>
              </div>
              <div className="flex rounded">
                <button className="flex items-center w-full justify-center gap-2 lg:w-[130px] bg-white border-[#DDC38F] border-2 border-r-0 rounded-l-md">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.6667 14.6682H3.33341C2.22884 14.6682 1.33341 13.7728 1.33341 12.6682V6.6682H14.6667V12.6682C14.6667 13.7728 13.7713 14.6682 12.6667 14.6682ZM1.33341 4.6682C1.33341 3.56363 2.22884 2.6682 3.33341 2.6682H12.6667C13.7713 2.6682 14.6667 3.56363 14.6667 4.6682V5.33486H1.33341V4.6682ZM12.6667 1.33333H12V0.666667C12 0.29848 11.7015 0 11.3333 0C10.9651 0 10.6667 0.29848 10.6667 0.666667V1.33333H5.33333V0.666667C5.33333 0.29848 5.03485 0 4.66667 0C4.29848 0 4 0.29848 4 0.666667V1.33333H3.33333C1.4933 1.33554 0.00220667 2.82663 0 4.66667V12.6667C0.00220667 14.5067 1.4933 15.9978 3.33333 16H12.6667C14.5067 15.9978 15.9978 14.5067 16 12.6667V4.66667C15.9978 2.82663 14.5067 1.33554 12.6667 1.33333Z"
                      fill="#F1592D"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7 10C7 9.44771 7.44771 9 8 9C8.55229 9 9 9.44771 9 10C9 10.5523 8.55229 11 8 11C7.44771 11 7 10.5523 7 10Z"
                      fill="#F1592D"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.66656 10C3.66656 9.44771 4.11428 9 4.66656 9C5.21885 9 5.66656 9.44771 5.66656 10C5.66656 10.5523 5.21885 11 4.66656 11C4.11428 11 3.66656 10.5523 3.66656 10Z"
                      fill="#F1592D"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.3334 10C10.3334 9.44771 10.7811 9 11.3334 9C11.8857 9 12.3334 9.44771 12.3334 10C12.3334 10.5523 11.8857 11 11.3334 11C10.7811 11 10.3334 10.5523 10.3334 10Z"
                      fill="#F1592D"
                    />
                  </svg>

                  <span className="text-xs text-secondary">Date / Time</span>
                  <div className="h-4 w-[1px] bg-secondary"></div>
                </button>
                <input
                  onChange={(e) => setGooglePickupDate(e.target.value)}
                  type="date"
                  className="py-2 text-sm placeholder:text-secondary text-secondary lg:w-[200px] w-full  border-[#DDC38F] border-t-2 border-b-2   placeholder:text-sm focus:outline-none"
                />
                <button className="flex w-20 lg:w-fit border-[#DDC38F] items-center justify-center pr-4 bg-white border-t-2 border-b-2 border-r-2 rounded-r-md"></button>
              </div>
            </div>
          </div>
        </Autocomplete>
        {/* Child components, such as markers, info windows, etc. */}

        <></>
      </GoogleMap>
    );
  };
  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? loadMap() : <div>Loading</div>;

  // </LoadScript>
};

export default React.memo(MyComponent);
