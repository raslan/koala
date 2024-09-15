'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { calculateInputNumber } from '@/lib/financial-tokenizer';
import { toSnapshot } from 'dinero.js';
import { useState } from 'react';

const formSchema = z.object({
  itemName: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  amount: z.string(),
  category: z.string().min(2, {
    message: 'Category must be at least 2 characters.',
  }),
  frequency: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
});

export function CreateItemForm({
  formDescription,
  formTitle,
  defaultValues,
  children,
  onDone,
  baseCurrency,
}: {
  formDescription: string;
  formTitle: string;
  defaultValues: z.infer<typeof formSchema>;
  children: React.ReactNode;
  onDone: (values: z.infer<typeof formSchema>) => void;
  baseCurrency: string;
}) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
    },
  });
  async function onSubmit(values: any) {
    const { amount: inputAmount, itemName: name, ...vals } = values;
    try {
      const calculatedInput = calculateInputNumber(
        Number.isNaN(Number(inputAmount))
          ? `${inputAmount}`
          : `${baseCurrency}${inputAmount}`
      );
      await onDone({
        ...vals,
        ...calculatedInput,
        name,
      });
      setOpen(false);
    } catch (error) {
      form.setError('amount', {
        message: 'Invalid amount',
      });
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{formTitle}</DialogTitle>
          <DialogDescription>{formDescription}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid gap-6 items-center'
          >
            <FormField
              control={form.control}
              name='itemName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Transaction name' {...field} />
                  </FormControl>
                  <FormDescription>
                    The name of the transaction. E.g. &quot;Payment to
                    Landlord&quot;, &quot;Acme Inc Salary&quot;,
                    &quot;Groceries&quot;
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount with Currency Code</FormLabel>
                  <FormControl>
                    <Input placeholder='Amount' {...field} />
                  </FormControl>
                  <FormDescription>
                    E.g. $1000, 1000 eur, 1000EGP
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder='Category' {...field} />
                  </FormControl>
                  <FormDescription>
                    The category of the transaction. E.g. &quot;Rent&quot;,
                    &quot;Salary&quot;, &quot;Food&quot;
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='frequency'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select Frequency' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {['daily', 'weekly', 'monthly', 'yearly'].map(
                        (frequency) => (
                          <SelectItem key={frequency} value={frequency}>
                            {frequency.charAt(0).toUpperCase() +
                              frequency.slice(1)}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    How often does this transaction occur?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <DialogFooter>
            <Button
              className='w-full'
              type='submit'
              onClick={form.handleSubmit(onSubmit)}
            >
              Save changes
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
