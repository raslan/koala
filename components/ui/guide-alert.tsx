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
      <AppIcon className='h-6 w-6 bg-zinc-950 rounded-lg' />
      <AlertTitle className='font-bold'>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
