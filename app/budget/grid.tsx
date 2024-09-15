'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import useCurrency from '@/hooks/useCurrency';
import { calculateInputNumber, prettyPrint } from '@/lib/financial-tokenizer';
import { useSettingsStore } from '@/store/settings';
import { Activity, CreditCard, DollarSign, PlusIcon } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  createBudget,
  createLineItem,
  getOrCreateUser,
  getUserBudgets,
} from '../(actions)';
import { DataTable } from '@/components/ui/data-table';
import { useUser } from '@clerk/nextjs';
import { useBudgetStore } from '@/store/budgets';
import { CreateItemForm } from './create-item-form';

const quickPrint = (
  amount: { currency: string; value: number },
  notation: 'standard' | 'compact' | 'scientific' | 'engineering' | undefined
) =>
  amount.value
    ? `${Number(amount.value).toLocaleString('en-US', {
        style: 'currency',
        currency: amount.currency,
        notation,
      })}`
    : 'N/A';

const exampleIncomeTransactions = [
  {
    name: 'Salary',
    category: 'General',
    frequency: 'month',
    ...calculateInputNumber('USD 5000.23'),
  },
  {
    name: 'Freelance Project',
    category: 'General',
    frequency: 'year',
    ...calculateInputNumber('EUR 1000.0'),
  },
  {
    name: 'Bonus',
    category: 'General',
    frequency: 'year',
    ...calculateInputNumber('GBP 200.0'),
  },
];

const exampleExpenseTransactions = [
  {
    name: 'March 2024 Rent',
    category: 'General',
    frequency: 'month',
    ...calculateInputNumber('USD 1500.0'),
  },
  {
    name: 'Electric Bill',
    category: 'General',
    frequency: 'month',
    ...calculateInputNumber('EUR 100.0'),
  },
  {
    name: 'Groceries',
    category: 'General',
    frequency: 'day',
    ...calculateInputNumber('NOK 20.0'),
  },
  {
    name: 'Gym Membership',
    category: 'General',
    frequency: 'month',
    ...calculateInputNumber('SAR 50.0'),
  },
];

async function fetchBudget(setBudget: (budget: any) => void) {
  const user = await getOrCreateUser();
  if (user) {
    const budget = await getUserBudgets();
    if (budget) {
      setBudget(budget);
    } else {
      const budgetResponse = await createBudget({
        incomeTransactions: exampleIncomeTransactions,
        expenseTransactions: exampleExpenseTransactions,
      });
      if (budgetResponse) setBudget(budgetResponse);
    }
  }
}

