import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { ModeToggle } from './mode-toggle';
import { Button } from './button';

export const Heading = ({ children }: { children: string }) => {
  return (
    <div className='flex justify-between items-start'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl mb-2'>
        {children}
      </h1>
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
