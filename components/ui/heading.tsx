export const Heading = ({ children }: { children: string }) => {
  return (
    <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl mb-2'>
      {children}
    </h1>
  );
};
