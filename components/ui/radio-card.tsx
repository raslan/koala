const RadioCard = ({
  children,
  mainBg,
  primaryBg,
  secondaryBg,
}: {
  children?: React.ReactNode;
  mainBg: string;
  primaryBg: string;
  secondaryBg: string;
}) => {
  return (
    <>
      <div className='items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground'>
        <div className={`space-y-2 rounded-sm ${mainBg} p-2`}>
          <div className={`space-y-2 rounded-md ${secondaryBg} p-2 shadow-sm`}>
            <div className={`h-2 w-[80px] rounded-lg ${primaryBg}`} />
            <div className={`h-2 w-[100px] rounded-lg ${primaryBg}`} />
          </div>
          <div
            className={`flex items-center space-x-2 rounded-md ${secondaryBg} p-2 shadow-sm`}
          >
            <div className={`h-4 w-4 rounded-full ${primaryBg}`} />
            <div className={`h-2 w-[100px] rounded-lg ${primaryBg}`} />
          </div>
          <div
            className={`flex items-center space-x-2 rounded-md ${secondaryBg} p-2 shadow-sm`}
          >
            <div className={`h-4 w-4 rounded-full ${primaryBg}`} />
            <div className={`h-2 w-[100px] rounded-lg ${primaryBg}`} />
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
