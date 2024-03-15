'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import CalculatorIcon from '@/components/icons/calculator';
import EuroIcon from '@/components/icons/euro';
import { Separator } from '@/components/ui/separator';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { useMediaQuery } from 'usehooks-ts';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const pages = [
  {
    path: '/',
    name: 'Calculator',
    icon: CalculatorIcon,
  },
  {
    path: '/rates',
    name: 'Rates',
    icon: EuroIcon,
  },
];

export default function Sidebar() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  if (!isDesktop)
    return (
      <Tabs
        defaultValue={'Calculator'}
        className='w-full z-50 fixed bottom-0 max-h-40 bg-background'
      >
        <TabsList className='grid grid-cols-2 w-full justify-around items-center bg-transparent h-full'>
          {pages.map(({ path, name, icon: Icon }) => (
            <Link
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'flex flex-col justify-center w-full text-sm h-full hover:bg-inherit'
              )}
              href={path}
              key={name}
            >
              <TabsTrigger className='p-3' value={name}>
                <Icon />
                {name}
              </TabsTrigger>
              <Separator className='bg-transparent' />
            </Link>
          ))}
        </TabsList>
      </Tabs>
    );
  return (
    <div className='p-4 flex flex-col w-64 rounded-md border gap-4 pt-10'>
      {pages.map(({ path, name, icon: Icon }) => (
        <>
          <Link
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'flex flex-col justify-center gap-3 w-full text-lg p-4 h-full'
            )}
            href={path}
            key={name}
          >
            <Icon />
            {name}
          </Link>
          <Separator className='bg-transparent' />
        </>
      ))}
      <div className='w-full flex items-center justify-center'>
        <ModeToggle />
      </div>
    </div>
  );
}
