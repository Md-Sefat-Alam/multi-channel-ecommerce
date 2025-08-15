import { createSlice } from "@reduxjs/toolkit";
import { applyFilters } from "./productActions";
import { ICategoryWiseProducts } from "@/app/lib/types/rootTypes";

interface ProductsState {
  products: ICategoryWiseProducts[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setInitialProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
      })
      .addCase(applyFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setInitialProducts } = productsSlice.actions;
export default productsSlice.reducer;