export function BudgetCalculator() {
  const { evaluate, baseCurrency } = useCurrency();
  const [autoConvert, setAutoConvert] = useState<boolean>(false);
  const { notation } = useSettingsStore();
  const evaluatorFn = useCallback(
    (amount: { currency: string; value: number }, convert?: boolean) =>
      convert || autoConvert
        ? `${prettyPrint(evaluate(`${amount.currency}${amount.value}`)?.value, {
            notation,
          })}`
        : quickPrint(amount, notation),
    [autoConvert, evaluate, notation]
  );
  // API Related budget handling code
  const { budget, setBudget, updateState } = useBudgetStore();
  const budgetsLoaded = useRef(false);
  const { isSignedIn, isLoaded } = useUser();
  useEffect(() => {
    if (!budgetsLoaded.current) {
      if (isSignedIn) fetchBudget(setBudget);
      budgetsLoaded.current = true;
    }
  }, [setBudget, isSignedIn, budget, isLoaded]);

  const tableValues = useMemo(() => {
    if (
      !budget ||
      !budget?.income?.lineItems?.length ||
      !budget?.expenses?.lineItems?.length ||
      !budgetsLoaded.current
    )
      return {
        income: [],
        expenses: [],
      };
    const { income, expenses } = budget ?? { income: [], expenses: [] };
    const incomeLineItems = income?.lineItems ?? [];
    const expenseLineItems = expenses?.lineItems ?? [];
    const totalIncome = incomeLineItems
      .map((transaction: any) => `${transaction.currency}${transaction.amount}`)
      .join(' + ');
    const totalExpenses = expenseLineItems
      .map((transaction: any) => `${transaction.currency}${transaction.amount}`)
      .join(' + ');
    const incomeVsExpenses = `${totalIncome} - ${totalExpenses}`;
    return {
      totalIncome: prettyPrint(evaluate(totalIncome, baseCurrency).value, {
        notation,
        overrideCurrency: baseCurrency,
      }),
      totalExpenses: prettyPrint(evaluate(totalExpenses, baseCurrency).value, {
        notation,
        overrideCurrency: baseCurrency,
      }),
      incomeVsExpenses: prettyPrint(
        evaluate(incomeVsExpenses, baseCurrency).value,
        {
          notation,
          overrideCurrency: baseCurrency,
        }
      ),
      income:
        incomeLineItems?.map((transaction: any) => ({
          ...transaction,
          amount: evaluatorFn({
            value: transaction.amount,
            currency: transaction.currency,
          }),
        })) ?? [],
      expenses:
        expenseLineItems?.map((transaction: any) => ({
          ...transaction,
          amount: evaluatorFn({
            value: transaction.amount,
            currency: transaction.currency,
          }),
        })) ?? [],
    };
  }, [baseCurrency, budget, evaluate, evaluatorFn, notation, budgetsLoaded]);

  return (
    <div className='flex w-full flex-col pb-32 lg:pb-0'>
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-4 xl:gap-6'>
        <div className='grid gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Income vs Expense
              </CardTitle>
              <Activity className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {tableValues?.incomeVsExpenses}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Recurring Income
              </CardTitle>
              <DollarSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {tableValues?.totalIncome}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Recurring Expenses
              </CardTitle>
              <CreditCard className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {tableValues?.totalExpenses}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className='grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-2 justify-center lg:justify-normal'>
          <Card className='lg:col-span-1'>
            <CardHeader className='flex flex-col items-start lg:flex-row lg:items-center'>
              <div className='grid gap-2 w-full'>
                <div className='flex w-full justify-between items-center'>
                  <CardTitle>Recurring Income</CardTitle>
                </div>
                <CardDescription>List of incomes</CardDescription>
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
                <CreateItemForm
                  baseCurrency={baseCurrency}
                  formTitle='Add income'
                  formDescription='Add a new income item'
                  onDone={async (v: any) => {
                    const response = await createLineItem({
                      type: 'income',
                      parentId: budget?.income?.id as string,
                      ...v,
                    });
                    updateState((state) => {
                      state.budget.income.lineItems.push(response as any);
                    });
                    return response;
                  }}
                  defaultValues={{
                    itemName: '',
                    amount: `${baseCurrency} 0`,
                    category: '',
                    frequency: 'monthly',
                  }}
                >
                  <Button size='sm' className='ml-auto gap-1'>
                    <PlusIcon className='w-4 h-4' />
                    Add New
                  </Button>
                </CreateItemForm>
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
                data={tableValues.income}
                searchColumn='name'
                searchableColumnName='Search transactions...'
                pageSize={5}
              />
            </CardContent>
          </Card>
          <Card className='lg:col-span-1'>
            <CardHeader className='flex flex-col items-start lg:flex-row lg:items-center'>
              <div className='grid gap-2 w-full'>
                <div className='flex w-full justify-between items-center'>
                  <CardTitle>Recurring Expenses</CardTitle>
                </div>
                <CardDescription>List of expenses.</CardDescription>
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
                <CreateItemForm
                  baseCurrency={baseCurrency}
                  formTitle='Add expense'
                  formDescription='Add a new expense item'
                  onDone={async (v: any) => {
                    const response = await createLineItem({
                      type: 'expense',
                      parentId: budget?.expenses?.id as string,
                      ...v,
                    });
                    updateState((state) => {
                      state.budget.expenses.lineItems.push(response as any);
                    });
                    return response;
                  }}
                  defaultValues={{
                    itemName: '',
                    amount: `${baseCurrency} 0`,
                    category: '',
                    frequency: 'monthly',
                  }}
                >
                  <Button size='sm' className='ml-auto gap-1'>
                    <PlusIcon className='w-4 h-4' />
                    Add New
                  </Button>
                </CreateItemForm>
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
                data={tableValues.expenses}
                searchColumn='name'
                searchableColumnName='Search transactions...'
                pageSize={5}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
