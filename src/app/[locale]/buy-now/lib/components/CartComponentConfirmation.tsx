import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import getUrl from "@/utils/getUrl";
import { Button, InputNumber, Popconfirm } from "antd";
import Image from "next/image";
import React from "react";
import { GrFormNextLink } from "react-icons/gr";

import TK from "@/components/common/TK";
import {
  CartItem,
  removeFromCart,
  updateQuantity,
} from "@/lib/features/cart/cartSlice";
import type { TableProps } from "antd";
import { Table } from "antd";
import { IoMdCloseCircle } from "react-icons/io";

interface DataType extends CartItem {}

type Props = {};

export default function CartComponentConfirmation({}: Props) {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Image",
      dataIndex: "image",
      key: "id",
      render: (_, { imageLink, name }) => {
        return imageLink?.length ? (
          <Image
            src={getUrl({
              path: imageLink[0].path,
            })}
            alt={name}
            height={50}
            width={50}
            className={`max-lg:mx-auto object-cover rounded`}
          />
        ) : (
          <></>
        );
      },
    },
    {
      title: "Product",
      dataIndex: "name",
      key: "id",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "id",
    },
    {
      title: "Quantity",
      key: "quantity",
      dataIndex: "quantity",
      render: (_, { quantity, id }) => (
        <>
          <InputNumber
            min={1}
            value={quantity}
            onChange={(value) => {
              if (value && value > 1) {
                dispatch(updateQuantity({ id, quantity: value }));
              }
            }}
          />
        </>
      ),
      width: "80px",
    },
    {
      title: "Total",
      dataIndex: "price",
      render: (_, { quantity, price }) => <TK value={quantity * price} />,
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <div className='flex justify-center items-center'>
    //       <Popconfirm
    //         title='Delete the cart item'
    //         description='Are you sure you want to delete this cart item?'
    //         onConfirm={() => {
    //           dispatch(removeFromCart(record.id));
    //         }}
    //         okText='Yes'
    //         cancelText='No'
    //       >
    //         <IoMdCloseCircle className='text-red-400 text-2xl cursor-pointer hover:text-red-500' />
    //       </Popconfirm>
    //     </div>
    //   ),
    //   width: "50px",
    // },
  ];

  return (
    <div>
      <Table<DataType>
        size='small'
        columns={columns}
        dataSource={cart.items || []}
        pagination={false}
        footer={(data) => {
          return (
            <div className='flex justify-center items-baseline gap-2 text-2xl text-primary'>
              <span className='text-lg'>Total:</span>{" "}
              <TK value={cart.totalPrice} />
            </div>
          );
        }}
      />
    </div>
  );
}
