"use client";
import { ISliderData } from "@/types/hero";
import getUrl from "@/utils/getUrl";
import { IsJsonString } from "@/utils/Json";
import classNames from "classnames";
import { Variants } from "framer-motion";
import * as motion from "framer-motion/client";
import Image from "next/image";
import { memo } from "react";
import AboutCard from "./AboutCard";
import ProductCard from "../Products/ProductCard";
import AboutCardMobile from "./AboutCardMobile";
import { MotionContainer } from "../common/MotionContainer";

type Props = { item: ISliderData };

const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const SliderBodyMobile = ({ item }: Props) => {
  const position = item?.position || "left_center";
  const imageUrl = IsJsonString(item?.images)
    ? getUrl({ path: JSON.parse(item?.images)[0].path })
    : item?.images;

  const products = item.products?.length ? item.products : [];

  return (
    <div className='flex flex-col'>
      <div
        className='relative flex justify-center items-center mx-auto'
        style={{
          height: `calc(100vw - var(--header-height))`,
          aspectRatio: "16 / 9",
          //   aspectRatio: "9 / 16",
          width: "auto",
        }}
      >
        {/* Next.js Image with fixed aspect ratio */}
        <div className='relative w-full xl:rounded-[10px] overflow-hidden h-full max-w-screen-xl'>
          <MotionContainer>
            <Image
              src={imageUrl || "/placeholder.jpg"}
              alt={item?.heroTitle || "Hero Image"}
              // layout='fill'
              // objectFit='cover'
              height={900}
              width={1600}
              className='shadow-lg'
              priority
            />
          </MotionContainer>
        </div>

        {/* Content over the image */}
        <div
          className={classNames("absolute flex flex-col gap-4 w-full h-full", {
            "justify-start items-end pt-10": position === "top_right",
            "justify-end items-end pb-10 pr-10": position === "bottom_right",
            "justify-start items-start pl-10": position === "top_left",
            "justify-end items-start pl-10 pb-10": position === "bottom_left",
            "justify-center items-start pl-10": position === "left_center",
            "justify-center items-end pr-10": position === "right_center",
            "justify-center items-center": position === "center",
            "justify-start items-center": position === "top_center",
            "justify-end items-center pb-10": position === "bottom_center",
            hidden: !item?.heroTitle,
          })}
        >

          <div className='flex flex-col gap-2'>
            <MotionContainer delay={0 * 0.1}>
              <h1 className='text-lg font-bold text-white bg-black/40 px-4 rounded-xl shadow-2xl text-left inline py-1'>
                {item?.heroTitle}
              </h1>
            </MotionContainer>
            <MotionContainer delay={1 * 0.1}>
              <p className='mb-10 text-white shadow-md bg-black/40 px-4 rounded-xl md:max-w-[70%] max-w-[100%] text-sm text-left py-1'>
                {item?.subTitle}
              </p>
            </MotionContainer>
          </div>
        </div>
      </div>
      <div className='sm:hidden w-full grid grid-cols-2 gap-10 mt-4 px-4'>
        {products.map((product) => {
          return <AboutCardMobile product={product} />;
        })}
      </div>
    </div>
  );
};

export default SliderBodyMobile;
