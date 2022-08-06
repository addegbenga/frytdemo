import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { IoCaretDown } from 'react-icons/io5';

interface IMySelectProps {
  data?: any;
  label: string;
  placeholder?: string;
  selected?: any;
  setSelected?: any;
  handleSelectChange?: any;
  defaultValue?: any;
}

const MySelect: React.FC<IMySelectProps> = ({
  data,
  label,
  placeholder,
  selected,
  setSelected,
  defaultValue,
}) => {
  return (
    <div className="">
      <Listbox value={selected} onChange={setSelected}>
        <Listbox.Label className="text-sm text-secondary placeholder:text-secondary">
          {label}
        </Listbox.Label>
        <div className="relative mt-1">
          <Listbox.Button className="relative bg-white   text-secondary w-full py-2.5 pl-3 pr-10 text-left  px-4 text-base  outline-none   focus:border-[#DDC38F] h-[45px]   lg:h-[50px]  border  border-[#C9D5E2] text-[#304157]  placeholder:text-[#E1E8F1] rounded-md">
            <span className="block text-sm truncate text-secondary">
              {!selected ? (
                <>
                  <span className="text-sm italic  text-[#E1E8F1]">
                    {placeholder}
                  </span>
                  <span className="text-sm italic ">{defaultValue}</span>
                </>
              ) : selected.name ? (
                selected.name
              ) : (
                selected.type
              )}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <IoCaretDown className="w-3 h-3" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-40 w-full py-1 mt-1 overflow-auto text-sm bg-white rounded-md shadow-lg lg:text-base max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
              {data?.length &&
                data?.map((person: any, personIdx: any) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 text-secondary  px-4 ${
                        active ? 'bg-amber-100 text-amber-900' : ''
                      }`
                    }
                    value={person}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate  placeholder:text-secondary ${
                            selected ? 'font-medium ' : 'font-normal'
                          }`}
                        >
                          {person.name ? person.name : person.type}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default MySelect;
