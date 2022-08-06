import React, { useState } from 'react';
import s from './Slider.module.css';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

interface ISliderProps {}

const MySlider: React.FC<ISliderProps> = ({ children }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <>
      <div className="relative overflow-hidden navigation-wrapper rounded-2xl">
        <div ref={sliderRef} className="keen-slider">
          {children}
        </div>
        {loaded && instanceRef.current && <></>}
      </div>
      {loaded && instanceRef.current && (
        <div className="flex justify-center gap-1 p-5">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={
                  'h-2 w-2 rounded-full' +
                  (currentSlide === idx
                    ? ' h-2 w-2 rounded-full bg-slate-800 '
                    : ' bg-accent-1 ')
                }
              ></button>
            );
          })}
        </div>
      )}
    </>
  );
};
export default MySlider;
