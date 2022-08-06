// import React, { useEffect } from 'react';
// import { Formik, Form, FormikHelpers } from 'formik';
// import { useRouter } from 'next/router';
// // import SignUpViaGoogleLogin from '../Social_auth/LoginGoogle';
// import * as yup from 'yup';
// import 'react-toastify/dist/ReactToastify.css';
// import { IoArrowBack, IoLogoFacebook } from 'react-icons/io5';

// import { Button, Input } from '@components/ui';
// import Link from 'next/link';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { LoginUser } from '@services/auth';
// import { toast } from 'react-toastify';
// import dynamic from 'next/dynamic';
// const SignUpViaGoogleLogin = dynamic(
//   () => import('../Social_auth/LoginGoogle'),
//   {
//     ssr: false,
//   }
// );

// interface ILoginProps {
//   username: string;
//   password: string;
// }

// const Login: React.FC = () => {
//   const router = useRouter();
//   const ref = React.createRef();
//   const reactQuery = useQueryClient();
//   const auth_data: any = reactQuery.getQueryData(['auth_data']);
//   const { mutateAsync: loginUser, isLoading } = useMutation(LoginUser, {
//     onSuccess: async () => {
//       return;
//     },
//     onSettled: async () => {
//       return;
//     },
//     onError: async () => {},
//   });

//   const handleLoginUser = (values: ILoginProps) => {
//     loginUser(values).then((res) => {
//       if (res.isSuccess) {
//         reactQuery.setQueryData(['auth_data'], res);
//         toast.success(res.message, {
//           position: toast.POSITION.TOP_RIGHT,
//         });
//         router.push({ pathname: '/dashboard' });
//       } else {
//         toast.error(res.message, {
//           position: toast.POSITION.TOP_RIGHT,
//         });
//       }
//     });
//   };

//   useEffect(() => {
//     console.log(auth_data);
//     if (auth_data) {
//       router.push('/dashboard');
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   // const { handleLogin } = useLogin();
//   // const { googleSignUp, facebookSignUp } = useSocialAuth();
//   return (
//     <section className="px-6 py-12 lg:flex lg:py-0 lg:px-0">
//       <div className="min-h-screen hidden lg:block w-[900px] bg-primary"></div>
//       <div className="lg:hidden">
//         <div className="flex items-center gap-10 mb-10 font-bold">
//           <span className="cursor-pointer" onClick={() => router.back()}>
//             <IoArrowBack size={24} />
//           </span>
//           <h1 className="text-2xl text-primary">Sign In </h1>
//         </div>
//         <p className="font-bold text-center text-secondary">
//           Kindly fill in your credentials to login.
//         </p>
//       </div>
//       <div className="lg:w-full">
//         <div className="flex justify-center gap-4 mt-8 lg:hidden ">
//           {/* <button className="p-3 text-white rounded shadow bg-btn-primary px-7">
//             <IoLogoGoogle />
//           </button> */}
//           <SignUpViaGoogleLogin />
//           <button className="px-4 text-white rounded shadow bg-btn-tertiary">
//             <IoLogoFacebook size={30} />
//           </button>
//         </div>

//         <div className="flex items-end justify-center mt-5 lg:hidden px-7">
//           <div className="w-full lg:w-[5rem] h-[1px] bg-[#C9D5E2]"></div>
//           <span className="text-base font-bold">OR</span>
//           <div className="w-full lg:w-[5rem] h-[1px] bg-[#C9D5E2]"></div>
//         </div>
//         <div className="items-center justify-between hidden px-10 py-10 mb-10 lg:flex">
//           <div className="flex flex-col ">
//             <h1 className="text-2xl font-bold text-accent-1">Sign In</h1>
//             <p className="font-bold text-secondary">
//               Fill in your details to login
//             </p>
//           </div>
//           <div>
//             <h1 className="text-secondary">
//               Dont hava an account??{' '}
//               <span className="font-bold text-accent-1">
//                 {' '}
//                 <Link href="/auth/register">Create Account</Link>
//               </span>
//             </h1>
//           </div>
//         </div>
//         <div className="mt-5 lg:w-[30rem] lg:mx-auto ">
//           <div className="hidden w-full gap-4 lg:flex">
//             <SignUpViaGoogleLogin />
//             <button className="flex items-center w-full h-[54px] px-4 font-bold text-white rounded shadow bg-btn-tertiary">
//               <p>Sign Up With Google</p>
//               <IoLogoFacebook size={24} className="ml-auto" />
//             </button>
//           </div>
//           <div className="items-end justify-center hidden mt-5 lg:flex px-7 lg:mt-10">
//             <div className="w-full lg:w-[7rem] h-[1px] bg-[#C9D5E2]"></div>
//             <span className="text-base font-bold">OR</span>
//             <div className="w-full lg:w-[7rem] h-[1px] bg-[#C9D5E2]"></div>
//           </div>
//           <Formik
//             // initialValues={formik.initialValues}
//             // onSubmit={(values, { setSubmitting }) => {
//             //   formik.submitForm();
//             // }}
//             initialValues={{ username: '', password: '' }}
//             validationSchema={yup.object({
//               username: yup.string().required('Required'),
//               password: yup.string().required('Required'),
//             })}
//             onSubmit={(
//               values,
//               { setSubmitting }: FormikHelpers<ILoginProps>
//             ) => {
//               handleLoginUser(values);
//             }}
//           >
//             {({ setFieldValue }) => (
//               <Form className="flex flex-col gap-3 lg:mt-14">
//                 <Input
//                   label="Username"
//                   name="username"
//                   type="text"
//                   placeholder="Jane"
//                   formikFunc={setFieldValue}
//                   ref={ref}
//                 />
//                 <Input
//                   label="Password"
//                   name="password"
//                   type="password"
//                   placeholder="Enter password"
//                   formikFunc={setFieldValue}
//                   ref={ref}
//                 />

