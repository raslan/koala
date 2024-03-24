const RadioCard = ({
  children,
  dark = false,
}: {
  children?: React.ReactNode;
  dark?: boolean;
}) => {
  if (!dark)
    return (
      <>
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
        <span className='block w-full p-2 text-center font-normal'>
          {children}
        </span>
      </>
    );
  return (
    <>
      <div className='items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground'>
        <div className='space-y-2 rounded-sm bg-zinc-950 p-2'>
          <div className='space-y-2 rounded-md bg-zinc-800 p-2 shadow-sm'>
            <div className='h-2 w-[80px] rounded-lg bg-zinc-400' />
            <div className='h-2 w-[100px] rounded-lg bg-zinc-400' />
          </div>
          <div className='flex items-center space-x-2 rounded-md bg-zinc-800 p-2 shadow-sm'>
            <div className='h-4 w-4 rounded-full bg-zinc-400' />
            <div className='h-2 w-[100px] rounded-lg bg-zinc-400' />
          </div>
          <div className='flex items-center space-x-2 rounded-md bg-zinc-800 p-2 shadow-sm'>
            <div className='h-4 w-4 rounded-full bg-zinc-400' />
            <div className='h-2 w-[100px] rounded-lg bg-zinc-400' />
          </div>
        </div>
      </div>
      <span className='block w-full p-2 text-center font-normal'>
        {children}
      </span>
    </>
  );
};
export default RadioCard;
