"use client";
import { ISliderData } from "@/types/hero";
import getUrl from "@/utils/getUrl";
import { IsJsonString } from "@/utils/Json";
import classNames from "classnames";
import { Variants } from "framer-motion";
import * as motion from "framer-motion/client";
import Image from "next/image";
import AboutCard from "./AboutCard";
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

const SliderBody = ({ item }: Props) => {
  const position = item?.position || "left_center";
  const imageUrl = IsJsonString(item?.images)
    ? getUrl({ path: JSON.parse(item?.images)[0].path })
    : item?.images;

  const leftSide = item.products?.length ? item.products.slice(0, 2) : [];
  const rightSide = item.products?.length ? item.products.slice(2, 4) : [];

  return (
    <div className='flex'>
      <div className='hidden xl:flex w-full flex-col justify-start items-center gap-4 pt-2 px-2'>
        {leftSide.map((product) => {
          return <AboutCard product={product} />;
        })}
      </div>
      <div
        className='relative flex justify-center items-center mx-auto'
        style={{
          height: `calc(100vh - var(--header-height))`,
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

          <div className='flex flex-col gap-4 ml-4'>
            <MotionContainer>
              <h1 className='text-2xl font-bold text-white py-3 bg-black/40 px-4 rounded-xl shadow-2xl'>
                {item?.heroTitle}
              </h1>
            </MotionContainer>
            <MotionContainer>
              <p className='mb-10 text-white shadow-xl py-3 bg-black/40 px-4 rounded-xl'>
                {item?.subTitle}
              </p>
            </MotionContainer>
          </div>
        </div>
      </div>
      <div className='hidden xl:flex w-full flex-col justify-start items-center gap-4 pt-4 px-2'>
        {rightSide.map((product) => {
          return <AboutCard product={product} />;
        })}
      </div>
    </div>
  );
};

export default SliderBody;
