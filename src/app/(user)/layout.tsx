import { cookies } from 'next/headers';
import Link from 'next/link';

import { User } from 'lucide-react';

import { AppSidebar } from '@/components/dashboard/app-sidebar';
import Hello from '@/components/hello';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value !== 'false';
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <Hello />

      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger className="absolute z-50 mb-0 rounded-full bg-[#611a4d29] duration-500 hover:bg-gray-700/90 hover:text-white" />
        {children}
      </main>

      <Link
        href={'/account'}
        className={`absolute right-3 top-3 z-50 mb-0 rounded-full bg-[#db9cc9] p-2 duration-500 hover:bg-gray-700/90 hover:text-white sm:bg-[#611a4d29]`}
      >
        <User />
      </Link>
    </SidebarProvider>
  );
}
