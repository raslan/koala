'use client';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from './button';

const ClerkBlock = () => {
  return (
    <>
      <SignedOut>
        <SignInButton mode='modal'>
          <Button variant={'default'}>Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};
export default ClerkBlock;
