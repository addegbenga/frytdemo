// // import Login from '@components/auth/login/login';
// import dynamic from 'next/dynamic';
// const Login = dynamic(() => import('../../components/auth/login/login'), {
//   ssr: false,
//   loading: () => <div>Loading</div>,
// });

// export default function LoginView() {
//   return (
//     <div>
//       <Login />
//     </div>
//   );
// }

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
