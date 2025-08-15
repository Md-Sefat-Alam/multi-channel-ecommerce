"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Badge, Image } from "antd";
import getUrl from "@/utils/getUrl";
import { IProduct } from "@/app/lib/types/rootTypes";
import classNames from "classnames";
import { CiImageOff } from "react-icons/ci";

type Props = { product: IProduct };

export default function ProductGallery({ product }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const { title = "", discount, images = [] } = product || {};

  const renderGallery = () => (
    <div className='relative'>
      {/* Main Image Slider */}
      <Swiper
        loop={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs, Navigation]}
        navigation={true}
        className='rounded-xl overflow-hidden bg-white shadow-sm mb-4'
      >
        {images?.length > 0 ? (
          images.map((item, index) => (
            <SwiperSlide key={index} className='aspect-square'>
              <Image
                preview={true}
                src={item.path.includes("http") ? item.path :getUrl({ path: item.path })}
                alt={title}
                className='object-contain w-full h-full'
                rootClassName='!w-full !h-full'
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide className='aspect-square'>
            {/* <div className='w-full h-full flex items-center justify-center bg-gray-100'> */}
            <div className='flex flex-col gap-4 items-center justify-center w-full h-full bg-gray-100 text-gray-400'>
              <CiImageOff size={48} />
              <span className='text-gray-400'>No image available</span>
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      {/* Thumbnail Slider */}
      {images?.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={images.length > 4}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className='thumbnail-swiper'
        >
          {images.map((item, index) => (
            <SwiperSlide key={index}>
              <div className='cursor-pointer rounded-lg overflow-hidden border-2 border-transparent hover:border-green-500 transition-all duration-300 aspect-square'>
                <img
                  src={getUrl({ path: item.path })}
                  alt={`${title} thumbnail ${index + 1}`}
                  className='w-full h-full object-cover'
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );

  return discount ? (
    <Badge.Ribbon
      placement='start'
      text={`${Number(discount).toFixed(0)}% OFF`}
      style={{ top: "20px" }}
      color='red'
      className='!z-20 !mt-[20px]'
    >
      {renderGallery()}
    </Badge.Ribbon>
  ) : (
    renderGallery()
  );
}
