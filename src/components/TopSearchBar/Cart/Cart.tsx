"use client";
import TK from "@/components/common/TK";
import { clearCart, removeFromCart } from "@/lib/features/cart/cartSlice";
import { RootState } from "@/lib/store";
import { Link } from "@/MUST_USE_Navigation";
import getUrl from "@/utils/getUrl";
import { ClearOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Badge, Button, message, Popover, Tag } from "antd";
import classNames from "classnames";
import Image from "next/image";
import { FaBangladeshiTakaSign, FaStore } from "react-icons/fa6";
import { GiShoppingCart } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";

type Props = {};

export default function Cart({}: Props) {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const t = useTranslations("cart");

  console.log(cartItems);

  const cartContent = (
    <div className='min-w-[250px] flex flex-col px-1'>
      <div className='pt-2 pb-2 flex justify-center items-center flex-col gap-2'>
        {cartItems.length ? (
          cartItems.map((cart) => {
            return (
              <div className='w-full p-2 rounded select-none flex justify-between bg-[#fafafa]'>
                <div className='flex gap-2'>
                  {cart?.imageLink?.length ? (
                    <Image
                      src={getUrl({
                        path: cart.imageLink[0].path,
                      })}
                      alt={cart.name}
                      height={50}
                      width={50}
                      className={`max-lg:mx-auto object-cover rounded`}
                    />
                  ) : (
                    <></>
                  )}
                  <div className='pt-1'>
                    <h3 className='w-[150px] whitespace-nowrap overflow-hidden text-ellipsis'>
                      {cart.name}
                    </h3>

                    <Tag color='green'>
                      {t("quantity_label", { value: cart.quantity })}
                    </Tag>
                    <Tag color='green'>
                      <p className='flex gap-2 justify-center items-center'>
                        <TK value={cart.price} />
                      </p>
                    </Tag>
                  </div>
                </div>
                <CloseCircleOutlined
                  onClick={() => {
                    message.info(t("item_removed"));
                    dispatch(removeFromCart(cart.id));
                  }}
                  className='text-red-400 text-xl cursor-pointer hover:-translate-y-1 transition-all'
                />
              </div>
            );
          })
        ) : (
          <>{t("empty")}</>
        )}
      </div>
      <div className='flex justify-end'>
        <p
          className={classNames(
            "text-primary flex flex-nowrap items-center text-xl",
          )}
        >
          {totalPrice.toFixed(2)} <FaBangladeshiTakaSign />
        </p>
      </div>
      <br />
      <div className='flex justify-between '>
        <Button
          className='!justify-start'
          icon={<ClearOutlined />}
          danger
          onClick={() => {
            message.info(t("all_items_removed"));
            dispatch(clearCart());
          }}
        >
          {t("clear")}
        </Button>
        <Link href={"/buy-now"}>
          <Button className='!justify-start' icon={<FaStore />}>
            {t("proceed")}
          </Button>
        </Link>
      </div>
    </div>
  );
  return (
    <div className='flex gap-2 justify-start items-center cursor-pointer'>
      {cartItems.length ? (
        <Popover content={cartContent} trigger='click' placement='bottom'>
          <Badge count={cartItems.length}>
            <div className='border-2 border-secondary flex justify-center items-center rounded-full'>
              <GiShoppingCart
                className='text-primary m-1'
                style={{ fontSize: "32px" }}
              />
            </div>
          </Badge>
        </Popover>
      ) : (
        <Badge showZero count={"0"}>
          <div className='border-2 border-secondary flex justify-center items-center rounded-full'>
            <GiShoppingCart
              className='text-primary m-1'
              style={{ fontSize: "32px" }}
            />
          </div>
        </Badge>
      )}

      <div className='flex flex-col gap-0'>
        <small className={classNames("font-poppins", "text-secondary")}>
          {t("my_cart")}
        </small>
        <p className={classNames("text-primary flex flex-nowrap items-center")}>
          {totalPrice.toFixed(2)} <FaBangladeshiTakaSign />
        </p>
      </div>
    </div>
  );
}
