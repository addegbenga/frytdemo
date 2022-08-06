import { Button } from '@components/ui';
import React from 'react';
import GoogleLogin from 'react-google-login';
import { IoLogoGoogle } from 'react-icons/io5';
import { RegisterViaGoogle } from '@services/auth';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import router from 'next/router';

const RegisterGoogle: React.FC = () => {
  const handleGoogleLogin = (response: any) => {
    if (response) {
      RegisterViaGoogle({ accessToken: response.accessToken }).then((res) => {
        if (res.isSuccess) {
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          router.push({
            pathname: '/auth/verify',
          });
        } else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
    }
  };
  const handleGoogleLoginFailure = (response: any) => {
    console.log(response);
  };
  return (
    <GoogleLogin
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
      render={(renderProps) => (
        <Button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className="lg:w-full flex justify-between px-4 bg-btn-primary  font-bold h-[54px]"
        >
          <p className="hidden lg:block">Sign Up With Google</p>
          <IoLogoGoogle size={24} className="ml-auto" />
        </Button>
      )}
      buttonText="Login"
      onSuccess={handleGoogleLogin}
      onFailure={handleGoogleLoginFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default RegisterGoogle;
