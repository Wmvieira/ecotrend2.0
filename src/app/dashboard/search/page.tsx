"use client";

import React, { useState } from "react";
import Tips from "../_component/page/Tips/Tips";
import { Input } from "~/components/ui/input";

const DashboardPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <div className="flex flex-col justify-center gap-3 md:px-14">
      <div>
        <Input
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar"
        />
      </div>
      <Tips searchTerm={searchTerm} />
    </div>
  );
};

export default DashboardPage;
