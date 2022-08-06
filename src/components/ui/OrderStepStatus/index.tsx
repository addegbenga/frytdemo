import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface ICustomSteps {
  data: {
    icon: React.ReactChild;
    date: string;
    title: string;
    desc: string;
    active: boolean;
  }[];
  directionLeft?: boolean;
  directionRight?: boolean;
}

const CustomSteps: React.FC<ICustomSteps> = ({
  data,
  directionLeft = true,
  directionRight = true,
}) => {
  const [keepTrack, setTrack] = useState<any>([]);
  const router = useRouter();
  const myref = useRef<any>();

  const test = useCallback(() => {
    let me = [];
    for (let i = 0; i <= Number(router.query.no); i++) {
      myref.current = i - 1;
      me.push(i - 1);
      setTrack((k: any) =>
        k.includes(myref.current)
          ? [...k.filter((item: any) => item !== Number(router.query.no))]
          : [...k, myref.current]
      );
    }
    setTrack(me);
  }, [router.query.no]);

  useEffect(() => {
    test();
  }, [router.query, test]);

  return (
    <div className="flex flex-col ">
      {data.map((item, idx) => (
        <div className="relative" key={idx}>
          <div className="flex ">
            {directionLeft && (
              <div className="flex mr-4 flex-col w-[10rem]  items-end text-sm break-all ">
                <h1
                  className={`${
                    keepTrack && keepTrack.includes(idx)
                      ? 'text-accent-1 '
                      : 'text-[#304157]'
                  } font-bold text-sm lg:text-base  `}
                >
                  {item.title}
                </h1>
                <p className="text-sm text-secondary">{item.desc}</p>
              </div>
            )}
            <div>
              <h1
                className={`${
                  keepTrack && keepTrack.includes(idx)
                    ? 'border-accent-1 w-9 h-9 bg-[#FFEEE8] border'
                    : 'border-[#C9D5E2] w-9 h-9 bg-[#F8FAFC]'
                }  z-20   border-2  rounded-full`}
              ></h1>
              <div
                className={`
                ${data.length - 1 === idx ? 'h-0' : 'h-[50px] w-[1.5px]'}
                  ${
                    keepTrack && keepTrack.includes(idx)
                      ? 'w-[1.5px] bg-accent-1 '
                      : 'bg-[#E1E8F1]'
                  } text-center m-auto  `}
              ></div>
            </div>
            {directionRight && (
              <div className="flex flex-col text-sm w-[13rem] ml-4 break-all ">
                <h1
                  className={`${
                    item.active ? 'text-accent-1 ' : 'text-[#304157]'
                  } font-bold lg:text-base text-sm  `}
                >
                  {item.title}
                </h1>
                <p className="text-xs lg:text-sm text-secondary">{item.desc}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default CustomSteps;
