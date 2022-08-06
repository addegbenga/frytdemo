import React, { useEffect } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
// import SignUpViaGoogleLogin from '../Social_auth/LoginGoogle';
import * as yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { IoArrowBack, IoLogoFacebook } from 'react-icons/io5';

import { Button, Input } from '@components/ui';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginUser } from '@services/auth';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
const SignUpViaGoogleLogin = dynamic(
  () => import('../Social_auth/LoginGoogle'),
  {
    ssr: false,
  }
);

interface ILoginProps {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const ref = React.createRef();
  const reactQuery = useQueryClient();
  const auth_data: any = reactQuery.getQueryData(['auth_data']);
  const { mutateAsync: loginUser, isLoading } = useMutation(LoginUser, {
    onSuccess: async () => {
      return;
    },
    onSettled: async () => {
      return;
    },
    onError: async () => {},
  });

  const handleLoginUser = (values: ILoginProps) => {
    loginUser(values).then((res) => {
      if (res.isSuccess) {
        reactQuery.setQueryData(['auth_data'], res);
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        router.push({ pathname: '/dashboard' });
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  // const { handleLogin } = useLogin();
  // const { googleSignUp, facebookSignUp } = useSocialAuth();
  return (
    <section className="px-6 py-12 lg:flex lg:py-0 lg:px-0">
      <div className="min-h-screen hidden lg:block w-[900px] bg-primary"></div>
      <div className="lg:hidden">
        <div className="flex items-center gap-10 mb-10 font-bold">
          <span className="cursor-pointer" onClick={() => router.back()}>
            <IoArrowBack size={24} />
          </span>
          <h1 className="text-2xl text-primary">Sign In </h1>
        </div>
        <p className="font-bold text-center text-secondary">
          Kindly fill in your credentials to login.
        </p>
      </div>
      <div className="lg:w-full">
        <div className="flex justify-center gap-4 mt-8 lg:hidden ">
          {/* <button className="p-3 text-white rounded shadow bg-btn-primary px-7">
            <IoLogoGoogle />
          </button> */}
          {/* <SignUpViaGoogleLogin /> */}
          <button className="px-4 text-white rounded shadow bg-btn-tertiary">
            <IoLogoFacebook size={30} />
          </button>
        </div>

        <div className="flex items-end justify-center mt-5 lg:hidden px-7">
          <div className="w-full lg:w-[5rem] h-[1px] bg-[#C9D5E2]"></div>
          <span className="text-base font-bold">OR</span>
          <div className="w-full lg:w-[5rem] h-[1px] bg-[#C9D5E2]"></div>
        </div>
        <div className="items-center justify-between hidden px-10 py-10 mb-10 lg:flex">
          <div className="flex flex-col ">
            <h1 className="text-2xl font-bold text-accent-1">Sign In</h1>
            <p className="font-bold text-secondary">
              Fill in your details to login
            </p>
          </div>
          <div>
            <h1 className="text-secondary">
              Dont hava an account??{' '}
              <span className="font-bold text-accent-1">
                {' '}
                <Link href="/auth/register">Create Account</Link>
              </span>
            </h1>
          </div>
        </div>
        <div className="mt-5 lg:w-[30rem] lg:mx-auto ">
          <div className="hidden w-full gap-4 lg:flex">
            <SignUpViaGoogleLogin />
            <button className="flex items-center w-full h-[54px] px-4 font-bold text-white rounded shadow bg-btn-tertiary">
              <p>Sign Up With Google</p>
              <IoLogoFacebook size={24} className="ml-auto" />
            </button>
          </div>
          <div className="items-end justify-center hidden mt-5 lg:flex px-7 lg:mt-10">
            <div className="w-full lg:w-[7rem] h-[1px] bg-[#C9D5E2]"></div>
            <span className="text-base font-bold">OR</span>
            <div className="w-full lg:w-[7rem] h-[1px] bg-[#C9D5E2]"></div>
          </div>
          <Formik
            // initialValues={formik.initialValues}
            // onSubmit={(values, { setSubmitting }) => {
            //   formik.submitForm();
            // }}
            initialValues={{ username: '', password: '' }}
            validationSchema={yup.object({
              username: yup.string().required('Required'),
              password: yup.string().required('Required'),
            })}
            onSubmit={(
              values,
              { setSubmitting }: FormikHelpers<ILoginProps>
            ) => {
              handleLoginUser(values);
            }}
          >
            {({ setFieldValue }) => (
              <Form className="flex flex-col gap-3 lg:mt-14">
                <Input
                  label="Username"
                  name="username"
                  type="text"
                  placeholder="Jane"
                  formikFunc={setFieldValue}
                  ref={ref}
                />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  formikFunc={setFieldValue}
                  ref={ref}
                />

                <Button
                  loading={isLoading && true}
                  type="submit"
                  className="mt-5 h-[54px] font-bold"
                >
                  Continue
                </Button>
                <div className="mt-5 text-center">
                  <p className="mb-8 font-bold text-accent-1">
                    <Link href="/auth/forgotPassword"> Forgot Password?</Link>
                  </p>
                  <div className="lg:hidden">
                    <p className="font-semibold text-secondary">
                      Don&apos;t have an account?
                    </p>
                    <span className="font-bold text-accent-1">
                      {' '}
                      <Link href="/auth/register">Create Account</Link>
                    </span>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default Login;
