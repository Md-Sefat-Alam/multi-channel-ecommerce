"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { LuApple } from "react-icons/lu";
import { MdOutlineCleanHands, MdOutlineHealthAndSafety } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { MotionContainer } from "../common/MotionContainer";
import Title from "../common/Title";

export default function WhyChooseUs() {
  const t = useTranslations("whyChooseUs");

  const features = [
    {
      icon: <LuApple />,
      title: t("features.0.title"),
      description: t("features.0.description"),
    },
    {
      icon: <TbTruckDelivery />,
      title: t("features.1.title"),
      description: t("features.1.description"),
    },
    {
      icon: <MdOutlineHealthAndSafety />,
      title: t("features.2.title"),
      description: t("features.2.description"),
    },
    {
      icon: <MdOutlineCleanHands />,
      title: t("features.3.title"),
      description: t("features.3.description"),
    },
  ];

  return (
    <section className='relative overflow-hidden py-16 md:py-24'>
      {/* Background Image with Gradient Overlay */}
      <div className='absolute inset-0 z-0'>
        <div
          className='absolute inset-0 bg-cover bg-center opacity-20'
          style={{ backgroundImage: "url('/assets/common/farming.jpg')" }}
        />
        <div className='absolute inset-0 bg-gradient-to-b from-white via-transparent to-white' />
      </div>

      {/* Content Container */}
      <div className='container mx-auto px-4 relative z-10'>
        {/* Section Title */}
        <div className='mb-16 text-center'>
          <Title title={t("title")} addAfter />
          <p className='mt-4 text-gray-600 max-w-2xl mx-auto'>
            {t("description")}
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto'>
          {features.map((feature, index) => (
            <MotionContainer
              key={feature.title}
              delay={Math.floor(index / 2) * 0.2}
            >
              <FeatureCard {...feature} />
            </MotionContainer>
          ))}
        </div>
      </div>
    </section>
  );
}

const FeatureCard = ({ icon, title, description }: any) => {
  return (
    <div className='group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:translate-y-[-4px]'>
      <div className='flex flex-col sm:flex-row items-center p-6'>
        {/* Icon */}
        <div className='flex items-center justify-center w-16 h-16 rounded-full bg-[--primary-light] group-hover:bg-[--primary] transition-colors duration-300 mb-4 sm:mb-0 sm:mr-6 flex-shrink-0'>
          <div className='text-3xl text-[--secondary] group-hover:text-white transition-colors duration-300'>
            {icon}
          </div>
        </div>

        {/* Content */}
        <div className='flex-1 text-center sm:text-left'>
          <h3 className='font-poppins text-xl lg:text-2xl font-bold text-[--primary] mb-2 group-hover:text-[--secondary] transition-colors duration-300'>
            {title}
          </h3>
          <p className='font-open-sans text-gray-600 group-hover:text-gray-700 transition-colors duration-300'>
            {description}
          </p>
        </div>
      </div>
      <div className='h-1 bg-[--secondary-light] group-hover:bg-[--secondary] transition-colors duration-300' />
    </div>
  );
};
