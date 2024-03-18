import { ModeToggle } from './mode-toggle';
import AppIcon from '../icons/app';
import ClerkBlock from './clerkblock';

export const Heading = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex justify-between items-start'>
      <div className='flex lg:gap-3 items-center'>
        <AppIcon className='w-10 h-10 lg:w-20 lg:h-20 bg-zinc-950 rounded-lg' />
        <h1 className='mt-2 text-2xl font-extrabold tracking-tight lg:text-6xl mb-2'>
          {children}
        </h1>
      </div>
      <div className='relative flex items-center gap-3 right-2 top-2'>
        <ClerkBlock />
        <ModeToggle />
      </div>
    </div>
  );
};
