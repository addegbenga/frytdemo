import React from 'react';
// import Register from '@components/auth/Register/Register';
import dynamic from 'next/dynamic';
const Register = dynamic(
  () => import('../../components/auth/Register/Register'),
  {
    ssr: false,
    loading: () => <div>Loading</div>,
  }
);

export default function RegisterView() {
  return (
    <div>
      <Register />
    </div>
  );
}
