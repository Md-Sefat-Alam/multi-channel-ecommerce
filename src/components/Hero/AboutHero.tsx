"use client";
import React, { ReactNode, useState } from "react";
import { Button, Drawer, theme } from "antd";
import { FaExclamation } from "react-icons/fa6";
import AboutCard from "./AboutCard";
import Sider from "antd/es/layout/Sider";
import { ISliderData } from "@/types/hero";
import classNames from "classnames";

type Props = { children: ReactNode; item: ISliderData };

export default function AboutHero({ children, item }: Props) {
  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    background: token.colorFillAlter,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  return (
    <div style={{}}>
      {children}
      <div
        className={classNames({
          hidden: !item?.products?.length,
        })}
        style={{}}
      >
        <button
          className='absolute top-4 right-4 border-2 border-[--primary] text-[--primary] transition-all rounded-full border-dashed p-2 text-xl shadow-xl'
          onClick={showDrawer}
        >
          <FaExclamation />
        </button>
      </div>
      <Drawer
        title={false}
        placement='right'
        closable={false}
        onClose={onClose}
        open={open}
        getContainer={false}
        className=''
        styles={{
          body: {
            scrollbarWidth: "thin",
            scrollbarColor: "lightgray transparent",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          },
        }}
      >
        {item?.products?.length ? (
          item?.products.map((product) => {
            return <AboutCard product={product} />;
          })
        ) : (
          <></>
        )}
      </Drawer>
    </div>
  );
}
