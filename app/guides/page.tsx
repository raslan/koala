import { Heading } from '@/components/ui/heading';
import Link from 'next/link';

const ArticleLink = ({ href, title }: any) => (
  <Link className='col-span-1' href={href}>
    <div className='items-center rounded-md border-2 border-muted p-1 hover:border-accent'>
      <div className='space-y-2 rounded-sm bg-[#ecedef] p-2'>
        <div className='space-y-2 rounded-md bg-white p-2 shadow-sm'>
          <div className='h-2 w-[80px] rounded-lg bg-[#ecedef]' />
          <div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
        </div>
        <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
          <div className='h-4 w-4 rounded-full bg-[#ecedef]' />
          <div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
        </div>
        <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
          <div className='h-4 w-4 rounded-full bg-[#ecedef]' />
          <div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
        </div>
      </div>
    </div>
    <span className='block w-full p-2 text-center font-normal'>{title}</span>
  </Link>
);

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
      <div className='p-4 grid grid-cols-1 lg:grid-cols-3 max-w-3xl gap-4'>
        {guides.map((article) => (
          <ArticleLink
            href={article.href}
            title={article.title}
            key={article.title}
          />
        ))}
      </div>
    </div>
  );
};
export default page;
