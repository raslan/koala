'use client';

import * as React from 'react';

import { useMediaQuery } from 'usehooks-ts';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export type Option = {
  value: string;
  label: string;
};

export function ComboBoxResponsive({
  options,
  selectedOption,
  setSelectedOption,
  desktopMode,
}: {
  options: Option[];
  selectedOption: string;
  setSelectedOption: (Option: string) => void;
  desktopMode?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)') || desktopMode;
  const selected = options.find((option) => option.value === selectedOption);
  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='ghost'
            className='w-auto justify-start border-foreground border-2'
          >
            {selected ? <>{selected.label}</> : <>+ Set Option</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <OptionList
            options={options}
            setOpen={setOpen}
            setSelectedOption={setSelectedOption}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant='default'
          className='w-auto justify-start bg-foreground'
        >
          {selected ? <>{selected.label}</> : <>+ Set Option</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mt-4 border-t'>
          <OptionList
            options={options}
            setOpen={setOpen}
            setSelectedOption={setSelectedOption}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function OptionList({
  setOpen,
  setSelectedOption,
  options,
}: {
  setOpen: (open: boolean) => void;
  setSelectedOption: (Option: string) => void;
  options: Option[];
}) {
  return (
    <Command>
      <CommandInput placeholder='Pick a currency...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options.map((option: Option) => (
            <CommandItem
              className='text-lg lg:text-base'
              key={option.value}
              value={option.label}
              onSelect={(value) => {
                setSelectedOption(
                  options?.find?.((opt) => opt?.label.toLowerCase() === value)
                    ?.value as string
                );
                setOpen(false);
              }}
            >
              {option.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
