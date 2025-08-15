"use client";
import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const FarmersCard: React.FC = () => (
  <Card
    hoverable
    style={{ width: "100%" }}
    className=""
    cover={
      <img
        alt="example"
        src="/assets/farmers/Manik_vai_farmer.png"
      />
    }
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
);

export default FarmersCard;
