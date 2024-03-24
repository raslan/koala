import { Heading } from '@/components/ui/heading';
import RadioCard from '@/components/ui/radio-card';
import Link from 'next/link';

const guides = [
  {
    href: '/guides/calculator',
    title: 'How to use the Calculator',
  },
];

const page = () => {
  return (
    <div>
      <Heading>Guides</Heading>
      <div className='py-6 dark:px-4 grid grid-cols-1 lg:grid-cols-3 max-w-3xl gap-4'>
        {guides.map((article) => (
          <Link href={article.href} key={article.title}>
            <RadioCard dark>{article.title}</RadioCard>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default page;
