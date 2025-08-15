import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Card } from "antd";
import { IHeroProduct } from "@/types/hero";
import Image from "next/image";
import getUrl from "@/utils/getUrl";
import BadgeRibbon from "../common/BadgeRibbon";
import TK from "../common/TK";
import { Link } from "@/MUST_USE_Navigation";
import { MotionContainer } from "../common/MotionContainer";

const { Meta } = Card;
type Props = { product: IHeroProduct };

export default function AboutCard({ product }: Props) {
  return false ? (
    <MotionContainer>
      <Badge.Ribbon
        color='var(--secondary'
        className='!z-20 !mt-[20px]'
        text={Number(product.discount).toFixed(2) + "% OFF"}
        placement='start'
      >
        <BadgeRibbon badge={<TK value={product?.finalPrice} />}>
          <Link className='' href={`/product/${product?.uuid}`}>
            <Image
              alt='example'
              src={
                product?.images?.length
                  ? getUrl({
                      path: product?.images[0]?.path,
                    })
                  : "/assets/categories/grocery-bag.png"
              }
              className='!w-full shadow-xl rounded-xl'
              width={200}
              height={200}
              priority
            />
          </Link>
        </BadgeRibbon>
      </Badge.Ribbon>
    </MotionContainer>
  ) : (
    <MotionContainer>
      <BadgeRibbon badge={<TK value={product?.finalPrice} />}>
        <Link className='' href={`/product/${product?.uuid}`}>
          <Image
            alt='example'
            src={
              product?.images?.length
                ? getUrl({
                    path: product?.images[0]?.path,
                  })
                : "/assets/categories/grocery-bag.png"
            }
            className='!w-full shadow-xl rounded-xl'
            width={200}
            height={200}
            priority
          />
        </Link>
      </BadgeRibbon>
    </MotionContainer>
  );
}
