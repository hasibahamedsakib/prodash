"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IProduct } from "@/types/product";
import { ProductCard } from "@/components/product-card";
import { ProductForm } from "@/components/product-form";
import { Filters } from "@/components/filters";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { setProducts } from "@/store/features/productSlice";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function Home() {
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<
    IProduct | undefined
  >();

  const products = useSelector((state: RootState) => {
    let filteredProducts = [...state.products.products];

    // Apply search filter
    if (state.products.searchTerm) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name
          .toLowerCase()
          .includes(state.products.searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (
      state.products.categoryFilter &&
      state.products.categoryFilter !== "All"
    ) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === state.products.categoryFilter
      );
    }

    // Apply sort
    if (state.products.sortOrder) {
      filteredProducts.sort((a, b) =>
        state.products.sortOrder === "asc"
          ? a.price - b.price
          : b.price - a.price
      );
    }

    return filteredProducts;
  });

  useEffect(() => {
    // Load products from localStorage
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      dispatch(setProducts(JSON.parse(savedProducts)));
    }
  }, [dispatch]);

  useEffect(() => {
    // Save products to localStorage
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleEdit = (product: IProduct) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedProduct(undefined);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <div className="flex gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button onClick={() => setIsDialogOpen(true)}>Add Product</Button>
        </div>
      </div>

      <Filters />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onEdit={handleEdit} />
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>
          <ProductForm product={selectedProduct} onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// src/components/ui/loading-skeleton.tsx
export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="border rounded-lg overflow-hidden animate-pulse"
        >
          <div className="h-48 bg-gray-200 dark:bg-gray-700" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
