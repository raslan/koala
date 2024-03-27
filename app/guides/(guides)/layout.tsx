import BackButton from '@/components/ui/back-button';
import GlobalTriggerButton from '@/components/ui/global-trigger';
import { ModeToggle } from '@/components/ui/mode-toggle';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className='flex justify-between items-center'>
        <BackButton previousPage='/guides' />
        <div className='flex items-center gap-3'>
          <GlobalTriggerButton />
          <ModeToggle />
        </div>
      </div>

      {children}
    </>
  );
};
export default layout;
