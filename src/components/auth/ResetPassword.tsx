import React from 'react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { IoArrowBack, IoLogoGoogle, IoLogoFacebook } from 'react-icons/io5';
import { VerifyEmail } from '@services/auth';
import 'react-toastify/dist/ReactToastify.css';

import { Button, Input } from '@components/ui';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const ResetPasswordView: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync: verifyEmail, isLoading } = useMutation(VerifyEmail, {
    onSuccess: async () => {
      return;
    },
    onSettled: async () => {
      return;
    },
    onError: async () => {},
  });
  const ref = React.createRef();

  // const { handleLogin } = useLogin();
  // const { googleSignUp, facebookSignUp } = useSocialAuth();
  return (
    <section className="px-6 py-12 lg:flex lg:py-0 lg:px-0">
      <div className="min-h-screen hidden lg:block w-[900px] bg-primary"></div>

      <div className="mb-20 lg:hidden">
        <div className="flex items-center gap-10 mb-10 font-bold">
          <span className="cursor-pointer" onClick={() => router.back()}>
            <IoArrowBack size={24} />
          </span>
          <h1 className="text-2xl text-primary">Sign In </h1>
        </div>
      </div>
      <div className=" lg:w-full">
        <div className="flex flex-col justify-center lg:hidden">
          <h1 className="text-xl font-bold text-center text-tertiary">
            Verify Your Email
          </h1>
          <p className="mt-4 text-center text-secondary">
            We have sent a 6-digits code to your email box. Kindly copy and
            paste it here to verify your email, Code expires in 10min
          </p>
        </div>

        <div className="items-center justify-between hidden px-10 py-10 mb-10 lg:flex">
          <div className="flex flex-col ">
            <h1 className="text-2xl font-bold text-accent-1">Create Account</h1>
            <p>(Shipping Agent) </p>
          </div>
          <div>
            <h1 className="text-secondary">
              Already in the hub??{' '}
              <span className="font-bold text-accent-1">
                {' '}
                <Link href="/auth/login">Login</Link>
              </span>
            </h1>
          </div>
        </div>
        <div className="mt-5 lg:w-[30rem] lg:mx-auto ">
          <div className="flex-col justify-center hidden lg:flex">
            <h1 className="text-2xl font-bold text-center text-tertiary">
              Verify Your Email
            </h1>
            <p className="mt-4 text-center text-secondary">
              We have sent a 6-digits code to your email box. Kindly copy and
              paste it here to verify your email, Code expires in 10min
            </p>
          </div>

          <Formik
            initialValues={{ code: '' }}
            validationSchema={yup.object({
              code: yup.string().required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              let x = queryClient.getQueryData(['registered']);

              verifyEmail({ code: values.code, email: x }).then((res) => {
                if (res.isSuccess) {
                  toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                  router.replace({ pathname: '/dashboard' });
                } else {
                  toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                }
              });
            }}
          >
            {({ setFieldValue }) => (
              <Form className="flex flex-col gap-3 lg:mt-14">
                <Input
                  label="Verification code"
                  name="code"
                  type="text"
                  placeholder="Enter code"
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
                  <div className="lg:hidden">
                    <p className="font-semibold text-secondary">
                      Already in the hub?
                    </p>
                    <span className="font-bold text-accent-1">
                      {' '}
                      <Link href="/auth/login">Login</Link>
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

export default ResetPasswordView;