//                 <Button
//                   loading={isLoading && true}
//                   type="submit"
//                   className="mt-5 h-[54px] font-bold"
//                 >
//                   Continue
//                 </Button>
//                 <div className="mt-5 text-center">
//                   <p className="mb-8 font-bold text-accent-1">
//                     <Link href="/auth/forgotPassword"> Forgot Password?</Link>
//                   </p>
//                   <div className="lg:hidden">
//                     <p className="font-semibold text-secondary">
//                       Don&apos;t have an account?
//                     </p>
//                     <span className="font-bold text-accent-1">
//                       {' '}
//                       <Link href="/auth/register">Create Account</Link>
//                     </span>
//                   </div>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;

import React, { useEffect } from 'react';
import 'react-phone-input-2/lib/style.css';
import { Formik, Form, FormikHelpers } from 'formik';
import RegisterViaGoogleLogin from '../Social_auth/RegisterGoogle';

import { useRouter } from 'next/router';
import {
  RegisterUser,
  RegisterShippingAgentUser,
  RegisterAgentUser,
} from '@services/auth';
import 'react-toastify/dist/ReactToastify.css';

import * as yup from 'yup';
import {
  IoArrowBack,
  IoLogoFacebook,
  IoCaretDownOutline,
} from 'react-icons/io5';

import { Button, Input } from '@components/ui';
import Link from 'next/link';

import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IRegisterProps {
  FirstName: string;
  LastName: string;
  username: string;
  email: string;
  address: string;
  password: string;
  phone: string;
}

