import { Button } from '@components/ui';
import Link from 'next/link';

export default function index() {
  return (
    <div className="flex flex-col max-w-2xl gap-10 py-20 m-auto p-14">
      <h1 className="text-4xl font-black lg:text-center">Welcome to Frythub</h1>
      <Button className="w-full h-[54px] px-10 font-bold text-lg ">
        <Link href="/select_user_type">Get Started</Link>
      </Button>
      <div className="mt-2 text-lg text-center">
        <p>
          Already in the hub?{' '}
          <span className="font-bold">
            {' '}
            <Link href="/auth/register">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
