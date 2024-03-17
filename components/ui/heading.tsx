import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { ModeToggle } from './mode-toggle';
import { Button } from './button';
import AppIcon from '../icons/app';

export const Heading = ({ children }: { children: string }) => {
  return (
    <div className='flex justify-between items-start'>
      <div className='flex gap-3 items-center'>
        <AppIcon className='w-10 h-10 lg:w-20 lg:h-20 bg-zinc-950 rounded-lg' />
        <h1 className='mt-1 text-3xl font-extrabold tracking-tight lg:text-6xl mb-2'>
          {children}
        </h1>
      </div>
      <div className='relative flex items-center gap-3 right-2 top-2'>
        <SignedOut>
          <SignInButton mode='modal'>
            <Button variant={'default'}>Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ModeToggle />
      </div>
    </div>
  );
};
