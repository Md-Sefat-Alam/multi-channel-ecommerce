"use client";
import { Link } from "@/MUST_USE_Navigation";
import { IsJsonString } from "@/utils/Json";
import getUrl from "@/utils/getUrl";
import { Grid } from "antd";
import Image from "next/image";
import { useRef, useState } from "react";
import { MotionContainer } from "../common/MotionContainer";
import Title from "../common/Title";
import { useTranslations, useLocale } from "next-intl";

export type TCategory = {
  categoryName: string;
  categoryNameBn: string;
  categoryDescription: string;
  categoryDescriptionBn: string;
  categoryImage: string;
};

const Categories = ({ categories }: { categories: IRes<TCategory[]> }) => {
  const [isFull, setIsFull] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const screens = Grid.useBreakpoint();
  const t = useTranslations("categories");
  const locale = useLocale();

  const getInitialItems = () => {
    if (screens.xl) {
      return 10;
    } else if (screens.lg) {
      return 8;
    } else if (screens.md) {
      return 6;
    } else {
      return 4; // sm and xs
    }
  };

  const displayedCategories = isFull
    ? categories?.data
    : categories?.data?.slice(0, getInitialItems());

  const handleLoadMore = () => {
    setIsFull((prev) => !prev);

    if (isFull) {
      // If we're collapsing, scroll back to the top of the categories section
      setTimeout(() => {
        containerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  const getCategoryImage = (category: any) => {
    if (IsJsonString(category?.categoryImage)) {
      const parsedImage = JSON.parse(category?.categoryImage);
      if (parsedImage?.path) {
        return getUrl({ path: parsedImage.path });
      }
    }
    return "/assets/categories/grocery-bag.png";
  };

  return (
    <section className='py-16 bg-[--bg-light-gray] overflow-hidden'>
      <div className='container mx-auto px-4' ref={containerRef}>
        <MotionContainer>
          <div className='text-center mb-12'>
            <Title title={t("title")} addAfter />
            <p className='mt-4 text-gray-600 max-w-2xl mx-auto'>
              {t("subtitle")}
            </p>
          </div>
        </MotionContainer>

        {/* Category Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6'>
          {displayedCategories?.map((category, index) => (
            <MotionContainer key={category.categoryName} delay={index * 0.05}>
              <CategoryCard
                category={category}
                imageUrl={getCategoryImage(category)}
                locale={locale}
              />
            </MotionContainer>
          ))}
        </div>

        {/* Empty State */}
        {!categories?.data?.length && (
          <MotionContainer>
            <div className='text-center py-16 bg-white rounded-lg shadow-sm'>
              <div className='text-gray-500 mb-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-12 w-12 mx-auto text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
                  />
                </svg>
              </div>
              <p className='text-lg font-medium'>{t("empty")}</p>
            </div>
          </MotionContainer>
        )}

        {/* Load More Button */}
        {categories?.data?.length > getInitialItems() && (
          <MotionContainer delay={getInitialItems() * 0.05}>
            <div className='text-center mt-10'>
              <button
                onClick={handleLoadMore}
                className='group inline-flex items-center justify-center px-6 py-3 border border-[--secondary] text-[--primary] font-medium rounded-md transition-all hover:bg-[--secondary] hover:text-white'
              >
                <span>{isFull ? t("show_less") : t("show_more")}</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className={`ml-2 h-4 w-4 transition-transform ${
                    isFull ? "rotate-180" : ""
                  }`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </button>
            </div>
          </MotionContainer>
        )}
      </div>
    </section>
  );
};

const CategoryCard = ({ category, imageUrl, locale }: any) => {
  // Conditional display based on locale
  const name =
    locale === "bn" ? category.categoryNameBn : category.categoryName;
  const description =
    locale === "bn"
      ? category.categoryDescriptionBn
      : category.categoryDescription;

  return (
    <Link
      href={`/store?category=${category?.categoryName}`}
      className='block h-full'
    >
      <div className='bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 flex flex-col items-center h-full overflow-hidden group'>
        <div className='relative w-24 h-24 mb-4 transition-transform duration-300 group-hover:scale-110'>
          <Image
            src={imageUrl}
            alt={name || "Category"}
            fill
            sizes='(max-width: 768px) 100px, 100px'
            style={{ objectFit: "contain" }}
            className='transition-opacity duration-300'
            priority
          />
        </div>

        <div className='w-full text-center'>
          <h3 className='font-poppins text-[--primary] text-lg font-medium group-hover:text-[--secondary] transition-colors duration-300 truncate'>
            {name}
          </h3>
          {description && (
            <p className='text-gray-500 text-sm mt-1 line-clamp-2'>
              {description}
            </p>
          )}
        </div>

        <div className='w-full mt-auto pt-3'>
          <div className='h-1 w-0 bg-[--secondary] transition-all duration-300 group-hover:w-full rounded-full'></div>
        </div>
      </div>
    </Link>
  );
};

export default Categories;
