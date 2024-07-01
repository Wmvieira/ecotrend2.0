"use client";
import React from "react";
// import Filters from "./_component/Filters";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import dayjs from "~/lib/dayjs";
import Tips from "../_component/page/Tips/Tips";

enum TrendingType {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
}

const TrendingPage: React.FC = () => {
  const [filters, setFilters] = React.useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleFilterDayChange = (type: TrendingType) => {
    switch (type) {
      case TrendingType.DAY:
        setFilters({
          startDate: dayjs().startOf("day").toDate(),
          endDate: dayjs().endOf("day").toDate(),
        });
        break;
      case TrendingType.WEEK:
        setFilters({
          startDate: dayjs().startOf("week").toDate(),
          endDate: dayjs().endOf("week").toDate(),
        });
        break;
      case TrendingType.MONTH:
        setFilters({
          startDate: dayjs().startOf("month").toDate(),
          endDate: dayjs().endOf("month").toDate(),
        });
        break;
    }
  };

  return (
    <div className="p-2">
      <div className="flex justify-between pb-5 text-xl font-bold">
        <h1 className="my-auto">Tendências</h1>
        <ToggleGroup
          type="single"
          onValueChange={handleFilterDayChange}
          defaultValue={TrendingType.WEEK}
        >
          <ToggleGroupItem value={TrendingType.DAY}>Dia</ToggleGroupItem>
          <ToggleGroupItem value={TrendingType.WEEK}>Semana</ToggleGroupItem>
          <ToggleGroupItem value={TrendingType.MONTH}>Mês</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <Tips
        postOrder={true}
        startDate={filters.startDate}
        endDate={filters.endDate}
      />
    </div>
  );
};

export default TrendingPage;
