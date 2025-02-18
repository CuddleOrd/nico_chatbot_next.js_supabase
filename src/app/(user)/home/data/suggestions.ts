import { ComponentType } from 'react';

import {
  ArrowUpRight,
  DollarSign,
  RefreshCw,
  Rocket,
  TrendingUp,
  Wallet,
} from 'lucide-react';

export interface Suggestion {
  id: string;
  title: string;
  subtitle: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}

export const SUGGESTIONS: Suggestion[] = [
  {
    id: 'launch-token',
    title: 'Launch a new token',
    subtitle: 'deploy a new token on pump.fun',
    icon: Rocket,
  },
  {
    id: 'swap-sol-usdc',
    title: 'Swap 1 SOL for USDC',
    subtitle: 'using Jupiter to swap on Solana',
    icon: RefreshCw,
  },
  {
    id: 'solana-trends',
    title: "What's trending on Solana?",
    subtitle: 'find the current market trends',
    icon: TrendingUp,
  },
  {
    id: 'price-feed',
    title: "What's the price of SOL?",
    subtitle: 'find the current price of SOL',
    icon: DollarSign,
  },
  {
    id: 'top-gainers-last-24h',
    title: 'Top gainers in the last 24h',
    subtitle: 'find the top gainers in the last 24 hours',
    icon: ArrowUpRight,
  },
  {
    id: 'check-my-wallet',
    title: 'Check my wallet',
    subtitle: 'check the portfolio of your wallet',
    icon: Wallet,
  },
];

export function getRandomSuggestions(count: number): Suggestion[] {
  const safeCount = Math.min(count, SUGGESTIONS.length);
  const startIndex = Math.floor(Date.now() / 1000) % SUGGESTIONS.length;

  const rotatedSuggestions = [
    ...SUGGESTIONS.slice(startIndex),
    ...SUGGESTIONS.slice(0, startIndex),
  ];

  return rotatedSuggestions.slice(0, safeCount);
}
