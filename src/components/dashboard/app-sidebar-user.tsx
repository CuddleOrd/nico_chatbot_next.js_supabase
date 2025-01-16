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
        <Button onClick={logout} className="d-flex justify-center">
          <LogOut className="ml-2 h-4 w-4" />
          <span>Logout</span>
        </Button>
      </SidebarMenuButton>
    </SidebarMenu>
  );
};
