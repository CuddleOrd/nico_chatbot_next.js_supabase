'use client';

import { WalletCard } from '@/components/dashboard/wallet-card';
import { useUser } from '@/hooks/use-user';
import { EmbeddedWallet } from '@/types/db';

import { LoadingStateSkeleton } from './loading-skeleton';

export function AccountContent() {
  const { isLoading, user } = useUser();

  if (isLoading || !user) {
    return <LoadingStateSkeleton />;
  }

  const wallets = user?.wallets || [];

  return (
    <div className="flex flex-1 flex-col py-8">
      <div className="w-full px-8">
        <div className="max-w-3xl space-y-6">
          <section className="space-y-4">
            {wallets?.map((wallet: EmbeddedWallet) => (
              <WalletCard key={wallet.id} wallet={wallet} />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
