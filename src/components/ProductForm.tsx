"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IProduct } from "@/types/product";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "@/store/features/productSlice";
import { memo } from "react";

interface ProductFormProps {
  product?: IProduct;
  onClose: () => void;
}

const categories = ["Electronics", "Clothing", "Books", "Food", "Other"];

const ProductForm = ({ product, onClose }: ProductFormProps) => {
  const dispatch = useDispatch();
  const form = useForm<Omit<IProduct, "id" | "isFavorite" | "createdAt">>({
    defaultValues: product || {
      name: "",
      price: 0,
      imageUrl: "",
      description: "",
      category: "",
      status: "active",
    },
    mode: "onBlur",
  });

  const onSubmit = (
    data: Omit<IProduct, "id" | "isFavorite" | "createdAt">
  ) => {
    if (product) {
      dispatch(
        updateProduct({
          ...product,
          ...data,
        })
      );
    } else {
      dispatch(
        addProduct({
          ...data,
          id: Date.now().toString().slice(-5),
          isFavorite: false,
          createdAt: new Date().toISOString(),
        })
      );
    }
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          rules={{
            required: "Product name is required",
            minLength: {
              value: 5,
              message: "Name must be at least 5 characters",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          rules={{
            required: "Price is required",
            min: { value: 1, message: "Price must be greater than 0" },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" {...field} value={field.value ?? 0} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          rules={{
            required: "Image URL is required",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input required type="url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          rules={{
            required: "Description is required",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input required type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          // rules={{ required: "Category is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {product ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default memo(ProductForm);
