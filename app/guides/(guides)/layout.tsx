import BackButton from '@/components/ui/back-button';
import GlobalTriggerButton from '@/components/ui/global-trigger';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className='flex justify-between items-center'>
        <BackButton previousPage='/guides' />
        <GlobalTriggerButton />
      </div>

      {children}
    </>
  );
};
export default layout;
