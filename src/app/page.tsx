"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IProduct } from "@/types/product";
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
import { selectFilteredProducts } from "@/store/selectors/productSelectors";
import LoadingSkeleton from "@/components/ui/loading-skeleton";
// implement code splitting
const ProductCard = dynamic(() => import("@/components/ProductCard"), {
  ssr: false,
  loading: () => <p>ProductCard Loading...</p>,
});

const Filters = dynamic(() => import("@/components/filters"), {
  ssr: false,
  // loading: () => <p>Filters Loading...</p>,
});

const ProductForm = dynamic(() => import("@/components/ProductForm"), {
  ssr: false,
  loading: () => <p>ProductForm Loading...</p>,
});

// const LoadingSkeleton = dynamic(
//   () => import("@/components/ui/loading-skeleton"),
//   {
//     ssr: false,
//     loading: () => <p>LoadingSkeleton Loading...</p>,
//   }
// );

const Home = () => {
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<
    IProduct | undefined
  >();
  const [loading, setLoading] = useState(true);
  const products = useSelector(selectFilteredProducts);

  // const products = useSelector((state: RootState) => {
  //   let filteredProducts = [...state.products.products];

  //   //! search filtering
  //   if (state.products.searchTerm) {
  //     filteredProducts = filteredProducts.filter((product) =>
  //       product.name
  //         .toLowerCase()
  //         .includes(state.products.searchTerm.toLowerCase())
  //     );
  //   }

  //   //! category filtering
  //   if (
  //     state.products.categoryFilter &&
  //     state.products.categoryFilter !== "All"
  //   ) {
  //     filteredProducts = filteredProducts.filter(
  //       (product) => product.category === state.products.categoryFilter
  //     );
  //   }

  //   //! price sorting
  //   if (state.products.sortOrder) {
  //     filteredProducts.sort((a, b) =>
  //       state.products.sortOrder === "asc"
  //         ? a.price - b.price
  //         : b.price - a.price
  //     );
  //   }

  //   return filteredProducts;
  // });

  //! Load the products from localStorage and dispatch them.

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      dispatch(setProducts(JSON.parse(savedProducts)));
    }
    setLoading(false);
  }, [dispatch]);

  //! Save products to localStorage
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleEdit = (product: IProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(undefined);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-md sm:text-xl md:text-2xl xl:text-3xl font-bold">
          Welcome to <span className="text-purple-600">Pro</span>
          <span className="text-chart-2 md:text-md xl:text-xl">Dash</span>
        </h1>
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
          <Button onClick={() => setIsModalOpen(true)}>Add Product</Button>
        </div>
      </div>

      <Filters />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <LoadingSkeleton key={index} />
            ))
          : products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEdit}
              />
            ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
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
};
export default Home;
