"use client";
import { Badge } from "antd";
import React, { ReactNode } from "react";

type Props = { children: ReactNode; badge: React.ReactNode };

const BadgeRibbon: React.FC<Props> = ({ children, badge }) => {
  return (
    <Badge.Ribbon
      color='var(--primary'
      className='!z-20 !mt-[20px]'
      text={badge}
    >
      {children}
    </Badge.Ribbon>
  );
};

export default BadgeRibbon;