const Register: React.FC = () => {
  const queryClient = useQueryClient();
  const auth_data: any = queryClient.getQueryData(['auth_data']);
  const { mutateAsync: registerUser, isLoading } = useMutation(RegisterUser);
  const { mutateAsync: registerShippingAgentUser, isLoading: loading2 } =
    useMutation(RegisterShippingAgentUser);
  const { mutateAsync: registerAgentUser, isLoading: loading3 } =
    useMutation(RegisterAgentUser);
  const router = useRouter();
  const ref = React.createRef();

  const handleRegisterUser = (values: IRegisterProps) => {
    //Todo: change this to an enum
    const client_account = 'client_account';
    const shipping_account = 'shipping_account';
    const delivery_account = 'delivery_account';
    if (router.query.selected_option === client_account) {
      registerUser(values).then((res) => {
        if (res.isSuccess) {
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          queryClient.setQueryData(['registered'], values.email);
          const txt = (router.query.selected_option = client_account);
          router.push({
            pathname: '/auth/verify',
            query: { selected_option: txt },
          });
        } else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
    } else if (router.query.selected_option === shipping_account) {
      registerShippingAgentUser(values).then((res) => {
        if (res.isSuccess) {
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          queryClient.setQueryData(['registered'], values.email);
          const txt = (router.query.selected_option = shipping_account);
          router.replace({
            pathname: '/auth/verify',
            query: { selected_option: txt },
          });
        } else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
    } else if (router.query.selected_option === delivery_account) {
      registerAgentUser(values).then((res) => {
        if (res.isSuccess) {
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          queryClient.setQueryData(['registered'], values.email);
          const txt = (router.query.selected_option = delivery_account);
          router.replace({
            pathname: '/auth/verify',
            query: { selected_option: txt },
          });
        } else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
    } else if (typeof router.query.selected_option === 'undefined') {
      router.replace({
        pathname: '/select_user_type',
      });
    }
  };
  useEffect(() => {
    console.log(auth_data);
    if (auth_data) {
      router.push('/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="px-6 py-12 lg:bg-white lg:py-0 lg:px-0 lg:flex ">
      <div className="min-h-screen hidden pb-20 lg:block w-[30vw] bg-primary"></div>
      <div className="w-full lg:pb-40 ">
        <div className="items-center justify-between hidden px-10 py-10 lg:flex">
          <div className="flex flex-col ">
            <h1 className="text-2xl font-bold text-accent-1">Create Account</h1>
            <p>
              (Shipping Agent){' '}
              <span className="font-bold text-accent-1">Change Account</span>
            </p>
          </div>
          <div>
            <h1 className="text-secondary">
              Already in the hub?{' '}
              <span className="font-bold text-accent-1">
                {' '}
                <Link href="/auth/login">Login</Link>
              </span>
            </h1>
          </div>
        </div>
        <div className="items-center lg:bg-white lg:px-14 lg:gap-10 lg:w-full lg:flex">
          <div className="lg:w-full lg:hidden">
            <div>
              <div className="flex items-center gap-10 mb-10 font-bold ">
                <span className="cursor-pointer" onClick={() => router.back()}>
                  <IoArrowBack size={24} />
                </span>
                <h1 className="text-2xl text-primary">Create Account</h1>
              </div>
              <p className="font-bold text-center text-secondary">
                Kindly fill in your detils to move on!
              </p>
            </div>
            <div className="flex items-center justify-center my-6">
              <p className="text-sm font-bold text-center text-accent-1">
                Change Account Type
              </p>
              <IoCaretDownOutline className="text-accent-1" />
            </div>

            <div className="flex justify-center gap-4 ">
              <RegisterViaGoogleLogin />
              <button className="px-4 text-white rounded shadow bg-btn-tertiary">
                <IoLogoFacebook size={26} />
              </button>
            </div>
            <div className="flex items-end justify-center my-5 px-7">
              <div className="w-full h-[1px] bg-[#C9D5E2]"></div>
              <span className="text-base font-bold">OR</span>
              <div className="w-full h-[1px] bg-[#C9D5E2]"></div>
            </div>
          </div>
          <div className="items-center hidden gap-4 lg:flex">
            <div className="flex flex-col gap-4">
              <h1 className="text-sm font-bold">
                Sign up using your Google or Facebook acount
              </h1>
              <RegisterViaGoogleLogin />
              <button className="flex items-center w-full h-[54px] px-4 font-bold text-white rounded shadow bg-btn-tertiary">
                <p>Sign Up With Google</p>
                <IoLogoFacebook size={24} className="ml-auto" />
              </button>
            </div>
            <div className="flex flex-col items-end justify-center my-5 px-7">
              <div className="w-[1px] h-[100px] bg-[#C9D5E2]"></div>
              <span className="-mr-3 text-lg font-bold">OR</span>
              <div className="w-[1px] h-[100px] bg-[#C9D5E2]"></div>
            </div>
          </div>

          <div className="mt-5 lg:w-[30rem]">
            <Formik
              initialValues={{
                FirstName: '',
                LastName: '',
                email: '',
                username: '', // added for our checkbox
                address: '', // added for our select
                password: '',
                phone: '',
              }}
              validationSchema={yup.object({
                FirstName: yup.string().required('Required'),
                LastName: yup.string().required(),
                username: yup.string().required(),
                email: yup.string().required(),
                address: yup.string().required(),
                phone: yup.string().required(),
                password: yup.string().required('Required'),
              })}
              onSubmit={(
                values,
                { setSubmitting }: FormikHelpers<IRegisterProps>
              ) => {
                handleRegisterUser(values);
              }}
            >
              {({ setFieldValue }) => (
                <Form className="flex flex-col gap-3">
                  <div className="flex flex-col gap-3 lg:w-full lg:flex-row">
                    <Input
                      label="Name"
                      name="FirstName"
                      type="text"
                      placeholder="Jane"
                      formikFunc={setFieldValue}
                      ref={ref}
                    />

                    <Input
                      label="Lastname"
                      name="LastName"
                      type="text"
                      placeholder="Doe"
                      formikFunc={setFieldValue}
                      ref={ref}
                    />
                  </div>

                  <Input
                    label="Username"
                    name="username"
                    type="text"
                    placeholder="Doe"
                    formikFunc={setFieldValue}
                    ref={ref}
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Doe"
                    formikFunc={setFieldValue}
                    ref={ref}
                  />
                  <Input
                    label="Address"
                    name="address"
                    type="text"
                    placeholder="Doe"
                    formikFunc={setFieldValue}
                    ref={ref}
                  />
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Doe"
                    formikFunc={setFieldValue}
                    ref={ref}
                  />
                  <Input
                    label="Mobile number"
                    name="phone"
                    type="tel"
                    placeholder="Doe"
                    ref={ref}
                    phone={true}
                    handleChanges={(e: any) => setFieldValue('phone', e)}
                  />
                  <Button
                    loading={
                      isLoading ? true : loading2 ? true : loading3 && true
                    }
                    type="submit"
                    className="mt-5 lg:mt-2 font-bold h-[54px]"
                  >
                    Continue
                  </Button>
                  <div className="mt-5 text-center lg:hidden">
                    <p className="text-secondary">Already in the Hub?</p>
                    <span className="font-bold text-accent-1">
                      {' '}
                      <Link href="/auth/login">Login</Link>
                    </span>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
