'use client';

import Image from 'next/image';

import { useSidebar } from './ui/sidebar';

export default function Hello() {
  const { state } = useSidebar();
  return (
    <div
      className={`absolute hidden sm:flex ${state === 'expanded' ? 'left-[16rem]' : 'left-3'} top-3 z-40 items-center gap-2 transition-all duration-300`}
    >
      <div className="rounded-xl bg-gray-700/90 p-3">
        <Image
          src={'/icons/white_hand.svg'}
          height={18}
          width={18}
          alt="hello"
          className="text-gray-200"
        />
      </div>

      <span className="text-xl font-semibold">SayHalo</span>
    </div>
  );
}
