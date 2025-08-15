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

const { Meta } = Card;
type Props = { product: IHeroProduct };

export default function AboutCardMobile({ product }: Props) {
  return (
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
          className='!w-full shadow-lg rounded-xl'
          width={200}
          height={200}
          priority
        />
      </Link>
    </BadgeRibbon>
  );
}
