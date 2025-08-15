import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@/constant/Defaults";

export const fetchMoreProducts = async (filters: any) => {
  try {
    const response = await fetch(`${BASE_URL}/client/category/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: filters.page,
        limit: filters.limit,
        categories: filters.categories,
        priceRange: filters.priceRange,
        sortBy: filters.sortBy,
        inStock: filters.inStock,
        hasDiscount: filters.hasDiscount,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const applyFilters = createAsyncThunk(
  "products/applyFilters",
  async (filters, { rejectWithValue }) => {
    try {
      return await fetchMoreProducts(filters);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
