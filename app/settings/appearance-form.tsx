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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';
import RadioCard from '@/components/ui/radio-card';
import { themes } from '@/lib/theme';

const appearanceFormSchema = z.object({
  theme: z.enum(
    [...themes.map((theme) => theme.theme)] as unknown as readonly [
      string,
      ...string[]
    ],
    {
      required_error: 'Please select a theme.',
    }
  ),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

export function AppearanceForm() {
  const { resolvedTheme, setTheme } = useTheme();
  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: (resolvedTheme ?? 'light') as AppearanceFormValues['theme'],
    },
  });

  function onSubmit(data: AppearanceFormValues) {
    const { theme } = data;
    setTheme(theme);
    toast.success('Your settings have been saved.', {
      position: 'top-right',
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='theme'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Theme</FormLabel>
              <FormDescription>
                Select the theme for the dashboard.
              </FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-2'
              >
                {themes.map((theme) => (
                  <FormItem key={theme.name}>
                    <FormLabel className='[&:has([data-state=checked])>div]:border-primary'>
                      <FormControl>
                        <RadioGroupItem
                          value={theme.theme}
                          className='sr-only'
                        />
                      </FormControl>
                      <RadioCard
                        mainBg={theme.mainBg}
                        secondaryBg={theme.secondaryBg}
                        primaryBg={theme.primaryBg}
                      >
                        {theme.name}
                      </RadioCard>
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormItem>
          )}
        />

        <Button type='submit'>Update preferences</Button>
      </form>
    </Form>
  );
}
