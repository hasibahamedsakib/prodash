"use client";

import { IProduct } from "@/types/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { deleteProduct, toggleFavorite } from "@/store/features/productSlice";

interface ProductCardProps {
  product: IProduct;
  onEdit: (product: IProduct) => void;
}

export function ProductCard({ product, onEdit }: ProductCardProps) {
  const dispatch = useDispatch();

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-muted-foreground">${product.price}</p>
            <span className="text-xs bg-secondary px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(toggleFavorite(product.id))}
          >
            <Heart
              className={product.isFavorite ? "fill-red-500 text-red-500" : ""}
            />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4">
        <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
          <Pencil className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => dispatch(deleteProduct(product.id))}
        >
          <Trash className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
