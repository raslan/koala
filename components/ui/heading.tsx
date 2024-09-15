import AppIcon from '../icons/app';
import ClerkBlock from './clerkblock';
import GlobalTriggerButton from './global-trigger';

export const Heading = ({
  children,
  showClerk = true,
}: {
  children: React.ReactNode;
  showClerk?: boolean;
}) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex md:gap-3 items-center'>
        <AppIcon className='w-10 h-10 md:w-16 md:h-16 bg-primary dark:bg-background rounded-lg' />
        <h1 className='mt-2 text-2xl font-extrabold tracking-tight md:text-5xl mb-2'>
          {children}
        </h1>
      </div>
      <div className='flex items-center gap-3'>
        <GlobalTriggerButton />
        {showClerk && (
          <>
            <ClerkBlock />
          </>
        )}
      </div>
    </div>
  );
};
