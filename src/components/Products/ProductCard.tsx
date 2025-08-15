"use client";
import { IProduct } from "@/app/lib/types/rootTypes";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { Link } from "@/MUST_USE_Navigation";
import getUrl from "@/utils/getUrl";
import { Badge, Button, message } from "antd";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import {
  FaCartPlus,
  FaMinus,
  FaPlus,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import TK from "../common/TK";
import { useAppSelector } from "@/lib/hooks";
import classNames from "classnames";
import { useAuth } from "@/context/AuthContext";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "@/app/lib/api/rootApis";
import {
  addToWishlist,
  removeFromWishlist,
  WishlistItem,
} from "@/lib/features/wish-list/wishlistSlice";
import { CiImageOff } from "react-icons/ci";

type Props = { product: IProduct };

export default function ProductCard({ product }: Props) {
  const t = useTranslations("productCard");
  const dispatch = useDispatch();
  const cart = useAppSelector((store) => store.cart);
  const wishlistItems = useAppSelector((store) => store.wishlist.items);
  const { token } = useAuth();
  const isAuthenticated = !!token;
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const locale = useLocale();

  const isInWishlist = wishlistItems.some((item) => item.id === product.uuid);
  const originalPrice = product?.price || 0;
  const discountPercentage = product?.discount || 0;
  const finalPrice = originalPrice - originalPrice * (discountPercentage / 100);
  const isInCart = cart?.items?.find((item) => item.id === product?.uuid);
  const isOutOfStock = (product?.stock || 0) <= 0;
  const isLowStock =
    (product?.stock || 0) > 0 &&
    (product?.stock || 0) <= (product?.lowStockAlert || 5);

  const [addToWishListApi] = useAddToWishlistMutation();
  const [removeFromWishListApi] = useRemoveFromWishlistMutation();

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    dispatch(
      addToCart({
        id: product.uuid,
        name: product.title,
        price: finalPrice,
        quantity: count,
        imageLink: product.images,
      }),
    );
  };

  const handleToggleWishlist = async () => {
    const wishlistItem: WishlistItem = {
      id: product.uuid,
      name: product.title,
      price: finalPrice,
      imageLink: product?.images as any,
    };

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.uuid));
      if (isAuthenticated)
        await removeFromWishListApi({ productId: product.uuid });
      message.success(t("removedFromWishlist"));
    } else {
      if (isAuthenticated) await addToWishListApi({ productId: product.uuid });
      dispatch(addToWishlist(wishlistItem));
      message.success(t("addedToWishlist"));
    }
  };

  const getUnitTypeText = (unitType: string) => {
    const unitKey = unitType as any;
    // const unitKey = unitType as keyof typeof t.raw('unitTypes');
    return t(`unitTypes.${unitKey}`) || t("unitTypes.OTHER");
  };

  // Helper function to get localized product data
  const getLocalizedValue = (enValue: string, bnValue?: string) => {
    return locale === "bn" && bnValue ? bnValue : enValue;
  };

  return (
    <Badge.Ribbon
      placement='start'
      text={`${Number(product?.discount || 0).toFixed(2)}${t("discountOff")}`}
      style={{ top: "20px" }}
      color='red'
      className={classNames({ hidden: !product?.discount })}
    >
      <div
        className='relative transition-all duration-300 h-full group'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isOutOfStock && (
          <div className='absolute inset-0 bg-black/50 z-20 rounded-lg flex items-center justify-center'>
            <div className='bg-white/90 px-4 py-2 rounded-lg font-bold text-red-600'>
              {t("outOfStock")}
            </div>
          </div>
        )}
        <div className='flex flex-col h-full rounded-lg overflow-hidden transition-all duration-300 bg-white hover:shadow-lg border border-gray-100'>
          <div className='relative block'>
            <div
              onClick={(e) => e.stopPropagation()}
              className='aspect-square relative overflow-hidden bg-gray-50'
            >
              {product?.images?.length ? (
                <Image
                  alt={product.title}
                  src={product?.images[0]?.path.includes("http") ? product?.images[0]?.path : getUrl({
                    path:
                      product?.images[0]?.path ||
                      "uploads\\productImages\\productImages_1743069998428.jpeg",
                  })}
                  className={`object-cover transition-all duration-500 ${
                    isHovered ? "scale-105" : "scale-100"
                  }`}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  priority
                />
              ) : (
                <div className='flex items-center justify-center w-full h-full bg-gray-100 text-gray-400'>
                  <CiImageOff size={48} />
                </div>
              )}
              <div
                className={`absolute inset-0 bg-black/0 flex items-center justify-center transition-all duration-300 ${
                  isHovered ? "bg-black/10" : ""
                }`}
              >
                <div
                  className={`transition-all duration-300 transform ${
                    isHovered
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  {!isInCart && !isOutOfStock && (
                    <Button
                      type='primary'
                      onClick={handleAddToCart}
                      icon={<FaCartPlus size={18} />}
                      size='large'
                      shape='circle'
                    />
                  )}
                </div>
              </div>
              <button
                onClick={handleToggleWishlist}
                className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 bg-white/80 hover:bg-white shadow-sm ${
                  isInWishlist ? "text-red-500" : "text-gray-400"
                }`}
              >
                {isInWishlist ? (
                  <FaHeart size={16} />
                ) : (
                  <FaRegHeart size={16} />
                )}
              </button>
            </div>
          </div>
          <div className='flex flex-col p-4 flex-grow'>
            {product?.category?.categoryName && (
              <span className='text-xs text-green-700 font-medium mb-1'>
                {getLocalizedValue(
                  product.category.categoryName,
                  product.category.categoryNameBn,
                )}
              </span>
            )}
            <Link href={`/product/${product?.uuid}`}>
              <h3
                className='font-medium text-base text-gray-800 line-clamp-2 min-h-[2.5rem] hover:text-green-700 transition-colors duration-200'
                title={getLocalizedValue(product?.title, product?.titleBn)}
              >
                {getLocalizedValue(product?.title, product?.titleBn)}
              </h3>
            </Link>
            {product?.unitType && (
              <div className='mt-1 text-xs text-gray-500'>
                {getUnitTypeText(product.unitType)}
              </div>
            )}
            {isLowStock && (
              <div className='mt-1 text-xs font-medium text-orange-600 flex items-center'>
                <span className='inline-block w-2 h-2 rounded-full bg-orange-500 mr-1'></span>
                {t("onlyLeft", { count: product.stock })}
              </div>
            )}
            <div className='mt-3 flex items-baseline gap-2'>
              <span className='text-lg font-bold text-gray-900'>
                <TK value={finalPrice} />
              </span>
              {discountPercentage > 0 && (
                <span className='text-sm font-medium line-through text-red-400'>
                  <TK value={originalPrice} />
                </span>
              )}
            </div>
            <div className='mt-3'>
              {!isInCart ? (
                <div className='flex gap-2'>
                  <div className='flex border border-gray-200 rounded overflow-hidden h-8'>
                    <button
                      onClick={() =>
                        setCount((prev) => (prev <= 1 ? 1 : prev - 1))
                      }
                      className='w-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600'
                      disabled={isOutOfStock}
                    >
                      <FaMinus size={10} />
                    </button>
                    <div className='w-8 flex items-center justify-center bg-white text-sm'>
                      {count}
                    </div>
                    <button
                      onClick={() => setCount((prev) => prev + 1)}
                      className='w-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600'
                      disabled={isOutOfStock}
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>
                  <Button
                    type='dashed'
                    onClick={handleAddToCart}
                    className='flex-grow h-8 bg-green-600 hover:bg-green-700 border-none text-sm'
                    disabled={isOutOfStock}
                  >
                    {t("addToCart")}
                  </Button>
                </div>
              ) : (
                <Link href='/buy-now' className='block'>
                  <Button
                    type='dashed'
                    className='w-full bg-green-700 hover:bg-green-800 flex items-center justify-center h-8 text-sm'
                  >
                    <span className='mr-1'>{t("viewCart")}</span>{" "}
                    <FaArrowRight size={10} />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </Badge.Ribbon>
  );
}
