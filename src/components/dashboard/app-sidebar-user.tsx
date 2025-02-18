'use client';

import { LogOut } from 'lucide-react';

import { SidebarMenu, SidebarMenuButton } from '@/components/ui/sidebar';
import { useUser } from '@/hooks/use-user';

import { Button } from '../ui/button';

export const AppSidebarUser = () => {
  const { logout } = useUser();

  return (
    <SidebarMenu>
      <SidebarMenuButton asChild>
        <Button
          onClick={logout}
          className="d-flex h-10 justify-center rounded-full bg-gray-700 duration-300 hover:bg-gray-800 hover:text-white"
        >
          <LogOut className="ml-2 h-4 w-4" />
          <span>Logout</span>
        </Button>
      </SidebarMenuButton>
    </SidebarMenu>
  );
};
