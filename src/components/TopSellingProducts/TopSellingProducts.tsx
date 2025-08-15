"use client";

import { IProduct } from "@/app/lib/types/rootTypes";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Grid, List } from "antd";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { MotionContainer } from "../common/MotionContainer";
import Title from "../common/Title";
import ProductCard from "../Products/ProductCard";

type Props = {
  products_topSelling: IRes<IProduct[]>;
};

export default function TopSellingProducts({
  products_topSelling: productData,
}: Props) {
  const [isFull, setIsFull] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const screens = Grid.useBreakpoint();
  const t = useTranslations("topSelling");

  const getInitialItems = () => {
    if (screens.xl) {
      return 10;
    } else if (screens.md) {
      return 6;
    } else if (screens.lg) {
      return 8;
    } else {
      return 4; // sm and xs
    }
  };

  const onLoadMore = () => {
    setIsTransitioning(true);
    setIsFull((prev) => {
      if (prev) {
        setTimeout(() => {
          containerRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 100);
      }
      return !prev;
    });
    setIsTransitioning(false);
  };

  const loadMore = (
    <div
      style={{
        textAlign: "center",
        marginTop: 12,
        height: 32,
        lineHeight: "32px",
      }}
    >
      <MotionContainer delay={getInitialItems() * 0.1}>
        <Button
          size='large'
          type='dashed'
          onClick={onLoadMore}
          icon={isFull ? <UpOutlined /> : <DownOutlined />}
        >
          {isFull ? t("showLess") : t("showMore")}
        </Button>
      </MotionContainer>
    </div>
  );

  return (
    <div className='py-10 overflow-hidden mx-10 sm:mx-0 bg-[#fafafa]'>
      <MotionContainer>
        <Title title={t("title")} addAfter />
      </MotionContainer>
      <div className='container mx-auto py-10' ref={containerRef}>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 5,
            xxl: 5,
          }}
          className={`transition-all duration-300 ease-in-out ${
            isTransitioning ? "opacity-50" : "opacity-100"
          }`}
          locale={{
            emptyText: (
              <MotionContainer>
                <div className='text-center'>{t("emptyText")}</div>
              </MotionContainer>
            ),
          }}
          dataSource={
            isFull
              ? productData?.data
              : productData?.data?.slice(0, getInitialItems())
          }
          loadMore={
            productData?.data?.length > getInitialItems() ? loadMore : null
          }
          split={!isFull}
          renderItem={(item, index) => (
            <List.Item>
              <MotionContainer delay={index * 0.1}>
                <ProductCard product={item} />
              </MotionContainer>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
