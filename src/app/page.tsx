'use client';

import { useRouter } from 'next/navigation';

import { useLogin } from '@privy-io/react-auth';
import { motion } from 'framer-motion';

import { AiParticlesBackground } from '@/components/ui/ai-particles-background';

export default function Home() {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  const router = useRouter();
  let { login } = useLogin({
    onComplete: (
      user,
      isNewUser,
      wasAlreadyAuthenticated,
      loginMethod,
      loginAccount,
    ) => {
      router.push('/home');
    },
  });

  if (isMaintenanceMode) {
    login = () => {
      window.location.href = 'https://x.com/austin_sh';
    };
  }

  return (
    <div className="flex flex-col">
      <AiParticlesBackground />
      <main className="relative z-50 flex h-screen w-screen flex-col items-center justify-center gap-8">
        <motion.div
          className="text-center text-6xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          The Intelligent Copilot for{' '}
          <span className="bg-gradient-to-r from-[#9945FF] via-[#14F195] to-[#00F5FF] bg-clip-text text-transparent">
            Solana
          </span>
        </motion.div>

        <motion.button
          className="hover:bg-black-700 focus:ring-black-300 rounded-md bg-black px-6 py-3 font-semibold text-white shadow-md focus:outline-none focus:ring"
          onClick={login}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: 'easeOut',
          }}
        >
          Getting Started
        </motion.button>
      </main>
    </div>
  );
}
