"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import getUrl from "@/utils/getUrl";
import { Button, Empty, InputNumber, Popconfirm, Table } from "antd";
import Image from "next/image";
import React from "react";
import { GrFormNextLink } from "react-icons/gr";
import type { TableProps } from "antd";
import {
  CartItem,
  removeFromCart,
  updateQuantity,
} from "@/lib/features/cart/cartSlice";
import TK from "@/components/common/TK";
import { IoMdCloseCircle } from "react-icons/io";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "@/MUST_USE_Navigation";
import { useTranslations } from "next-intl";

interface DataType extends CartItem {}

type Props = { setStep: React.Dispatch<React.SetStateAction<number>> };

export default function CartComponent({ setStep }: Props) {
  const t = useTranslations("buyNowCart");
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const columns: TableProps<DataType>["columns"] = [
    {
      title: t("image"),
      dataIndex: "image",
      key: "id",
      render: (_, { imageLink, name }) => {
        return imageLink?.length ? (
          <div className='flex justify-center'>
            <Image
              src={getUrl({ path: imageLink[0].path })}
              alt={name}
              height={60}
              width={60}
              className='object-cover rounded-md border border-gray-200'
            />
          </div>
        ) : (
          <div className='w-[60px] h-[60px] bg-gray-100 rounded-md flex items-center justify-center'>
            <FaShoppingBag className='text-gray-400' />
          </div>
        );
      },
      width: "100px",
      align: "center",
    },
    {
      title: t("product"),
      dataIndex: "name",
      key: "id",
      render: (text) => (
        <div className='font-medium text-[var(--font-primary)]'>{text}</div>
      ),
    },
    {
      title: t("price"),
      dataIndex: "price",
      key: "id",
      render: (price) => <TK value={price} />,
      align: "right",
    },
    {
      title: t("quantity"),
      key: "quantity",
      dataIndex: "quantity",
      render: (_, { quantity, id }) => (
        <div className='flex justify-center'>
          <InputNumber
            min={1}
            value={quantity}
            onChange={(value) => {
              if (value && value >= 1) {
                dispatch(updateQuantity({ id, quantity: value }));
              }
            }}
            className='w-20'
          />
        </div>
      ),
      width: "120px",
      align: "center",
    },
    {
      title: t("total"),
      dataIndex: "price",
      render: (_, { quantity, price }) => <TK value={quantity * price} />,
      align: "right",
    },
    {
      title: t("action"),
      key: "action",
      render: (_, record) => (
        <div className='flex justify-center items-center'>
          <Popconfirm
            title={t("removeTitle")}
            description={t("removeDesc")}
            onConfirm={() => {
              dispatch(removeFromCart(record.id));
            }}
            okText={t("yes")}
            cancelText={t("no")}
            okButtonProps={{ className: "bg-[var(--primary)]" }}
          >
            <Button
              icon={<IoMdCloseCircle className='text-lg' />}
              danger
              type='text'
              className='flex items-center justify-center'
            />
          </Popconfirm>
        </div>
      ),
      width: "80px",
      align: "center",
    },
  ];

  if (!cart.items.length) {
    return (
      <div className='py-12'>
        <Empty description={t("empty")} image={Empty.PRESENTED_IMAGE_SIMPLE} />
        <div className='flex justify-center mt-6'>
          <Link href='/'>
            <Button
              type='primary'
              className='bg-[var(--primary)] hover:bg-[var(--primary)]'
            >
              {t("continue")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='mb-6'>
        <Table<DataType>
          size='middle'
          columns={columns}
          dataSource={cart.items || []}
          pagination={false}
          footer={() => (
            <div className='flex justify-between items-center p-4 bg-[var(--primary-light)] rounded-md'>
              <div className='text-lg text-[var(--font-primary)]'>
                {t("summary")}
              </div>
              <div className='flex items-baseline gap-2 text-2xl text-[var(--primary)]'>
                <span className='text-lg'>{t("total")}:</span>{" "}
                <TK value={cart.totalPrice} />
              </div>
            </div>
          )}
          scroll={{ x: "max-content" }}
          rowKey='id'
          className='cart-table'
        />
      </div>
      <div className='flex justify-end mt-6'>
        <Button
          onClick={() => {
            setStep((prev) => prev + 1);
            window.scrollTo(0, 150);
          }}
          size='large'
          type='primary'
          className='bg-[var(--primary)] hover:bg-[var(--primary)]'
        >
          {t("proceed")} <GrFormNextLink className='ml-1' />
        </Button>
      </div>
    </div>
  );
}
