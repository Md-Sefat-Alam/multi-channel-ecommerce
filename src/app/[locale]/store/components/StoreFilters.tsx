"use client";
import React, { useEffect } from "react";
import { Checkbox, Slider, Radio, InputNumber, Switch, Button } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import {
  resetFilters,
  setFilter,
} from "@/lib/features/store-filters/storeFiltersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

type Props = {
  category: IRes<
    {
      categoryName: string;
      categoryNameBn: string;
    }[]
  >;
};

export default function StoreFilters({ category }: Props) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const t = useTranslations("storeFilter");

  // Inside the component
  const locale = useLocale();

  // Extract category from URL on component mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && !filters.categories.includes(categoryFromUrl)) {
      dispatch(
        setFilter({
          key: "categories",
          value: [...filters.categories, categoryFromUrl],
        }),
      );
    }
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (filters.categories.length > 0) {
      params.set("category", filters.categories[0]);
    } else {
      params.delete("category");
    }

    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.replace(newUrl, { scroll: false });
  }, [filters.categories]);

  const handleCategoryChange = (
    e: CheckboxChangeEvent,
    categoryName: string,
  ) => {
    dispatch(
      setFilter({
        key: "categories",
        value: e.target.checked
          ? [...filters.categories, categoryName]
          : filters.categories.filter((cat) => cat !== categoryName),
      }),
    );
  };

  const handlePriceChange = (value: number[]) => {
    dispatch(setFilter({ key: "priceRange", value }));
  };

  const handleSortChange = (e: any) => {
    dispatch(setFilter({ key: "sortBy", value: e.target.value }));
  };

  const handleAvailabilityChange = (checked: boolean) => {
    dispatch(setFilter({ key: "inStock", value: checked }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.replace(newUrl, { scroll: false });
  };

  return (
    <div className='py-6 mx-4'>
      <h3 className='text-lg font-medium text-gray-900 mb-4'>
        {t("filterTitle")}
      </h3>

      <Button
        onClick={handleReset}
        size='middle'
        type='dashed'
        className='mb-4 !w-full'
      >
        {t("resetFilters")}
      </Button>

      {/* Price Range */}
      <div className='border-b border-gray-200 py-6'>
        <h3 className='text-md font-medium text-gray-900 mb-4'>
          {t("priceRange")}
        </h3>
        <Slider
          range
          min={0}
          max={2500}
          value={filters.priceRange}
          onChange={handlePriceChange}
          className='mt-2'
        />
        <div className='flex justify-between mt-2'>
          <InputNumber
            min={0}
            max={2500}
            value={filters.priceRange[0]}
            onChange={(value) =>
              handlePriceChange([value || 0, filters.priceRange[1]])
            }
            size='small'
            className='w-24'
            addonBefore={t("currency")}
          />
          <InputNumber
            min={0}
            max={2500}
            value={filters.priceRange[1]}
            onChange={(value) =>
              handlePriceChange([filters.priceRange[0], value || 2500])
            }
            size='small'
            className='w-24'
            addonBefore={t("currency")}
          />
        </div>
      </div>

      {/* Sort By */}
      <div className='border-b border-gray-200 py-6'>
        <h3 className='text-md font-medium text-gray-900 mb-2'>
          {t("sortBy")}
        </h3>
        <Radio.Group
          onChange={handleSortChange}
          value={filters.sortBy}
          className='space-y-2 flex flex-col mt-2'
        >
          <Radio value='newest'>{t("newest")}</Radio>
          <Radio value='priceAsc'>{t("priceAsc")}</Radio>
          <Radio value='priceDesc'>{t("priceDesc")}</Radio>
          <Radio value='rating'>{t("rating")}</Radio>
        </Radio.Group>
      </div>

      {/* In Stock */}
      <div className='border-b border-gray-200 py-6'>
        <div className='flex items-center justify-between'>
          <h3 className='text-md font-medium text-gray-900'>{t("inStock")}</h3>
          <Switch
            checked={filters.inStock}
            onChange={handleAvailabilityChange}
            size='small'
          />
        </div>
      </div>

      {/* Discount */}
      <div className='py-6'>
        <div className='flex items-center'>
          <Checkbox
            checked={filters.hasDiscount}
            onChange={(e) =>
              dispatch(
                setFilter({ key: "hasDiscount", value: e.target.checked }),
              )
            }
          />
          <label className='ml-3 text-sm text-gray-600'>
            {t("discountOnly")}
          </label>
        </div>
      </div>

      {/* Category */}
      <div className='border-b border-gray-200 py-6'>
        <h3 className='text-md font-medium text-gray-900 mb-2'>
          {t("category")}
        </h3>
        <div className='space-y-3 pt-2'>
          {category.data?.map((item) => (
            <div className='flex items-center' key={item.categoryName}>
              <Checkbox
                id={item.categoryName}
                checked={filters.categories.includes(item.categoryName)}
                onChange={(e) => handleCategoryChange(e, item.categoryName)}
              />
              <label
                htmlFor={item.categoryName}
                className='ml-3 text-sm text-gray-600'
              >
                {locale === "bn" ? item.categoryNameBn : item.categoryName}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
