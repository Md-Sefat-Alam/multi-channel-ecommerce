"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";
import ProductCard from "@/components/Products/ProductCard";
import { Spin, Empty, Alert, Grid } from "antd";
import Title from "@/components/common/Title";
import { ICategoryWiseProducts } from "@/app/lib/types/rootTypes";
import { useAppSelector } from "@/lib/hooks";
import {
  incrementPage,
  resetFilters,
  setHasMore,
} from "@/lib/features/store-filters/storeFiltersSlice";
import { fetchMoreProducts } from "@/lib/features/products/productActions";
import { MotionContainer } from "@/components/common/MotionContainer";
import { useLocale } from "next-intl";

type Props = {
  initialProducts: IRes<ICategoryWiseProducts[]>;
};

export default function InfiniteScrollProducts({ initialProducts }: Props) {
  const dispatch = useDispatch();
  const { ref, inView } = useInView();
  const filters = useAppSelector((state) => state.filters);
  const [products, setProducts] = useState<ICategoryWiseProducts[]>(
    initialProducts?.data || [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initialRender = useRef(true);
  const totalProductCount = useRef(0);
  const loadedProductCount = useRef(0);

  const locale = useLocale();
  const screens = Grid.useBreakpoint();

  const getInitialItems = () => {
    if (screens.xl) {
      return 5;
    } else if (screens.md) {
      return 4;
    } else if (screens.lg) {
      return 3;
    } else {
      return 1; // sm and xs
    }
  };

  // Calculate total loaded products
  const calculateLoadedProducts = (products: ICategoryWiseProducts[]) => {
    return products.reduce(
      (total, category) => total + category?.products?.length,
      0,
    );
  };

  // Reset filters when component mounts to ensure we start fresh each time
  useEffect(() => {
    // Reset to page 1 on mount while preserving other filter settings
    if (filters.page > 1) {
      dispatch(setHasMore(true));
      dispatch(resetFilters());
    }

    return () => {
      dispatch(setHasMore(true));
      dispatch(resetFilters());
    };
  }, [dispatch]);

  useEffect(() => {
    // Initialize Redux store with initial products
    if (initialRender.current) {
      initialRender.current = false;
      loadedProductCount.current = calculateLoadedProducts(
        initialProducts?.data || [],
      );
      totalProductCount.current = initialProducts?.recordsFiltered || 0;
      // dispatch(
      //   setHasMore(loadedProductCount.current < totalProductCount.current),
      // );
      return;
    }

    // When filters change (not the pagination), we need to reset the products
    setProducts([]);
    setLoading(true);

    const fetchProducts = async () => {
      try {
        const result = await fetchMoreProducts(filters);
        setProducts(result.data);

        // Update counts
        loadedProductCount.current = calculateLoadedProducts(result.data);
        totalProductCount.current = result.recordsFiltered;

        // Check if we have more products to load
        // dispatch(
        //   setHasMore(loadedProductCount.current < totalProductCount.current),
        // );

        window.scrollTo(0, 150);
        setError(null);
      } catch (err) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [
    dispatch,
    filters.categories,
    filters.priceRange,
    filters.sortBy,
    filters.inStock,
    filters.hasDiscount,
  ]);

  // Handle load more when scrolling to the bottom
  useEffect(() => {
    if (inView && filters.hasMore && !loading) {
      setLoading(true);
      dispatch(incrementPage());

      const loadMore = async () => {
        try {
          const result = await fetchMoreProducts({
            ...filters,
            page: filters.page,
          });

          const newProducts = result.data;

          // Check if there are actually any products in the result
          const newProductsCount = calculateLoadedProducts(newProducts);

          if (newProductsCount === 0) {
            // If no products were returned, stop pagination
            dispatch(setHasMore(false));
            setLoading(false);
            return;
          }

          // Update loadedProductCount
          loadedProductCount.current += newProductsCount;
          totalProductCount.current = result.recordsFiltered;

          // Update products by merging with existing categories
          setProducts((prevProducts) => {
            const updatedProducts = [...prevProducts];

            newProducts.forEach((newCat: ICategoryWiseProducts) => {
              if (newCat.products.length > 0) {
                const existingCatIndex = updatedProducts.findIndex(
                  (cat) => cat.categoryName === newCat.categoryName,
                );

                if (existingCatIndex >= 0) {
                  // Create a set of existing product IDs for quick lookup
                  const existingProductIds = new Set(
                    updatedProducts[existingCatIndex].products.map(
                      (p) => p.uuid,
                    ),
                  );

                  // Only add products that don't already exist
                  const uniqueNewProducts = newCat.products.filter(
                    (product) => !existingProductIds.has(product.uuid),
                  );

                  updatedProducts[existingCatIndex].products = [
                    ...updatedProducts[existingCatIndex].products,
                    ...uniqueNewProducts,
                  ];
                } else {
                  // Add new category with products
                  updatedProducts.push(newCat);
                }
              }
            });

            return updatedProducts;
          });

          // Check if we have more products to load
          // dispatch(setHasMore(loadedProductCount.current < totalProductCount.current));
          setError(null);
        } catch (err) {
          console.error("Error loading more products:", err);
          setError("Failed to load more products. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      loadMore();
    }
  }, [inView, filters.hasMore, filters.page, loading, dispatch]);

  if (error) {
    return <Alert type='error' message={error} className='my-4' />;
  }

  console.log({
    products: products,
    someCon: !products.some((item) => item.products.length),
  });

  return (
    <section className='min-h-screen'>
      {(products.length === 0 ||
        products.some((item) => !item.products.length)) &&
      !loading ? (
        <Empty description='No products found' className='py-20' />
      ) : (
        <>
          {products
            ?.filter((items) => items?.products?.length > 0)
            ?.map((item, categoryIndex) => (
              <div className='pb-10' key={item.categoryName}>
                <MotionContainer delay={categoryIndex * 0.1}>
                  <Title
                    title={
                      locale === "bn" ? item.categoryNameBn : item.categoryName
                    }
                    addAfter
                  />
                </MotionContainer>
                <div className='py-4 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mx-2 sm:mx-0'>
                  {item.products?.map((product, productIndex) => (
                    <MotionContainer
                      delay={Math.ceil(Math.random() * 5) * 0.04}
                    >
                      <ProductCard key={product.uuid} product={product} />
                    </MotionContainer>
                  ))}
                </div>
              </div>
            ))}
        </>
      )}

      {/* Loading indicator and intersection observer target */}
      <div ref={ref} className='py-4 flex justify-center'>
        {loading && <Spin size='large' />}
      </div>
    </section>
  );
}
