import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { Button } from '@components/ui';
import Link from 'next/link';
import { useRouter } from 'next/router';

const cardcontent = [
  {
    name: 'A Client Account',
    desc: 'Requests to buy or ship',
    id: '1',
    querystring: 'client_account',
  },
  {
    name: 'A Partner Account',
    desc: 'Delivery, Buying or Shipping Agent',
    id: '2',
    querystring: 'partner_account',
  },
];
const cardcontent2 = [
  {
    name: 'Delivery and buying Agent',
    desc: 'Picks deliver items to shipping agents',
    id: '1',
    querystring: 'delivery_account',
  },
  {
    name: ' Shipping Agent',
    desc: 'ships items',
    id: '2',
    querystring: 'shipping_account',
  },
];
export enum SelectedEnums {
  // eslint-disable-next-line no-unused-vars
  client_account = 'client_accountdelivery_account',
  // eslint-disable-next-line no-unused-vars
  delivery_account = 'partner_accountdelivery_account',
  // eslint-disable-next-line no-unused-vars
  shipping_account = 'partner_accountshipping_account',
}

export default function Example() {
  const router = useRouter();
  const [selected, setSelected] = useState(cardcontent[0]);
  const [selected2, setSelected2] = useState(cardcontent2[0]);

  const handleSelect = () => {
    const selectedDropDown1 = selected.querystring + selected2.querystring;
    if (selectedDropDown1 === SelectedEnums.client_account) {
      const txt = (router.query.selected_option = 'client_account');
      router.push({
        pathname: '/auth/register',
        query: { selected_option: txt },
      });
    } else if (selectedDropDown1 === SelectedEnums.delivery_account) {
      const txt = (router.query.selected_option = 'delivery_account');
      router.push({
        pathname: '/auth/register',
        query: { selected_option: txt },
      });
    } else {
      const txt = (router.query.selected_option = 'shipping_account');
      router.push({
        pathname: '/auth/register',
        query: { selected_option: txt },
      });
    }
  };

  return (
    <div className="w-full lg:max-w-2xl lg:flex lg:flex-col lg:gap-5">
      <div className="w-full mx-auto ">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-6 lg:space-y-0 lg:flex lg:gap-4">
            {cardcontent.map((item, idx) => (
              <RadioGroup.Option
                key={item.name}
                value={item}
                className={({ active, checked }) =>
                  `${active ? '' : ''}
                  ${
                    checked
                      ? 'bg-btn-primary shadow-2xl  text-white'
                      : 'bg-white border-btn-secondary'
                  }
                    relative w-full flex cursor-pointer border rounded-lg px-5 py-6 lg:py-8 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex items-center w-full gap-5 ">
                      <div className="w-10 h-10 rounded bg-slate-300"></div>
                      <div className="flex items-center justify-between gap-5">
                        <div>
                          <RadioGroup.Label
                            as="p"
                            className={`font-bold  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {item.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="p"
                            className={` leading-4 text-xs ${
                              checked ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                            <span>{item.desc}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked ? (
                        <div className="ml-auto text-white shrink-0">
                          <CheckIcon className="w-6 h-6" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 ml-auto text-white border rounded-full "></div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
        {/* Drop down section */}
        {selected.id === '2' && (
          <div className="p-4 pb-5 mt-4 bg-[#F8FAFC] rounded shadow-md lg:max-w-xs lg:ml-auto">
            <h1 className="my-3 mb-7">Select a partner account type</h1>
            <RadioGroup value={selected2} onChange={setSelected2}>
              <RadioGroup.Label className="sr-only">
                Server size
              </RadioGroup.Label>
              <div className="space-y-6">
                {cardcontent2.map((item, idx) => (
                  <RadioGroup.Option
                    key={item.name}
                    value={item}
                    className={({ active, checked }) =>
                      `${active ? '' : ''}
                  ${
                    checked
                      ? 'bg-btn-primary shadow-2xl bg-opacity-75 text-white'
                      : 'bg-white'
                  }
                    relative flex cursor-pointer border rounded-lg px-5 py-4 shadow-md focus:outline-none`
                    }
                  >
                    {({ active, checked }) => (
                      <section className="relative ">
                        <div className="flex items-center justify-between w-full ">
                          <div className="flex items-center gap-5">
                            {checked ? (
                              <div className="text-white shrink-0">
                                <CheckIcon className="w-6 h-6" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 text-white border rounded-full "></div>
                            )}
                            <div>
                              <RadioGroup.Label
                                as="p"
                                className={`font-medium text-sm ${
                                  checked ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {item.name}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className={`inline text-xs ${
                                  checked ? 'text-sky-100' : 'text-gray-500'
                                }`}
                              >
                                <span>{item.desc}</span>
                              </RadioGroup.Description>
                            </div>
                          </div>
                        </div>
                      </section>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}
      </div>

      <Button
        onClick={() => handleSelect()}
        className="w-full lg:w-1/3 mt-4 lg:mt-0 lg:ml-auto  h-[54px] text-sm"
      >
        Continue
      </Button>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
