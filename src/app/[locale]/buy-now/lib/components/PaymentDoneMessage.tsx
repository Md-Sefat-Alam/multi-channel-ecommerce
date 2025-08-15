"use client";
import { Link } from "@/MUST_USE_Navigation";
import { HomeOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Button, Result, Tag } from "antd";
import React from "react";
import { FaCreditCard } from "react-icons/fa";
import { HiCash } from "react-icons/hi";
import { useTranslations } from "next-intl";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  orderUuid: string;
  paymentMethod: "COD" | "online";
};

export default function PaymentDoneMessage({
  orderUuid,
  paymentMethod,
}: Props) {
  const t = useTranslations("paymentSuccess");

  const getTitle = () => {
    return paymentMethod === "COD" ? t("codTitle") : t("onlineTitle");
  };

  const getDescription = () => {
    if (paymentMethod === "COD") {
      return (
        <div className='text-center mb-4'>
          <div className='flex justify-center items-center mb-2'>
            <HiCash className='text-2xl mr-2 text-[var(--primary)]' />
            <Tag color='#144c3b'>{t("codTag")}</Tag>
          </div>
          <div>{t("codMessage")}</div>
        </div>
      );
    } else {
      return (
        <div className='text-center mb-4'>
          <div className='flex justify-center items-center mb-2'>
            <FaCreditCard className='text-2xl mr-2 text-[var(--primary)]' />
            <Tag color='#144c3b'>{t("onlineTag")}</Tag>
          </div>
          <div>{t("onlineMessage")}</div>
        </div>
      );
    }
  };

  return (
    <div className='flex flex-col items-center py-8'>
      <Result
        status='success'
        title={getTitle()}
        subTitle={`${t("orderId")}: ${orderUuid || "N/A"}`}
        extra={[
          <Link href='/' key='home'>
            <Button
              type='primary'
              icon={<HomeOutlined />}
              className='bg-[var(--primary)] hover:bg-[var(--primary)]'
            >
              {t("continueShopping")}
            </Button>
          </Link>,
          <Link href='/profile/my-orders' key='orders'>
            <Button icon={<ShoppingOutlined />}>{t("viewOrders")}</Button>
          </Link>,
        ]}
      />
      <div className='max-w-lg w-full mt-4'>{getDescription()}</div>
    </div>
  );
}
