'use client';

import Link from 'next/link';

import { User } from 'lucide-react';

import { AppSidebar } from '@/components/dashboard/app-sidebar';
import Hello from '@/components/hello';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useUser } from '@/hooks/use-user';

import { HomeContent } from './(user)/home/home-content';

export default function HomePage() {
  const { user } = useUser();

  return (
    <SidebarProvider defaultOpen={false}>
      <Hello />

      {user && (
        <>
          <SidebarTrigger className="absolute z-50 mb-0 rounded-full bg-[#611a4d29] duration-500 hover:bg-gray-700/90 hover:text-white" />

          <AppSidebar />
          <Link
            href={'/account'}
            className={`absolute right-3 top-3 z-50 mb-0 rounded-full bg-[#db9cc9] p-2 duration-500 hover:bg-gray-700/90 hover:text-white sm:bg-[#611a4d29]`}
          >
            <User />
          </Link>
        </>
      )}

      <main className="w-full">
        <HomeContent />
      </main>
    </SidebarProvider>
  );
}
