import '../../styles/globals.css';
import '@assets/base.css';
import '@assets/main.css';
import type { AppProps } from 'next/app';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});
const Noop: React.FC = ({ children }) => <>{children}</>;

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;
  let localStoragePersister: any;
  if (typeof window !== 'undefined') {
    // Client-side-only code
    localStoragePersister = createSyncStoragePersister({
      storage: window.localStorage,
    });
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: localStoragePersister }}
      >
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </PersistQueryClientProvider>
    </div>
  );
}
