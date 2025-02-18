import { useEffect, useRef } from 'react';

import { ArrowUpRight, Link, SendHorizonalIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ConversationInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => Promise<void>;
}

const MAX_CHARS = 2000;

export function ConversationInput({
  value,
  onChange,
  onSubmit,
}: ConversationInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!value.trim()) return;
    await onSubmit(value);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= MAX_CHARS) {
      onChange(newValue);
      return;
    }
    toast.error('Maximum character limit reached');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  return (
    <div className="relative duration-500 animate-in fade-in slide-in-from-bottom-4">
      <div className="shadow-black/4 relative rounded-full bg-muted p-1 shadow-sm">
        <form
          onSubmit={handleSubmit}
          className="flex flex-row items-center gap-1 overflow-hidden"
        >
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            disabled={!value.trim()}
            className="group relative flex h-10 w-[3.8rem] items-center justify-center
                rounded-full bg-gray-200
                transition-all duration-200
                ease-in-out
                hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 sm:w-[2.97rem]"
          >
            <Link className="h-4 w-4 rotate-90" />
          </Button>
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            maxLength={MAX_CHARS}
            placeholder="Start a new conversation..."
            className="h-[43.2px!important] min-h-[43.2px] w-full resize-none overflow-hidden border-0 bg-transparent p-3 py-2 text-base shadow-none focus-visible:ring-0 sm:py-3"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!value.trim()}
            className="group relative flex h-10 w-28 items-center
                justify-center
                rounded-full bg-[#f57254]
                text-white 
                transition-all
                duration-200 ease-in-out
                active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
            <ArrowUpRight className="h-4 w-4 transition-all duration-300 group-hover:rotate-45" />
          </Button>
        </form>
      </div>
    </div>
  );
}
