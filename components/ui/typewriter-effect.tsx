'use client';

import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';
import { motion, stagger, useAnimate, useInView } from 'framer-motion';
import { useEffect } from 'react';

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(''),
    };
  });

  const [scope, animate] = useAnimate();
  const debounce = useDebounce();
  useEffect(() => {
    debounce(() => {
      animate(
        'span',
        {
          display: 'inline-block',
          opacity: 0.9,
        },
        {
          duration: 0.5,
          ease: 'easeIn',
        }
      );
    }, 300);
  }, [words]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className='inline'>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}-${Math.random()}`} className='inline-block'>
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    `text-foreground opacity-0 hidden`,
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };
  return (
    <div
      className={cn(
        'text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center',
        className
      )}
    >
      {renderWords()}
    </div>
  );
};
