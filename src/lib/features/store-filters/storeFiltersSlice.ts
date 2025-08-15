import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  categories: string[];
  priceRange: number[];
  sortBy: string;
  inStock: boolean;
  hasDiscount: boolean;
  page: number;
  limit: number;
  hasMore: boolean;
}

const initialState: FilterState = {
  categories: [],
  priceRange: [0, 2500],
  sortBy: "newest",
  inStock: false,
  hasDiscount: false,
  page: 1,
  limit: 12,
  hasMore: true,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: <K extends keyof FilterState>(
      state: FilterState,
      action: PayloadAction<{ key: K; value: FilterState[K] }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;

      // Reset page when filters change (except when changing page itself)
      if (key !== "page") {
        state.page = 1;
      }
    },
    resetFilters: () => initialState,
    incrementPage: (state) => {
      state.page += 1;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
  },
});

export const { setFilter, resetFilters, incrementPage, setHasMore } =
  filterSlice.actions;
export default filterSlice.reducer;
