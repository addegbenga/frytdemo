import MySelect from '@components/ui/Input/SelectInput';
import { Button } from '@components/ui';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { steps } from './types';

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
];

export default function Ship_Payment_2() {
  const router = useRouter();

  const handleContinue = () => {
    router.replace({
      pathname: '/dashboard/ship_car',
      query: { step_view: steps.ship_payment_2, no: 4 },
    });
  };
  return (
    <div className="w-1/2 p-5 overflow-x-hidden bg-white border border-t-4 rounded-md shadow-md border-t-accent-1 h-fit ">
      <Link
        passHref={true}
        href={{
          pathname: '/dashboard/ship_car',
          query: { step_view: steps.ship_payment_1, no: 4 },
        }}
      >
        <button className="mb-5 flex cursor-pointer items-center gap-1 text-xs text-[#304157] font-medium ">
          <IoIosArrowRoundBack size={24} />
          Previous
        </button>
      </Link>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-secondary">Step 2/5</p>
          <h1 className="text-[#0E172C] font-semibold">Make Payments</h1>
        </div>
        <h1 className="text-sm font-semibold text-accent-1">Request Details</h1>
      </div>

      <section className="flex flex-col max-w-md gap-4 p-5 px-3 mx-auto mt-5">
        <h1 className="text-xs text-center text-secondary">
          Select any of the below options to make payments with
        </h1>
        <div className="px-10 py-5 bg-white shadow ">
          <div className="flex justify-center mt-4">
            <Button onClick={() => handleContinue()} className="w-full py-2 ">
              Make Payments
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
