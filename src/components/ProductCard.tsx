"use client";

import dynamic from "next/dynamic";
import { IProduct } from "@/types/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { deleteProduct, toggleFavorite } from "@/store/features/productSlice";
import { memo, useState } from "react";
const ProductDetailsModal = dynamic(
  () => import("@/components/ProductDetails"),
  {
    ssr: false,
    loading: () => <p>ProductDetailsModal Loading...</p>,
  }
);
interface ProductCardProps {
  product: IProduct;
  onEdit: (product: IProduct) => void;
}
const ProductCard = ({ product, onEdit }: ProductCardProps) => {
  const dispatch = useDispatch();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  return (
    <>
      <Card className="overflow-hidden">
        <div className="relative h-52">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="pt-4 px-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg leading-6 capitalize">
                {product.name}
              </h3>
              <div className="flex items-center justify-between w-full">
                <p className="text-xs text-muted-foreground">
                  Ref {product.id}
                </p>
                <p className="text-xs bg-secondary px-2 py-1 rounded-full ml-3">
                  {product.category}
                </p>
              </div>
              <h3 className="font-semibold text-lg leading-6 hover:text-chart-1">
                ${product.price}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(toggleFavorite(product.id))}
            >
              <Heart
                className={`w-10 h-10 ${
                  product.isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-4">
          <Button
            variant="outline"
            size="sm"
            className="bg-chart-2 text-primary-foreground"
            onClick={() => setIsQuickViewOpen(true)}
          >
            Quick View
          </Button>
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
              <Pencil className="w-4 h-4 " />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => dispatch(deleteProduct(product.id))}
            >
              <Trash className="w-4 h-4 " />
            </Button>
          </div>
        </CardFooter>
      </Card>
      <ProductDetailsModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
};
export default memo(ProductCard);
