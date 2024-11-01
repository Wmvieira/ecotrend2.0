import React from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

const HeaderSearch: React.FC = () => {
  return (
    <div className="flex flex-row gap-5">
      <div>
        <Input placeholder="Buscar" />
      </div>
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <FaChevronLeft />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>O que você está procurando?</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default HeaderSearch;
