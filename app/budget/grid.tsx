'use client';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  faDiscord,
  faPiedPiper,
  faSpotify,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Activity, CreditCard, DollarSign, PlusIcon, Tv } from 'lucide-react';
import { DataTable } from '../../components/ui/data-table';
import { prettyPrint } from '@/lib/financial-tokenizer';
import useCurrency from '@/hooks/useCurrency';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSettingsStore } from '@/store/settings';
import { Switch } from '@/components/ui/switch';

const quickPrint = (
  amount: { currency: string; value: number },
  notation: 'standard' | 'compact' | 'scientific' | 'engineering' | undefined
) =>
  `${Number(amount.value).toLocaleString('en-US', {
    style: 'currency',
    currency: amount.currency,
    notation,
  })}`;

const transactions = [
  {
    name: 'March 2024 Rent',
    type: 'Expense',
    date: '2023-06-23',
    amount: { value: 250.0, currency: 'USD' },
  },
  {
    name: 'Electric Bill',
    type: 'Expense',
    date: '2023-06-24',
    amount: { value: 150.0, currency: 'EGP' },
  },
  {
    name: 'Groceries',
    type: 'Expense',
    date: '2023-06-25',
    amount: { value: 100.0, currency: 'NOK' },
  },
  {
    name: 'Gym Membership',
    type: 'Expense',
    date: '2023-06-27',
    amount: { value: 50.0, currency: 'SAR' },
  },
  {
    name: 'Salary',
    type: 'Income',
    date: '2023-06-28',
    amount: { value: 3000.48, currency: 'EUR' },
  },
  {
    name: 'Freelance Project',
    type: 'Income',
    date: '2023-06-29',
    amount: { value: 5000.23, currency: 'USD' },
  },
  {
    name: 'Bonus',
    type: 'Income',
    date: '2023-06-30',
    amount: { value: 200.0, currency: 'AED' },
  },
];

const subscriptions = [
  {
    name: 'Discord Nitro',
    icon: faDiscord,
    url: 'www.discord.com',
    amount: {
      value: 1999.0,
      currency: 'EGP',
    },
  },
  {
    name: 'Spotify',
    icon: faSpotify,
    url: 'https://www.spotify.com',
    amount: {
      value: 203,
      currency: 'USD',
    },
  },
  {
    name: 'Netflix',
    url: 'https://netflix.com',
    amount: {
      value: 203,
      currency: 'AED',
    },
  },
];

export function BudgetDashboard() {
  const { evaluate } = useCurrency();
  const [autoConvert, setAutoConvert] = useState<boolean>(false);
  const { notation } = useSettingsStore();
  const evaluatorFn = useCallback(
    (amount: { currency: string; value: number }, convert?: boolean) =>
      convert || autoConvert
        ? `${prettyPrint(evaluate(`${amount.currency}${amount.value}`), {
            notation,
          })}`
        : quickPrint(amount, notation),
    [autoConvert, evaluate, notation]
  );
  const tableTransactions = useMemo(() => {
    return transactions.map((transaction) => ({
      ...transaction,
      amount: evaluatorFn(transaction.amount),
    }));
  }, [evaluatorFn]);

  const convertedSubscriptions = useMemo(() => {
    return subscriptions.map((subscription) => ({
      ...subscription,
      amount: evaluatorFn(subscription.amount),
    }));
  }, [evaluatorFn]);
  return (
    <div className='flex w-full flex-col pb-32 lg:pb-0'>
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-4'>
        <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Income vs Expense
              </CardTitle>
              <Activity className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {evaluatorFn({ value: 45231.89, currency: 'USD' })}
              </div>
              <p className='text-xs text-muted-foreground'>
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Income
              </CardTitle>
              <DollarSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {evaluatorFn({ value: 5401.74, currency: 'USD' })}
              </div>
              <p className='text-xs text-muted-foreground'>per month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Expenses
              </CardTitle>
              <CreditCard className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {evaluatorFn({ value: 12343.21, currency: 'USD' })}
              </div>
              <p className='text-xs text-muted-foreground'>
                -19% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Subscriptions
              </CardTitle>
              <Tv className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {evaluatorFn({ value: 78, currency: 'USD' })}
              </div>
              <p className='text-xs text-muted-foreground'>
                -10% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className='grid gap-4 md:gap-8 md:grid-cols-3 justify-center lg:justify-normal'>
          <Card className='lg:col-span-2'>
            <CardHeader className='flex flex-col items-start lg:flex-row lg:items-center'>
              <div className='grid gap-2 w-full'>
                <div className='flex w-full justify-between items-center'>
                  <CardTitle>Income and Expenses</CardTitle>
                </div>
                <CardDescription>Recent transactions.</CardDescription>
              </div>
              <div className='flex justify-between items-center w-full max-w-64'>
                <div className='inline-flex items-center scale-90'>
                  <Switch
                    className='mr-2'
                    checked={autoConvert}
                    onCheckedChange={(checked) => setAutoConvert(checked)}
                  />
                  Convert
                </div>
                <Button size='sm' className='ml-auto gap-1'>
                  <PlusIcon className='w-4 h-4' />
                  Add New
                </Button>
              </div>
            </CardHeader>
            <CardContent className='py-0'>
              <DataTable
                columns={[
                  {
                    header: 'Name',
                    accessorKey: 'name',
                  },
                  {
                    header: 'Amount',
                    accessorKey: 'amount',
                  },
                ]}
                data={tableTransactions}
                searchColumn='name'
                searchableColumnName='transactions'
                pageSize={5}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className='flex justify-between items-center'>
                <CardTitle>Subscriptions</CardTitle>
                <Button size='sm' variant='outline' className='gap-2'>
                  <PlusIcon className='w-4 h-4' />
                  Add New
                </Button>
              </div>
            </CardHeader>
            <CardContent className='grid gap-8'>
              {convertedSubscriptions.map((subscription: any, index) => (
                <div key={index} className='flex items-center gap-4'>
                  <Avatar className='hidden h-9 w-9 sm:flex rounded-none'>
                    <FontAwesomeIcon
                      icon={subscription.icon ?? faPiedPiper}
                      className='text-sm font-medium leading-none w-full h-full'
                    />
                  </Avatar>
                  <div className='grid gap-1'>
                    <p className='text-sm font-medium leading-none'>
                      {subscription.name}
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      {subscription.url}
                    </p>
                  </div>
                  <div className='ml-auto font-medium'>
                    {subscription.amount}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        {/* <IconSelector /> */}
      </main>
    </div>
  );
}
