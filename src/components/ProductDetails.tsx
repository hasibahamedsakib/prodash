import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IProduct } from "@/types/product";
import Image from "next/image";
import { memo } from "react";

interface ProductDetailsModalProps {
  product: IProduct;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailsModal = ({
  product,
  isOpen,
  onClose,
}: ProductDetailsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative h-64 md:h-[250px] lg:w-[400]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="space-y-2 ">
            <h2 className="text-md lg:text-xl font-bold capitalize">
              {product.name}
            </h2>
            <p className="text-base font-semibold">Price: ${product.price}</p>
            <div className="space-y-1 ">
              <div className="flex items-center gap-3">
                <p className="text-sm text-muted-foreground">
                  Reference: {product.id}
                </p>
                <p className="inline-block bg-chart-3 px-3 py-1 rounded-full text-xs text-primary-foreground">
                  {product.category}
                </p>
              </div>
              <p className="text-muted-foreground">
                {product.description || "No description available"}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(ProductDetailsModal);
