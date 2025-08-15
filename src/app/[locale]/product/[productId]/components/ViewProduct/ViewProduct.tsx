"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import styles from "./ViewProduct.module.css";
import { Badge, Image } from "antd";
import BadgeRibbon from "@/components/common/BadgeRibbon";
import getUrl from "@/utils/getUrl";
import { IProduct } from "@/app/lib/types/rootTypes";
import classNames from "classnames";

type Props = { productId: string; product: IRes<IProduct[]> };

export default function ViewProduct({ productId, product: data }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const product = data?.data[0];
  const { title = "", discount, images = [] } = product || {};

  const contents = (
    <div className='min-h-[520px]'>
      {/* Main Image Slider */}
      <Swiper
        loop={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        className={`${styles.mySwiper2} mt-2 rounded-2xl`}
      >
        {images?.map((item, index) => (
          <SwiperSlide key={index}>
            <Image
              preview={true}
              src={getUrl({ path: item.path })}
              alt={title}
              className={`${styles.image} max-lg:mx-auto object-cover`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Slider */}
      <Swiper
        onSwiper={(e) => {
          console.log(e);

          setThumbsSwiper(e);
        }}
        loop={true}
        spaceBetween={10}
        slidesPerView={6}
        // freeMode={true}
        modules={[Thumbs]}
        className={classNames(styles.mySwiper)}
      >
        {images?.map((item, index) => (
          <SwiperSlide className={classNames("max-w-[80px]")} key={index}>
            <img
              src={getUrl({ path: item.path })}
              alt={title}
              className={classNames(
                `cursor-pointer rounded-xl transition-all duration-500 object-cover !shadow-lg`

                // {
                //     "opacity-100":
                //         thumbsSwiper?.activeIndex !== index,
                //     "opacity-100":
                //         thumbsSwiper?.activeIndex === index,
                // }
              )}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

  return discount !== null ? (
    <Badge.Ribbon
      placement='start'
      text={`-${discount}%`}
      style={{ top: "20px" }}
      color='volcano'
      className='!z-20 !mt-[20px] !text-xl'
    >
      {contents}
    </Badge.Ribbon>
  ) : (
    contents
  );
}
