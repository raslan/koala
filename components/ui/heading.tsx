import { ModeToggle } from './mode-toggle';

export const Heading = ({ children }: { children: string }) => {
  return (
    <div className='flex justify-between items-start'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl mb-2'>
        {children}
      </h1>
      <div className='relative right-2 top-2'>
        <ModeToggle />
      </div>
    </div>
  );
};
