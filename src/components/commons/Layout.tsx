import Navbar from './Navbar';
import Wallet from './Wallet';

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="mx-auto 2xl:container lg:mt-0 lg:flex ">
        {children}
        <Wallet />
      </div>
    </div>
  );
};
export default Layout;
