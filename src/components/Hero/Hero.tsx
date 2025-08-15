"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { ISliderData } from "@/types/hero";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import AboutHero from "./AboutHero";
import SliderBody from "./SliderBody";
import SliderBodyMobile from "./SliderBodyMobile";
import { useEffect, useState } from "react";

type Props = { heroImages: ISliderData[] | undefined };

const Hero = ({ heroImages }: Props) => {
  const [isHidden, setIsHidden] = useState(false);
  const [screenWidth, setScreenWidth] = useState<number | null>(null); // Initialize as null to indicate SSR

  useEffect(() => {
    // Access window only after the component is mounted
    if (typeof window !== "undefined") {
      const checkHeight = () => {
        const headerHeight =
          parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--header-height"
            )
          ) || 0;
        const viewportHeight = window.innerHeight;
        const calculatedHeight = viewportHeight - headerHeight;

        // Check if height is less than 500px
        setIsHidden(calculatedHeight < 400);
      };

      // Set initial screenWidth and height
      setScreenWidth(window.innerWidth);
      checkHeight();

      // Add resize listener
      const handleResize = () => {
        setScreenWidth(window.innerWidth); // Update screen width
        checkHeight(); // Recalculate height
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return !isHidden && heroImages?.length ? (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: true,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={false}
      modules={[Autoplay, Pagination, Navigation]}
      className='swiper'
    >
      {heroImages.map((item) => (
        <SwiperSlide key={item.id}>
          {/* for desktop */}
          <div className='hidden xl:block '>
            <SliderBody item={item} />
          </div>

          {/* for tablet */}
          <div className='hidden sm:block xl:hidden'>
            <AboutHero item={item}>
              <SliderBody item={item} />
            </AboutHero>
          </div>

          {/* for mobile */}
          <div className='block sm:hidden'>
            <SliderBodyMobile item={item} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <></>
  );
};

export default Hero;
