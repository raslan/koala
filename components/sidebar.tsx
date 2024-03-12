import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import CalculatorIcon from '@/components/icons/calculator';
import EuroIcon from '@/components/icons/euro';
import { Separator } from '@/components/ui/separator';
import { ModeToggle } from '@/components/ui/mode-toggle';

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
