import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AppIcon from '../icons/app';

export function GuideAlert({
  title,
  description,
}: {
  title: React.ReactNode;
  description: React.ReactNode;
}) {
  return (
    <Alert>
      <AppIcon className='h-4 w-4' />
      <AlertTitle className='font-bold'>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
