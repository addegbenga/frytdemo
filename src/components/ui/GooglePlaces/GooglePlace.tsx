import React, { useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

interface IGooglePlaceProps {
  value: any;
  setValue: any;
}
const GooglePlace: React.FC<IGooglePlaceProps> = ({ value, setValue }) => {
  //   const [value, setValue] = useState<any>(null);

  useEffect(() => {
    if (value) {
      geocodeByAddress(value.label)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) =>
          console.log('Successfully got latitude and longitude', { lat, lng })
        );
    }
  }, [value]);

  return (
    <div>
      {/* {console.log(value)} */}
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API}
        apiOptions={{ language: 'fr', region: 'fr' }}
        selectProps={{
          value,
          onChange: setValue,
          placeholder: 'Manually enter address',
        }}
      />
    </div>
  );
};

export default GooglePlace;
