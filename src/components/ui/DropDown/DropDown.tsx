import React from 'react';

interface IDropdownProps {
  openDropDown: boolean;
}
const DropDown: React.FC<IDropdownProps> = ({ openDropDown, children }) => {
  return (
    <div
      className={`${
        openDropDown ? ' bg-white border w-[10rem]' : 'h-0 hidden'
      }  top-10 absolute flex flex-col gap-4 p-4 pb-7 rounded-xl `}
    >
      {/* {data.map((item:any, idx:any) => (
        <div key={idx} className="flex items-center gap-2">
          <Image src={item.icon} height={20} width={20} alt="" layout="fixed" />
          <p className="text-sm text-primary">{item.name}</p>
        </div>
      ))} */}
      {children}
    </div>
  );
};

export default DropDown;
