import Categories from "@/components/Category/Categories";
import Farming from "@/components/Farming/Farming";
import Hero from "@/components/Hero/Hero";
import OurFarmers from "@/components/OurFarmers/OurFarmers";
import FeaturedProducts from "@/components/Products/FeaturedProducts";
import TopSellingProducts from "@/components/TopSellingProducts/TopSellingProducts";
import WhyChoseUs from "@/components/WhyChoseUs/WhyChoseUs";
import { BASE_URL } from "@/constant/Defaults";
import { Suspense } from "react";

// Separate data fetching functions
async function getFeaturedProducts() {
  try {
    const res = await fetch(
      `${BASE_URL}/client/product/get-featured-products`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        next: {
          // revalidate: 3600 // Revalidate every hour
        },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch featured products");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return null;
  }
}

async function getHeroImages() {
  try {
    const res = await fetch(`${BASE_URL}/client/settings/hero-image/fetch`, {
      next: {
        // revalidate: 86400 // Revalidate daily
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch hero images");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching hero images:", error);
    return null;
  }
}

async function getCategories() {
  try {
    const res = await fetch(`${BASE_URL}/client/category/fetch`, {
      method: "POST",
      next: {
        // revalidate: 86400 // Revalidate daily
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
}

async function getTopSellingProducts() {
  try {
    const res = await fetch(`${BASE_URL}/client/product/top-selling`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      next: {
        // revalidate: 3600 // Revalidate every hour
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch top selling products");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching top selling products:", error);
    return null;
  }
}

export default async function Home() {
  // Parallel data fetching
  const [
    featuredProductsRes,
    heroImagesRes,
    categoriesRes,
    topSellingProductsRes,
  ] = await Promise.all([
    getFeaturedProducts(),
    getHeroImages(),
    getCategories(),
    getTopSellingProducts(),
  ]);

  return (
    <main className=''>
      <Suspense fallback={<div>Loading hero...</div>}>
        <Hero heroImages={heroImagesRes?.data} />
      </Suspense>

      <Suspense fallback={<div>Loading categories...</div>}>
        <Categories categories={categoriesRes} />
      </Suspense>

      {featuredProductsRes?.data?.length ? (
        <Suspense fallback={<div>Loading featured products...</div>}>
          <FeaturedProducts
            productData={featuredProductsRes}
            category={categoriesRes}
          />
        </Suspense>
      ) : null}

      <WhyChoseUs />

      <Suspense fallback={<div>Loading top selling products...</div>}>
        <TopSellingProducts products_topSelling={topSellingProductsRes} />
      </Suspense>

      {/* <Farming /> */}
      {/* <OurFarmers /> */}
    </main>
  );
}
