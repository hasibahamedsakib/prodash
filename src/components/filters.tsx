/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import {
  setSearchTerm,
  setCategoryFilter,
  setSortOrder,
} from "@/store/features/productSlice";
import { memo } from "react";

const categories = ["All", "Electronics", "Clothing", "Books", "Food", "Other"];

const Filters = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <Input
        placeholder="Search products..."
        className="max-w-sm"
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />
      <div className="flex items-center justify-between sm:gap-4">
        <Select onValueChange={(value) => dispatch(setCategoryFilter(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value: any) => dispatch(setSortOrder(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Low to High</SelectItem>
            <SelectItem value="desc">High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default memo(Filters);
