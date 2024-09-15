'use client';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from './button';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

const ClerkBlock = () => {
  return (
    <>
      <SignedOut>
        <SignInButton mode='modal'>
          <Button className='hidden lg:block' variant={'default'}>
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};
export default ClerkBlock;
