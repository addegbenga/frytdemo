import dynamic from 'next/dynamic';
import React from 'react';
// import Ship_Car_View from '@components/ship_car';

const Ship_Car_View = dynamic(() => import('@components/ship_car'), {
  ssr: false,
});

export default function Index() {
  return (
    <div>
      <Ship_Car_View />
    </div>
  );
}
