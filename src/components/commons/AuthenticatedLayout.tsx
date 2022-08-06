import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AuthenticatedLayout: React.FC = ({ children }) => {
  const router = useRouter();
  const reactQuery = useQueryClient();
  const auth_data: any = reactQuery.getQueryData(['auth_data']);
  useEffect(() => {
    if (!auth_data) {
      router.replace('/auth/login');
    }
  }, [auth_data, router]);

  return <div>{children}</div>;
};
export default AuthenticatedLayout;
