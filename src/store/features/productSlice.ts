import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "@/types/product";

interface ProductState {
  products: IProduct[];
  favorites: string[];
  searchTerm: string;
  categoryFilter: string;
  sortOrder: "asc" | "desc" | null;
}

const initialState: ProductState = {
  products: [],
  favorites: [],
  searchTerm: "",
  categoryFilter: "",
  sortOrder: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },

    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);
    },

    updateProduct: (state, action: PayloadAction<IProduct>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },

    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },

    toggleFavorite: (state, action: PayloadAction<string>) => {
      const index = state.products.findIndex((p) => p.id === action.payload);
      if (index !== -1) {
        state.products[index].isFavorite = !state.products[index].isFavorite;
      }
    },

    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },

    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.categoryFilter = action.payload;
    },

    setSortOrder: (state, action: PayloadAction<"asc" | "desc" | null>) => {
      state.sortOrder = action.payload;
    },
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  toggleFavorite,
  setSearchTerm,
  setCategoryFilter,
  setSortOrder,
} = productSlice.actions;

export default productSlice.reducer;
