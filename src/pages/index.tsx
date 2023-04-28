import { Button, Image } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <div className="bg-white">
        <div className="flex border-b items-stretch">
          <div className="px-4 mr-auto flex items-center">
            <Image src="/logo.png" alt="logo" width={70} height={70} />
            <div className="font-bold uppercase text-green-700 text-2xl">wedi</div>
          </div>
          <button className="border-l p-4 text-green-800 uppercase cursor-pointer hover:underline flex items-center">
            about us
          </button>
          <button className="border-l p-4 text-green-800 uppercase cursor-pointer hover:underline flex items-center">
            interations
          </button>
          <button
            onClick={() => router.push('/signin')}
            className="border-l p-4 text-green-800 uppercase flex items-center gap-2 cursor-pointer hover:underline"
          >
            <span>login</span>
            <IconArrowRight />
          </button>
        </div>
        <div>
          text
          <Button>Get started</Button>
        </div>
        <div>Time line</div>
        <div>info 1 info 2 ...</div>
        <div>tech 1 tech 2 ...</div>
      </div>
      <footer>footer</footer>
    </>
  );
};

export default Home;
