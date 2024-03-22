import { Separator } from '@/components/ui/separator';
import { AppearanceForm } from './appearance-form';
import Link from 'next/link';
import Rates from './[rates]/rates';
import { Heading } from '@/components/ui/heading';

const page = () => {
  return (
    <div className='h-full'>
      <Heading showThemeSwitcher={false}>Settings</Heading>
      <div>
        <h3 className='text-lg font-medium my-3'>Appearance</h3>
        <p className='text-sm text-muted-foreground my-3'>
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
        <Separator className='my-3' />
        <AppearanceForm />
      </div>
      <div className='my-6'>
        <h3 className='text-lg font-medium'>Rates</h3>
        <p className='text-sm text-muted-foreground'>
          View the exchange rates for your base currency.
        </p>
        <Separator />
        <Rates />
      </div>

      <div className='my-4 text-xs text-primary/80'>
        <Link className='underline' href='/privacy-policy'>
          Read the Privacy Policy
        </Link>
      </div>

      <div className='my-4 pb-4 text-xs text-primary/80'>
        Icons by parkjisun from Noun Project
        <a
          href='https://thenounproject.com/browse/icons/term/koala/'
          target='_blank'
          title='Koala Icons'
        ></a>
        (CC BY 3.0)
      </div>
    </div>
  );
};
export default page;
