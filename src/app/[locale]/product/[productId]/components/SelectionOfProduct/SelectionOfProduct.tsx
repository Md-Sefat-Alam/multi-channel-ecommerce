"use client";
import { IProduct } from "@/app/lib/types/rootTypes";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { RootState } from "@/lib/store";
import { Link } from "@/MUST_USE_Navigation";
import { HeartOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { FaCartPlus, FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

type Props = { productId: string; product: IRes<IProduct[]> };

export default function SelectionOfProduct({
  productId,
  product: data,
}: Props) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [quantity, setQuantity] = React.useState(1);

  const product = data?.data[0];

  const {
    title = undefined,
    subTitle = undefined,
    description = undefined,
    price = undefined,
    originalPrice = undefined,
    discount = undefined,
    finalPrice = undefined,
    stock = undefined,
    lowStockAlert = undefined,
    restockDate = undefined,
    unitType = undefined,
    categoryId = undefined,
    activeStatus = undefined,
    createdBy = undefined,
    createdAt = undefined,
    slug = undefined,
    metaTitle = undefined,
    metaDescription = undefined,
    tags = undefined,
    variants = undefined,
    averageRating = undefined,
    images = undefined,
    category = undefined,
  } = product || {};

  const {
    categoryName = undefined,
    categoryNameBn = undefined,
    categoryDescription = undefined,
    categoryDescriptionBn = undefined,
  } = category || {};

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.uuid,
        name: product.title,
        price: product.finalPrice,
        quantity: quantity,
        imageLink: product.images,
      })
    );
  };

  return (
    <div className='flex justify-center items-center'>
      <div className='w-full max-lg:max-w-[608px] lg:pl-8 xl:pl-16 max-lg:mx-auto md:max-lg:mt-8'>
        <div className='flex items-center justify-between gap-6 mb-6'>
          <div className='text'>
            <h2 className='font-manrope font-bold text-2xl md:text-3xl leading-10 text-gray-900 mb-2'>
              {product?.title}
            </h2>
            <p className='font-normal text-sm text-gray-500'>{categoryName}</p>
          </div>
          <div className='flex gap-2'>
            <button className='group text-2xl transition-all duration-500 p-0.5 hover:text-[var(--secondary)]'>
              <ShareAltOutlined />
            </button>
            <button className='group text-2xl transition-all duration-500 p-0.5 hover:text-[var(--secondary)]'>
              <HeartOutlined />
            </button>
          </div>
        </div>

        <div className='flex flex-col min-[400px]:flex-row min-[400px]:items-center mb-8 gap-y-3'>
          <div className='flex items-baseline gap-2 '>
            <h5 className='font-manrope font-semibold text-2xl leading-9 text-gray-900 '>
              {finalPrice}
            </h5>{" "}
            BDT{" "}
            {discount ? (
              <>
                <span className='ml-3 font-semibold text-lg text-indigo-600'>
                  {discount}% off
                </span>

                <p className='px-2 line-through text-red-400'>{price} BDT</p>
              </>
            ) : null}
          </div>
          <svg
            className='mx-5 max-[400px]:hidden'
            xmlns='http://www.w3.org/2000/svg'
            width='2'
            height='36'
            viewBox='0 0 2 36'
            fill='none'
          >
            <path d='M1 0V36' stroke='#E5E7EB' />
          </svg>
          <button className='flex items-center gap-1 rounded-lg bg-amber-400 py-1.5 px-2.5 w-max'>
            <svg
              width='18'
              height='18'
              viewBox='0 0 18 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clipPath='url(#clip0_12657_16865)'>
                <path
                  d='M8.10326 2.26718C8.47008 1.52393 9.52992 1.52394 9.89674 2.26718L11.4124 5.33818C11.558 5.63332 11.8396 5.83789 12.1653 5.88522L15.5543 6.37768C16.3746 6.49686 16.7021 7.50483 16.1086 8.08337L13.6562 10.4738C13.4205 10.7035 13.313 11.0345 13.3686 11.3589L13.9475 14.7343C14.0877 15.5512 13.2302 16.1742 12.4966 15.7885L9.46534 14.1948C9.17402 14.0417 8.82598 14.0417 8.53466 14.1948L5.5034 15.7885C4.76978 16.1742 3.91235 15.5512 4.05246 14.7343L4.63137 11.3589C4.68701 11.0345 4.57946 10.7035 4.34378 10.4738L1.89144 8.08337C1.29792 7.50483 1.62543 6.49686 2.44565 6.37768L5.8347 5.88522C6.16041 5.83789 6.44197 5.63332 6.58764 5.33818L8.10326 2.26718Z'
                  fill='white'
                />
                <g clipPath='url(#clip1_12657_16865)'>
                  <path
                    d='M8.10326 2.26718C8.47008 1.52393 9.52992 1.52394 9.89674 2.26718L11.4124 5.33818C11.558 5.63332 11.8396 5.83789 12.1653 5.88522L15.5543 6.37768C16.3746 6.49686 16.7021 7.50483 16.1086 8.08337L13.6562 10.4738C13.4205 10.7035 13.313 11.0345 13.3686 11.3589L13.9475 14.7343C14.0877 15.5512 13.2302 16.1742 12.4966 15.7885L9.46534 14.1948C9.17402 14.0417 8.82598 14.0417 8.53466 14.1948L5.5034 15.7885C4.76978 16.1742 3.91235 15.5512 4.05246 14.7343L4.63137 11.3589C4.68701 11.0345 4.57946 10.7035 4.34378 10.4738L1.89144 8.08337C1.29792 7.50483 1.62543 6.49686 2.44565 6.37768L5.8347 5.88522C6.16041 5.83789 6.44197 5.63332 6.58764 5.33818L8.10326 2.26718Z'
                    fill='white'
                  />
                </g>
              </g>
              <defs>
                <clipPath id='clip0_12657_16865'>
                  <rect width='18' height='18' fill='white' />
                </clipPath>
                <clipPath id='clip1_12657_16865'>
                  <rect width='18' height='18' fill='white' />
                </clipPath>
              </defs>
            </svg>
            <span className='text-base font-medium text-white'>
              {averageRating || 1}
            </span>
          </button>
        </div>

        <div className='flex items-center flex-col min-[400px]:flex-row gap-3 mb-3 min-[400px]:mb-8'>
          <div className=' flex items-center justify-center border border-secondary rounded-full'>
            <button
              disabled={quantity <= 1}
              onClick={() => {
                setQuantity((prev) => {
                  if (prev <= 1) {
                    return prev;
                  }
                  return (prev -= 1);
                });
              }}
              className='group py-3 px-1 w-full border-r border-secondary rounded-l-full h-full flex items-center justify-center bg-white shadow-sm shadow-transparent transition-all duration-300 hover:bg-gray-50 hover:shadow-gray-300'
            >
              <FaMinus />
            </button>
            <input
              type='text'
              className='font-semibold text-gray-900 text-lg py-1 px-2 w-full min-[400px]:min-w-[75px] h-full bg-transparent placeholder:text-gray-900 text-center hover:text-indigo-600 outline-0 hover:placeholder:text-indigo-600'
              placeholder='1'
              value={quantity}
            />
            <button
              onClick={() => {
                setQuantity((prev) => {
                  // if (prev >= 100) {
                  //     return prev;
                  // }
                  return (prev += 1);
                });
              }}
              className='group py-3 px-1 w-full border-l border-secondary rounded-r-full h-full flex items-center justify-center bg-white shadow-sm shadow-transparent transition-all duration-300 hover:bg-gray-50 hover:shadow-gray-300'
            >
              <FaPlus />
            </button>
          </div>

          <Button
            disabled={
              cartItems.find((cartItems) => cartItems.id === product.uuid)?.id
                ? true
                : false
            }
            title={
              cartItems.find((cartItems) => cartItems.id === product.uuid)?.id
                ? "Already added"
                : "Add to cart"
            }
            onClick={handleAddToCart}
            type='primary'
            style={{ width: "100%", borderRadius: "20px" }}
            size='large'
          >
            <FaCartPlus />
            Add to cart
          </Button>
        </div>

        <Link
          onClick={handleAddToCart}
          href={"/buy-now"}
          className='text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-300'
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
}
