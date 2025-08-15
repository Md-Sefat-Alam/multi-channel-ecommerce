// components/CustomSwiper.js
"use client"; // Use client component in Next.js

import {
    Navigation,
    Pagination,
    Scrollbar,
    Keyboard,
    Thumbs,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { useState } from "react";
import SwiperType from "swiper";

const CustomSwiper = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    return (
        <>
            {/* First Swiper for Thumbnails */}
            <Swiper
                className='swiper'
                modules={[Thumbs]}
                loop={true}
                spaceBetween={-10}
                slidesPerView={3}
                watchSlidesProgress={true}
                onSwiper={setThumbsSwiper}
            >
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                {/* Add more slides as needed */}
            </Swiper>

            {/* Main Swiper */}
            <Swiper
                className='mySwiper2'
                modules={[Navigation, Thumbs]}
                loop={true}
                spaceBetween={32}
                thumbs={{ swiper: thumbsSwiper }}
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
            >
                <SwiperSlide>Slide A</SwiperSlide>
                <SwiperSlide>Slide B</SwiperSlide>
                <SwiperSlide>Slide C</SwiperSlide>
                {/* Add more slides as needed */}
            </Swiper>

            {/* Team Swiper */}
            <Swiper
                className='teamswiper'
                modules={[Navigation, Pagination, Scrollbar, Keyboard]}
                loop={true}
                spaceBetween={32}
                slidesPerView={1}
                centeredSlides={false}
                slidesPerGroupSkip={1}
                grabCursor={true}
                keyboard={{ enabled: true }}
                breakpoints={{
                    769: {
                        slidesPerView: 2,
                        slidesPerGroup: 1,
                    },
                }}
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
                scrollbar={{ el: ".swiper-scrollbar" }}
                pagination={{ el: ".swiper-pagination", type: "fraction" }}
            >
                <SwiperSlide>Team Slide 1</SwiperSlide>
                <SwiperSlide>Team Slide 2</SwiperSlide>
                <SwiperSlide>Team Slide 3</SwiperSlide>
                {/* Add more slides as needed */}
            </Swiper>

            {/* Navigation buttons */}
            <div className='swiper-button-next'>Next</div>
            <div className='swiper-button-prev'>Prev</div>
            {/* Optional Pagination and Scrollbar */}
            <div className='swiper-pagination'></div>
            <div className='swiper-scrollbar'></div>
        </>
    );
};

export default CustomSwiper;
