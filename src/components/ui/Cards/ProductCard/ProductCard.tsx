import { Button } from '@components/ui';
import React from 'react';
import Image from 'next/image';

interface IProductCardProps {
  img: string;
  alt: string;
}

const ProductCard: React.FC<IProductCardProps> = ({ img, alt }) => {
  return (
    <div className="flex flex-col justify-between h-[15rem] overflow-hidden bg-slate-600 rounded-xl ">
      <Image src={img} layout="responsive" alt={alt} height={100} width={100} />
      <div className="relative z-10 flex justify-between -mt-[5rem] p-3  bg-black bg-opacity-20">
        <div>
          <h1 className="font-bold text-white">Lexus Sharpshot 2021</h1>
          <span className="text-sm font-semibold text-white">$12,000</span>
        </div>
        <Button className="px-4 text-sm font-semibold">Buy Now</Button>
      </div>
    </div>
  );
};

export default ProductCard;
