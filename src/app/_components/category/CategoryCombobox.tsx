"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { api } from "~/trpc/react";
import { Input } from "~/components/ui/input";

interface CategoryComboBoxProps {
  handlePush?: (value: string) => void;
}

export function CategoryComboBox({ handlePush }: CategoryComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [categories, setCategories] = React.useState<string[]>([]);

  const { data } = api.categoy.getCategories.useQuery({
    term: value,
  });

  React.useEffect(() => {
    const categories = data?.map((category) => category.name) ?? [];
    if (categories.filter((category) => category === value).length > 0) {
      setCategories(categories);
    } else {
      setCategories([value, ...categories]);
    }
  }, [data, value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-full">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span className="truncate">Adicionar Categoria</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <Input onChange={(e) => setValue(e.target.value)} />
          <CommandList>
            <CommandGroup>
              {categories?.map((category) => (
                <CommandItem
                  key={category}
                  value={category}
                  onSelect={(currentValue) => {
                    handlePush && handlePush(currentValue);
                    setOpen(false);
                  }}
                >
                  #{category}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
