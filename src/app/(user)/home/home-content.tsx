'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { useLogin } from '@privy-io/react-auth';
import { useChat } from 'ai/react';
import { Loader2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

import ChatInterface from '@/app/(user)/chat/[id]/chat-interface';
import BlurFade from '@/components/ui/blur-fade';
import TypingAnimation from '@/components/ui/typing-animation';
import { useConversations } from '@/hooks/use-conversations';
import { useUser } from '@/hooks/use-user';
import { cn } from '@/lib/utils';

import { ConversationInput } from './conversation-input';
import { getRandomSuggestions } from './data/suggestions';
import { SuggestionCard } from './suggestion-card';

export function HomeContent() {
  const pathname = usePathname();
  const suggestions = useMemo(() => getRandomSuggestions(3), []);
  const [showChat, setShowChat] = useState(false);
  const [chatId, setChatId] = useState(() => uuidv4());
  const { user, isLoading } = useUser();
  const router = useRouter();

  const { login } = useLogin({
    onComplete: () => {
      router.refresh();
    },
  });

  const { conversations, refreshConversations } = useConversations(user?.id);

  const resetChat = useCallback(() => {
    setShowChat(false);
    setChatId(uuidv4());
  }, []);

  const { messages, input, handleSubmit, setInput } = useChat({
    id: chatId,
    initialMessages: [],
    body: { id: chatId },
    onFinish: () => {
      // Only refresh if we have a new conversation that's not in the list
      if (chatId && !conversations?.find((conv) => conv.id === chatId)) {
        refreshConversations();
      }
    },
  });

  const handleSend = async (value: string) => {
    if (!value.trim()) return;

    if (!user) {
      login();
      return;
    }

    const fakeEvent = new Event('submit') as any;
    fakeEvent.preventDefault = () => {};

    await handleSubmit(fakeEvent, { data: { content: value } });
    setShowChat(true);
    window.history.replaceState(null, '', `/chat/${chatId}`);
  };

  // Reset chat when pathname changes to /home
  useEffect(() => {
    if (pathname === '/') {
      resetChat();
    }
  }, [pathname, resetChat]);

  // 监听浏览器的前进后退
  useEffect(() => {
    const handlePopState = () => {
      if (location.pathname === '/') {
        resetChat();
      } else if (location.pathname === `/chat/${chatId}`) {
        setShowChat(true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [chatId, resetChat]);

  if (user && isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const mainContent = (
    <div
      className={cn(
        'mx-auto flex h-screen w-full max-w-6xl flex-1 flex-col items-stretch justify-between px-3 py-0',
      )}
    >
      <BlurFade delay={0.2}>
        <div className="mx-auto mb-4 mt-44 flex h-20 w-20 items-center justify-center rounded-3xl border border-gray-600/60 bg-gray-700/90 shadow-md sm:mt-32">
          <Image
            src={'/icons/white_hand.svg'}
            height={40}
            width={40}
            alt="hello"
            className="h-10 w-10 text-gray-200"
          />
        </div>
        <TypingAnimation
          className="bg-gradient-to-r from-gray-500 to-gray-500/70 bg-clip-text pb-2 text-center text-4xl font-semibold tracking-tight text-gray-400 text-transparent md:text-4xl lg:text-[2.6rem]"
          duration={50}
          text="Hi, there"
        />
        <TypingAnimation
          className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text pb-6 text-center text-4xl font-semibold tracking-tight text-transparent md:text-4xl lg:text-[2.6rem]"
          duration={50}
          text="Can I help you with anything?"
        />
        <div className="flex justify-center">
          <p className="max-w-[490px] text-center text-gray-400">
            Ready to assist you with anything you need, from answering questions
            to providing recommendations, Let{"'"}s get started!
          </p>
        </div>
      </BlurFade>

      <div className="mx-auto mb-3 w-full max-w-2xl space-y-8">
        <div className="space-y-4">
          <BlurFade delay={0.2}>
            <div className="space-y-2">
              <div className="hidden grid-cols-3 gap-4 md:grid">
                {suggestions.map((suggestion, index) => (
                  <SuggestionCard
                    key={suggestion.title}
                    {...suggestion}
                    delay={0.3 + index * 0.1}
                    onSelect={setInput}
                  />
                ))}
              </div>
            </div>
          </BlurFade>
        </div>

        <BlurFade delay={0.1}>
          <ConversationInput
            value={input}
            onChange={setInput}
            onSubmit={handleSend}
          />
        </BlurFade>
      </div>
    </div>
  );

  return (
    <div className="relative h-screen">
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-300',
          showChat ? 'pointer-events-none opacity-0' : 'opacity-100',
        )}
      >
        {mainContent}
      </div>

      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-300',
          showChat ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <ChatInterface id={chatId} initialMessages={messages} />
      </div>
    </div>
  );
}
