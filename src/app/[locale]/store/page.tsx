import { ICategoryWiseProducts } from "@/app/lib/types/rootTypes";
import { BASE_URL } from "@/constant/Defaults";
import InfiniteScrollProducts from "./components/InfiniteScrollProducts";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: 'Our Store | Find All Your Needs',
  description: 'Browse our wide range of products with convenient filtering and sorting options.',
  keywords: 'online store, shop, ecommerce, products, discount, shopping',
  openGraph: {
    title: 'Our Store | Find All Your Needs',
    description: 'Browse our wide range of products with convenient filtering and sorting options.',
    type: 'website',
  },
};

export default async function StoreMainPage({ }: Props) {
  // Initial data fetch (SSR)
  let productData = await fetch(`${BASE_URL}/client/category/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page: 1,
      limit: 12,
    }),
    cache: 'no-store'
  });

  let initialProducts: IRes<ICategoryWiseProducts[]> = await productData?.json();

  return (
    <section className="min-h-screen">
      <InfiniteScrollProducts initialProducts={initialProducts} />
    </section>
  );
}