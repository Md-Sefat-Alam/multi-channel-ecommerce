"use client";
import { useEffect, useState } from "react";
import { IProduct } from "@/app/lib/types/rootTypes";
import { BASE_URL } from "@/constant/Defaults";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "@/components/Products/ProductCard";

type Props = {
  categoryId?: string;
  currentProductId?: string;
};

export default function RelatedProducts({
  categoryId,
  currentProductId,
}: Props) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    const fetchRelatedProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/client/product/fetch`, {
          method: "POST",
          body: JSON.stringify({
            length: 8,
            start: 0,
            filters: {
              categoryId: categoryId,
              // excludeUuid: currentProductId,
            },
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setProducts(
          (data.data || []).filter(
            (item: any) => item?.uuid !== currentProductId,
          ),
        );
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [categoryId, currentProductId]);

  if (loading) {
    return (
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className='h-80 rounded-lg bg-gray-100 animate-pulse'
          ></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>
        You Might Also Like
      </h2>
      <div className='related-products'>
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className='pb-10'
        >
          {products.map((product) => (
            <SwiperSlide key={product.uuid}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
