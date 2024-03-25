import Rates from '@/app/(rates)/rates';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ArrowUpIcon } from '@radix-ui/react-icons';

const RatesDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant='outline'
          className='border-zinc-700 dark:border-zinc-300 w-full md:w-auto'
        >
          View Exchange Rates
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerClose>
          <Button variant='ghost'>
            <ArrowUpIcon />
            Back
          </Button>
        </DrawerClose>
        <div className='max-h-[70vh] px-4 overflow-scroll'>
          <Rates />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
export default RatesDrawer;
