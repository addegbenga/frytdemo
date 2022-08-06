import dynamic from 'next/dynamic';
// import UserDashboard from '@components/dashboard';
const UserDashboard = dynamic(() => import('@components/dashboard'), {
  ssr: false,
});

const Index: React.FC = () => {
  return (
    <div>
      <UserDashboard />
    </div>
  );
};

export default Index;
