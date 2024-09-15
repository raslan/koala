import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const pages = [
  {
    href: '/',
    title: 'Calculator',
    icon: ({ width = 1, height = 1 }: { width?: number; height?: number }) => (
      <svg
        width={30 / width}
        height={30 / height}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M17 5H7V7H17V5Z' fill='currentColor' />
        <path d='M7 9H9V11H7V9Z' fill='currentColor' />
        <path d='M9 13H7V15H9V13Z' fill='currentColor' />
        <path d='M7 17H9V19H7V17Z' fill='currentColor' />
        <path d='M13 9H11V11H13V9Z' fill='currentColor' />
        <path d='M11 13H13V15H11V13Z' fill='currentColor' />
        <path d='M13 17H11V19H13V17Z' fill='currentColor' />
        <path d='M15 9H17V11H15V9Z' fill='currentColor' />
        <path d='M17 13H15V19H17V13Z' fill='currentColor' />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M3 3C3 1.89543 3.89543 1 5 1H19C20.1046 1 21 1.89543 21 3V21C21 22.1046 20.1046 23 19 23H5C3.89543 23 3 22.1046 3 21V3ZM5 3H19V21H5V3Z'
          fill='currentColor'
        />
      </svg>
    ),
  },
  {
    href: '/budget',
    title: 'Budget',
    icon: ({ width = 1, height = 1 }: { width?: number; height?: number }) => (
      <svg
        width={24 / width}
        height={24 / height}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M3 3V9H21V3H3ZM19 5H5V7H19V5Z'
          fill='currentColor'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M3 11V21H11V11H3ZM9 13H5V19H9V13Z'
          fill='currentColor'
        />
        <path d='M21 11H13V13H21V11Z' fill='currentColor' />
        <path d='M13 15H21V17H13V15Z' fill='currentColor' />
        <path d='M21 19H13V21H21V19Z' fill='currentColor' />
      </svg>
    ),
  },
  // {
  //   href: '/toolbox',
  //   title: 'Toolbox',
  //   icon: ({ width = 1, height = 1 }: { width?: number; height?: number }) => (
  //     <svg
  //       width={24 / width}
  //       height={24 / height}
  //       viewBox='0 0 24 24'
  //       fill='none'
  //       xmlns='http://www.w3.org/2000/svg'
  //     >
  //       <path
  //         fillRule='evenodd'
  //         clipRule='evenodd'
  //         d='M20 5H4V19H20V5ZM4 3C2.89543 3 2 3.89543 2 5V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V5C22 3.89543 21.1046 3 20 3H4Z'
  //         fill='currentColor'
  //       />
  //       <path
  //         d='M9.06723 9.19629H12.0672L9.93267 14.8038H6.93267L9.06723 9.19629Z'
  //         fill='currentColor'
  //       />
  //       <path
  //         d='M14.0672 9.19629H17.0672L14.9327 14.8038H11.9327L14.0672 9.19629Z'
  //         fill='currentColor'
  //       />
  //     </svg>
  //   ),
  // },
  {
    href: '/guides',
    title: 'Guides',
    icon: ({ width = 1, height = 1 }: { width?: number; height?: number }) => (
      <svg
        width={24 / width}
        height={24 / height}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M7 14C8.10457 14 9 13.1046 9 12C9 10.8954 8.10457 10 7 10C5.89543 10 5 10.8954 5 12C5 13.1046 5.89543 14 7 14ZM10.4649 10C9.77325 8.8044 8.48056 8 7 8C5.13616 8 3.57006 9.27477 3.12602 11H2C1.44772 11 1 11.4477 1 12C1 12.5523 1.44772 13 2 13H3.12602C3.57006 14.7252 5.13616 16 7 16C9.20914 16 11 14.2091 11 12H13C13 14.2091 14.7909 16 17 16C18.8638 16 20.4299 14.7252 20.874 13H22C22.5523 13 23 12.5523 23 12C23 11.4477 22.5523 11 22 11H20.874C20.4299 9.27477 18.8638 8 17 8C15.5194 8 14.2267 8.8044 13.5351 10H10.4649ZM15 12C15 13.1046 15.8954 14 17 14C18.1046 14 19 13.1046 19 12C19 10.8954 18.1046 10 17 10C15.8954 10 15 10.8954 15 12Z'
          fill='currentColor'
        />
      </svg>
    ),
  },
  {
    href: '/settings',
    title: 'Settings',
    icon: ({ width = 1, height = 1 }: { width?: number; height?: number }) => (
      <svg
        width={24 / width}
        height={24 / height}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M7 3C8.86384 3 10.4299 4.27477 10.874 6H19V8H10.874C10.4299 9.72523 8.86384 11 7 11C4.79086 11 3 9.20914 3 7C3 4.79086 4.79086 3 7 3ZM7 9C8.10457 9 9 8.10457 9 7C9 5.89543 8.10457 5 7 5C5.89543 5 5 5.89543 5 7C5 8.10457 5.89543 9 7 9Z'
          fill='currentColor'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M17 20C15.1362 20 13.5701 18.7252 13.126 17H5V15H13.126C13.5701 13.2748 15.1362 12 17 12C19.2091 12 21 13.7909 21 16C21 18.2091 19.2091 20 17 20ZM17 18C18.1046 18 19 17.1046 19 16C19 14.8954 18.1046 14 17 14C15.8954 14 15 14.8954 15 16C15 17.1046 15.8954 18 17 18Z'
          fill='currentColor'
        />
      </svg>
    ),
  },
];

export default function Navigation({
  path,
  isMobile,
}: {
  path: string;
  isMobile: boolean;
}) {
  const defaultOption =
    path === '/'
      ? 'Calculator'
      : pages.find((page) => page.href !== '/' && path.includes(page.href))
          ?.title;

  if (isMobile)
    return (
      <Tabs
        defaultValue={defaultOption}
        className='fixed bottom-0 z-50 w-full max-h-40 bg-background'
      >
        <TabsList className='grid items-center justify-around w-full h-full grid-cols-4 bg-transparent'>
          {pages.map(({ href, title, icon: Icon }) => (
            <Link
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'flex flex-col w-full text-xs h-full hover:bg-inherit'
              )}
              href={href}
              key={title}
            >
              <TabsTrigger
                className='p-2 flex flex-col gap-1 text-xs text-primary data-[state=active]:bg-primary/80 data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary dark:data-[state=active]:bg-accent/80'
                value={title}
              >
                <Icon width={2} height={2} />
                {title}
              </TabsTrigger>
              <Separator className='bg-transparent' />
            </Link>
          ))}
        </TabsList>
      </Tabs>
    );
  return (
    <Tabs orientation='vertical' defaultValue={defaultOption}>
      <TabsList className='flex flex-col h-full scale-75 bg-transparent'>
        {pages.map(({ href, title, icon: Icon }) => (
          <Link
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'flex flex-col w-full h-full p-0'
            )}
            href={href}
            key={title}
          >
            <TabsTrigger
              className='h-full flex flex-col gap-1 text-primary text-base data-[state=active]:bg-primary/80 data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary dark:data-[state=active]:bg-accent/80 w-full group text-center'
              value={title}
            >
              <Icon />
              {title}
            </TabsTrigger>
            <Separator className='bg-transparent' />
          </Link>
        ))}
      </TabsList>
    </Tabs>
  );
}
