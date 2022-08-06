import { Button } from '@components/ui';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { steps } from './types';

export default function Ship_Payment_1() {
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
          query: { step_view: steps.ship_summary, no: 3 },
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

      <section className="flex flex-col max-w-md gap-4 p-5 px-3 mx-auto mt-10 bg-white border rounded-lg">
        <div className="flex items-center justify-between ">
          <h1 className="text-sm font-semibold">Initial Cost Summary</h1>
          <p className="text-xs">2 Items</p>
        </div>
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 border rounded-md"></div>
            <p className="text-xs text-[#0E172C]">Pickup / Delivery Cost</p>
          </div>
          <p className="text-xs text-[#0E172C font-semibold">$250</p>
        </div>
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 border rounded-md"></div>
            <p className="text-xs text-[#0E172C]">Shipping Cost</p>
          </div>
          <p className="text-xs text-[#0E172C font-semibold">$250</p>
        </div>
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-2">
            <p className="text-xs text-secondary">Subtotal</p>
          </div>
          <p className="text-xs text-[#0E172C font-semibold">$1250</p>
        </div>
        <div className="flex items-center justify-end gap-3 ">
          <div className="flex gap-2">
            <p className="text-xs text-secondary">Total</p>
          </div>
          <p className="text-xs text-[#0E172C] font-semibold">$1250</p>
        </div>
        <div className="flex justify-center mt-4">
          <Button onClick={() => handleContinue()} className="w-full py-2 ">
            Make Payments
          </Button>
        </div>
      </section>
    </div>
  );
}
