'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
import { useTheme } from 'next-themes';

const solanaConnectors = toSolanaWalletConnectors({
  shouldAutoConnect: false,
});

type TLoginMethod = (
  | 'wallet'
  | 'email'
  | 'sms'
  | 'google'
  | 'twitter'
  | 'discord'
  | 'github'
  | 'linkedin'
  | 'spotify'
  | 'instagram'
  | 'tiktok'
  | 'apple'
  | 'farcaster'
  | 'telegram'
)[];

export default function AuthProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const loginMethod: TLoginMethod = ['email'];

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        appearance: {
          theme: resolvedTheme as 'light' | 'dark',
          logo: resolvedTheme === 'dark' ? '/letter_w.svg' : '/letter.svg',
        },
        externalWallets: {
          solana: {
            connectors: solanaConnectors,
          },
        },
        loginMethods: loginMethod,
      }}
    >
      {children}
    </PrivyProvider>
  );
}
