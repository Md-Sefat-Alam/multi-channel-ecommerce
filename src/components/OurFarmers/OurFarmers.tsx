"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Title from "../common/Title";
import FarmersCard from "./FarmersCard";
import Head from "next/head";
import { MotionContainer } from "../common/MotionContainer";

const sliderData: any[] = [
    {
        description: "lorem ipsum dolor sit amet",
        id: 1,
        imgUrl: "/assets/products/WhatsApp Image 2024-09-06 at 10.24.24 PM.jpeg",
        title: "Lorem ipsum dolor",
        isProductView: true,
        relatedProducts: [
            {
                id: 1,
                imgUrl: "/assets/products/WhatsApp Image 2024-09-06 at 10.24.24 PM.jpeg",
                title: "lorem Ips",
            },
        ],
        position: "bottom_center",
    },
    {
        description: "lorem ipsum dolor sit amet",
        id: 1,
        imgUrl: "/assets/products/WhatsApp Image 2024-09-06 at 10.24.38 PM (1).jpeg",
        title: "Lorem ipsum dolor",
        position: "right_center",
    },
    {
        description: "lorem ipsum dolor sit amet",
        id: 1,
        imgUrl: "/assets/products/WhatsApp Image 2024-09-06 at 10.24.38 PM (2).jpeg",
        title: "Lorem ipsum dolor",
        position: "top_left",
    },
    {
        description: "lorem ipsum dolor sit amet",
        id: 1,
        imgUrl: "/assets/products/WhatsApp Image 2024-09-06 at 10.24.37 PM (1).jpeg",
        title: "Lorem ipsum dolor",
        position: "bottom_right",
    },
    {
        description: "lorem ipsum dolor sit amet",
        id: 1,
        imgUrl: "/assets/products/WhatsApp Image 2024-09-06 at 10.24.37 PM (1).jpeg",
        title: "Lorem ipsum dolor",
        position: "bottom_right",
    },
    {
        description: "lorem ipsum dolor sit amet",
        id: 1,
        imgUrl: "/assets/products/WhatsApp Image 2024-09-06 at 10.24.37 PM (1).jpeg",
        title: "Lorem ipsum dolor",
        position: "bottom_right",
    },
    {
        description: "lorem ipsum dolor sit amet",
        id: 1,
        imgUrl: "/assets/products/WhatsApp Image 2024-09-06 at 10.24.37 PM (1).jpeg",
        title: "Lorem ipsum dolor",
        position: "bottom_right",
    },
    {
        description: "lorem ipsum dolor sit amet",
        id: 1,
        imgUrl: "/assets/products/WhatsApp Image 2024-09-06 at 10.24.37 PM (1).jpeg",
        title: "Lorem ipsum dolor",
        position: "bottom_right",
    },
];

type Props = {};

export default function OurFarmers({ }: Props) {
    return (
        <div className='overflow-hidden py-16'>
            {/* contents */}
            <MotionContainer>
                <Title title='Our Farmers' addAfter />
            </MotionContainer>
            <div className='container mx-auto'>
                <Swiper
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        // disableOnInteraction: true, // Autoplay stops when user interacts
                    }}
                    navigation={false}
                    modules={[Autoplay, Pagination, Navigation]}
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    // modules={[Pagination]}
                    className='mySwiper_farmers !py-10'
                >
                    {sliderData.map((item) => (
                        <SwiperSlide key={item.id}>
                            <MotionContainer>
                                <FarmersCard />
                            </MotionContainer>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
