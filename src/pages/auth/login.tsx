// import Login from '@components/auth/login/login';
import dynamic from 'next/dynamic';
const Login = dynamic(() => import('../../components/auth/login/login'), {
  ssr: false,
  loading: () => <div>Loading</div>,
});

export default function LoginView() {
  return (
    <div>
      <Login />
    </div>
  );
}
