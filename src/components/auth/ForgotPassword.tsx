import React from 'react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { IoArrowBack } from 'react-icons/io5';
import { ResetPasswordLink } from '@services/auth';
import 'react-toastify/dist/ReactToastify.css';

import { Button, Input } from '@components/ui';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const ForgotPassword: React.FC = () => {
  const router = useRouter();

  const { mutateAsync: resetPasswordLink, isLoading } = useMutation(
    ResetPasswordLink,
    {
      onSuccess: async () => {
        return;
      },
      onSettled: async () => {
        return;
      },
      onError: async () => {},
    }
  );
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
        </div>
      </div>
      <div className=" lg:w-full">
        <div className="flex flex-col justify-center lg:hidden">
          <h1 className="text-xl font-bold text-center text-tertiary">
            Forgot Password
          </h1>
          <p className="mt-4 text-center text-secondary">
            Provide the email address you used when creating the account you
            want to remember its password.
          </p>
        </div>

        <div className="items-center justify-between hidden px-10 py-10 mb-10 lg:flex">
          <div className="flex flex-col ">
            <h1 className="text-2xl font-bold text-accent-1">
              Forgot Password
            </h1>
          </div>
          <div>
            <h1 className="text-secondary">
              Back to
              <span className="font-bold text-accent-1">
                {' '}
                <Link href="/auth/login"> Login</Link>
              </span>
            </h1>
          </div>
        </div>
        <div className="mt-5 lg:w-[30rem] lg:mx-auto ">
          <div className="flex-col justify-center hidden lg:flex">
            <p className="mt-4 text-center text-secondary">
              Provide the email address you used when creating the account you
              want to remember its password.
            </p>
          </div>

          <Formik
            initialValues={{ email: '' }}
            validationSchema={yup.object({
              email: yup.string().required('Required'),
            })}
            onSubmit={(values) => {
              resetPasswordLink(values).then((res) => {
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
              <Form className="flex flex-col gap-3 lg:mt-8 ">
                <Input
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
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

export default ForgotPassword;
