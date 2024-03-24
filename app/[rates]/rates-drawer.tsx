import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import Rates from '@/app/[rates]/rates';
import { Button } from '@/components/ui/button';

const RatesDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button
          variant='outline'
          className='border-zinc-700 dark:border-zinc-300 w-full md:w-auto'
        >
          View Exchange Rates
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='max-h-[70vh] px-4 overflow-scroll'>
          <Rates />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
export default RatesDrawer;
