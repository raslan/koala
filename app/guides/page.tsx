import { Heading } from '@/components/ui/heading';
import RadioCard from '@/components/ui/radio-card';
import { guides } from '@/lib/pages';
import Link from 'next/link';

const page = () => {
  return (
    <div>
      <Heading>Guides</Heading>
      <div className='py-6 dark:px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-3xl gap-4'>
        {guides.map((article) => (
          <Link href={article.href} key={article.title}>
            <RadioCard
              mainBg='bg-secondary'
              secondaryBg='bg-primary'
              primaryBg='bg-accent'
            >
              {article.title}
            </RadioCard>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default page;
