'use client';

// import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { PlusIcon, WalletIcon } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar';

import { AppSidebarConversations } from './app-sidebar-conversations';
import { AppSidebarUser } from './app-sidebar-user';

const AppSidebarHeader = () => {
  return (
    <SidebarHeader>
      {/* <div className="flex items-center justify-between px-1">
        <span className="pl-2 text-lg font-medium tracking-tight group-data-[collapsible=icon]:hidden">
          Halo.com
        </span>
        <Image src="/logo.svg" alt={'logo'} width={28} height={28} />
      </div> */}
    </SidebarHeader>
  );
};

const AppSidebarFooter = () => {
  const { state } = useSidebar();

  return (
    <SidebarFooter>
      {state !== 'collapsed' && (
        <>
          <AppSidebarUser />
        </>
      )}
    </SidebarFooter>
  );
};

const ExploreItems = [
  {
    title: 'New Chat',
    url: '/',
    segment: 'home',
    icon: PlusIcon,
    external: false,
  },
] as const;

export function AppSidebar() {
  const pathname = usePathname();

  const getIsActive = (itemSegment: string) => {
    if (itemSegment === 'home') {
      return pathname === '/';
    }
    return pathname.startsWith(`/${itemSegment}`);
  };

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="hidden p-3 md:flex"
    >
      <AppSidebarHeader />

      <SidebarContent>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {ExploreItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={getIsActive(item.segment)}
                    >
                      <Link
                        href={item.url}
                        target={item.external ? '_blank' : undefined}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                {/* <SidebarMenuItem key={'Buy $NIKO'}>
                  <SidebarMenuButton asChild>
                    <Link href={'/'}>
                      <Image
                        src="/logo.svg"
                        alt={'logo'}
                        width={20}
                        height={20}
                        className="-ml-[1px]"
                      />
                      <span className="-ml-[2px]">
                        {'Buy $NIKO'}{' '}
                        <span className="ml-1 text-end text-xs">
                          ( Coming soon )
                        </span>
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem> */}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <AppSidebarConversations />
        </SidebarContent>
      </SidebarContent>

      <AppSidebarFooter />
    </Sidebar>
  );
}
