import React from 'react';
import Navbar from './Navbar';

const OtherLayout: React.FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="">{children}</div>
    </div>
  );
};
export default OtherLayout;
