import { cn } from '@/lib/utils';
import Link from 'next/link';
import { buttonVariants } from './button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

const BackButton = ({ previousPage }: { previousPage: string }) => {
  return (
    <div className='relative -left-4 top-3 inline-flex items-center justify-center font-bold'>
      <Link
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'flex w-full h-full hover:bg-inherit font-bold gap-3 text-lg'
        )}
        href={previousPage}
      >
        <ArrowLeftIcon />
        <span>Guides</span>
      </Link>
    </div>
  );
};

export default BackButton;
