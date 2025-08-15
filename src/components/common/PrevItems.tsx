"use client";
import { Col, Form } from "antd";
import { ReactNode } from "react";
const { Item } = Form;

interface Props {
  bPoint?: BreakPoints;
  value: string | ReactNode;
  label: string | ReactNode;
}

export default function PrevItems({ bPoint, label, value }: Props) {
  return (
    <Col
      xs={bPoint?.xs || 24}
      sm={bPoint?.sm || bPoint?.xs || 12}
      md={bPoint?.md || bPoint?.xs || bPoint?.sm || 12}
      lg={bPoint?.lg || bPoint?.xs || bPoint?.sm || bPoint?.md || 6}
      xl={
        bPoint?.xl || bPoint?.xs || bPoint?.sm || bPoint?.md || bPoint?.lg || 6
      }
      xxl={
        bPoint?.xxl || bPoint?.xs || bPoint?.sm || bPoint?.md || bPoint?.lg || 6
      }
    >
      <div className='flex flex-col gap-2'>
        <p className='text-secondary font-openSans'>{label}</p>
        <p className='font-openSans'>{value}</p>
      </div>
    </Col>
  );
}
