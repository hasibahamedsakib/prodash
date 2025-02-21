import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectProductsState = (state: RootState) => state.products;

export const selectFilteredProducts = createSelector(
  [
    selectProductsState,
    (state) => state.products.searchTerm,
    (state) => state.products.categoryFilter,
    (state) => state.products.sortOrder,
  ],
  (productsState, searchTerm, categoryFilter, sortOrder) => {
    let filteredProducts = [...productsState.products];

    //! search filtering
    if (searchTerm) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    //! category filtering
    if (categoryFilter && categoryFilter !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === categoryFilter
      );
    }

    //! price sorting
    if (sortOrder) {
      filteredProducts.sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      );
    }

    return filteredProducts;
  }
);
