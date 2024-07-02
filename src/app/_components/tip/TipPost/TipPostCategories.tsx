import React from "react";
import { type TipPostCategoriesProps } from "./TipPostCard";

const TipPostCategories: React.FC<TipPostCategoriesProps> = ({
  categories,
}) => {
  return (
    <div className="flex flex-wrap gap-1">
      {categories.map((category) => (
        <span key={category.name} className="px-0 py-1 text-sm text-gray-500">
          #{category.name}
        </span>
      ))}
    </div>
  );
};

export default TipPostCategories;
