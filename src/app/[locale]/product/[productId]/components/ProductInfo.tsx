"use client";
import { useState } from "react";
import { IProduct } from "@/app/lib/types/rootTypes";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { useAppSelector } from "@/lib/hooks";
import { Link } from "@/MUST_USE_Navigation";
import {
  HeartOutlined,
  ShareAltOutlined,
  CheckCircleFilled,
  ShoppingCartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Button, Tooltip, message, Divider } from "antd";
import { FaMinus, FaPlus, FaCartPlus, FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import TK from "@/components/common/TK";
import {
  addToWishlist,
  removeFromWishlist,
  WishlistItem,
} from "@/lib/features/wish-list/wishlistSlice";
import { useAuth } from "@/context/AuthContext";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "@/app/lib/api/rootApis";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

type Props = { product: IProduct; locale: string };

export default function ProductInfo({ product, locale }: Props) {
  const dispatch = useDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const { token } = useAuth();
  const isAuthenticated = !!token;
  const [quantity, setQuantity] = useState(1);
  const [addToWishListApi] = useAddToWishlistMutation();
  const [removeFromWishListApi] = useRemoveFromWishlistMutation();
  const t = useTranslations("product");
  const tCommon = useTranslations("common");
  const params = useParams();

  if (!product) return null;

  // Helper function to get localized product data
  const getLocalizedValue = (enValue: string, bnValue?: string) => {
    return locale === "bn" && bnValue ? bnValue : enValue;
  };

  const {
    uuid,
    title = "",
    titleBn = "",
    subTitle = "",
    subTitleBn = "",
    price = 0,
    discount = 0,
    finalPrice = 0,
    stock = 0,
    lowStockAlert = 5,
    unitType = "",
    category,
    averageRating = 0,
    tags = [],
    tagsBn = [],
  } = product;

  const productTitle = getLocalizedValue(title, titleBn);
  const productSubTitle = getLocalizedValue(subTitle, subTitleBn);
  const categoryName = category
    ? getLocalizedValue(category.categoryName, category.categoryNameBn)
    : "";
  const productTags = locale === "bn" && tagsBn?.length ? tagsBn : tags;

  const isInWishlist = wishlistItems.some((item) => item.id === uuid);
  const isInCart = cartItems.find((item) => item.id === uuid);
  const isOutOfStock = stock <= 0;
  const isLowStock = stock > 0 && stock <= lowStockAlert;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    dispatch(
      addToCart({
        id: uuid,
        name: productTitle,
        price: finalPrice,
        quantity: quantity,
        imageLink: product.images,
      }),
    );
    message.success(t("addedToCartSuccess"));
  };

  const handleToggleWishlist = async () => {
    const wishlistItem: WishlistItem = {
      id: uuid,
      name: productTitle,
      price: finalPrice,
      imageLink: product?.images as any,
    };
    if (isInWishlist) {
      dispatch(removeFromWishlist(uuid));
      if (isAuthenticated) await removeFromWishListApi({ productId: uuid });
      message.success(t("removedFromWishlistSuccess"));
    } else {
      if (isAuthenticated) await addToWishListApi({ productId: uuid });
      dispatch(addToWishlist(wishlistItem));
      message.success(t("addedToWishlistSuccess"));
    }
  };

  const renderUnitTypeLabel = () => {
    if (t(`unitTypes.${unitType}`) !== `unitTypes.${unitType}`) {
      return t(`unitTypes.${unitType}`);
    }
    return unitType;
  };

  return (
    <div className='flex flex-col h-full'>
      {/* Product Title & Actions */}
      <div className='mb-4'>
        {categoryName && (
          <div className='text-sm font-medium text-green-600 mb-1'>
            {categoryName}
          </div>
        )}
        <div className='flex justify-between items-start gap-4'>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-800 flex-grow'>
            {productTitle}
          </h1>
          <div className='flex gap-2'>
            <Tooltip title={tCommon("share")}>
              <Button
                type='text'
                shape='circle'
                icon={<ShareAltOutlined />}
                className='flex items-center justify-center text-gray-500 hover:text-green-600'
              />
            </Tooltip>
            <Tooltip
              title={
                isInWishlist ? t("removeFromWishlist") : t("addToWishlist")
              }
            >
              <Button
                type='text'
                shape='circle'
                icon={
                  isInWishlist ? (
                    <HeartFilled className='text-red-500' />
                  ) : (
                    <HeartOutlined />
                  )
                }
                onClick={handleToggleWishlist}
                className='flex items-center justify-center hover:text-red-500'
              />
            </Tooltip>
          </div>
        </div>
        {productSubTitle && (
          <p className='text-gray-500 mt-1'>{productSubTitle}</p>
        )}
      </div>

      {/* Rating */}
      <div className='mb-6 flex items-center'>
        <div className='flex items-center bg-amber-400 text-white px-2 py-1 rounded'>
          <span className='font-medium mr-1'>
            {averageRating ? averageRating.toFixed(1) : "N/A"}{" "}
          </span>
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z' />
          </svg>
        </div>
        {productTags && productTags.length > 0 && (
          <div className='ml-4 flex flex-wrap gap-1'>
            {productTags.map((tag, index) => (
              <span
                key={index}
                className='text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full'
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Price */}
      <div className='mb-6'>
        <div className='flex items-baseline'>
          <span className='text-3xl font-bold text-gray-900'>
            <TK value={finalPrice} />
          </span>
          {(discount || 0) > 0 && (
            <>
              <span className='ml-3 text-lg font-medium text-red-400 line-through'>
                <TK value={price} />
              </span>
              <span className='ml-3 text-sm font-medium text-green-600'>
                {tCommon("save")} {discount}%
              </span>
            </>
          )}
        </div>
        {unitType && (
          <div className='mt-1 text-sm text-gray-500'>
            {renderUnitTypeLabel()}
          </div>
        )}
      </div>

      {/* Stock Status */}
      <div className='mb-6'>
        {isOutOfStock ? (
          <div className='flex items-center text-red-600'>
            <svg
              className='w-5 h-5 mr-1'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                clipRule='evenodd'
              />
            </svg>
            <span className='font-medium'>{t("stockStatus.outOfStock")}</span>
          </div>
        ) : isLowStock ? (
          <div className='flex items-center text-orange-500'>
            <svg
              className='w-5 h-5 mr-1'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                clipRule='evenodd'
              />
            </svg>
            <span className='font-medium'>
              {t("stockStatus.lowStock", { count: stock })}
            </span>
          </div>
        ) : (
          <div className='flex items-center text-green-600'>
            <CheckCircleFilled className='mr-1' />
            <span className='font-medium'>{t("stockStatus.inStock")}</span>
          </div>
        )}
      </div>

      <Divider className='my-4' />

      {/* Quantity Selector & Add to Cart */}
      <div className='mb-6'>
        <div className='flex flex-col sm:flex-row gap-4'>
          <div className='flex items-center border border-gray-300 rounded-full overflow-hidden w-full sm:w-40'>
            <button
              disabled={quantity <= 1 || isOutOfStock}
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className='w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50'
            >
              <FaMinus size={12} />
            </button>
            <div className='flex-grow text-center font-medium'>{quantity}</div>
            <button
              disabled={isOutOfStock}
              onClick={() => setQuantity((prev) => prev + 1)}
              className='w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50'
            >
              <FaPlus size={12} />
            </button>
          </div>
          {!isInCart ? (
            <Button
              type='primary'
              size='large'
              icon={<FaCartPlus />}
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className='h-12 flex items-center justify-center bg-green-600 hover:bg-green-700 border-none rounded-full'
              style={{
                backgroundColor: "var(--primary)",
                borderRadius: "9999px",
              }}
            >
              {t("addToCart")}
            </Button>
          ) : (
            <Link href='/buy-now' className='block flex-grow'>
              <Button
                type='primary'
                size='large'
                icon={<ShoppingCartOutlined />}
                className='w-full h-12 flex items-center justify-center bg-green-700 hover:bg-green-800 border-none rounded-full'
                style={{
                  backgroundColor: "var(--secondary)",
                  borderRadius: "9999px",
                }}
              >
                {t("viewCart")}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Buy Now Button */}
      <Link
        href='/buy-now'
        onClick={!isInCart ? handleAddToCart : undefined}
        className='w-full h-12 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-all duration-300 mb-6'
      >
        {t("buyNow")} <FaArrowRight className='ml-2' size={12} />
      </Link>

      {/* Delivery Information */}
      <div className='mt-auto pt-4 border-t border-gray-200'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex items-center'>
            <div className='w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-3'>
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 12L12 8M12 8L8 12M12 8L12 16'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <div>
              <p className='text-sm font-medium'>
                {t("deliveryInfo.freeDelivery")}
              </p>
              <p className='text-xs text-gray-500'>
                {t("deliveryInfo.freeDeliveryDesc")}
              </p>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-3'>
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M2.67004 18.9501L7.60004 15.6401C8.39004 15.1101 9.53004 15.1701 10.24 15.7801L10.57 16.0701C11.35 16.7401 12.61 16.7401 13.39 16.0701L17.55 12.5001C18.33 11.8301 19.59 11.8301 20.37 12.5001L22 13.9001'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <div>
              <p className='text-sm font-medium'>
                {t("deliveryInfo.qualityGuarantee")}
              </p>
              <p className='text-xs text-gray-500'>
                {t("deliveryInfo.qualityGuaranteeDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
