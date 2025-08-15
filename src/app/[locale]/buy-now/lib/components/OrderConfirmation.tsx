"use client";

import { Button, Form, FormInstance, message } from "antd";
import React from "react";
import { GrFormNextLink } from "react-icons/gr";
import { IoMdArrowBack } from "react-icons/io";
import { PiStorefrontFill } from "react-icons/pi";
import CartComponentConfirmation from "./CartComponentConfirmation";
import BuyNowFormView from "./BuyNowFormView";
import Title from "@/components/common/Title";
import { useTranslations } from "next-intl";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  form: FormInstance<any>;
  onFinish: () => void;
};

export default function OrderConfirmation({ setStep, form, onFinish }: Props) {
  const t = useTranslations("orderConfirmation");

  return (
    <div>
      <div>
        <Form
          form={form}
          layout='vertical'
          onFinish={onFinish}
          onFinishFailed={({ errorFields }) => {
            message.error(`${errorFields?.length} ${t("fieldsNotFound")}`);
          }}
          initialValues={{
            quantity: 1,
            paymentMethod: "credit-card",
          }}
          disabled
        >
          <BuyNowFormView form={form} />
        </Form>
      </div>

      <Title title={t("yourCart")} />
      <CartComponentConfirmation />

      <div className='flex gap-4 justify-end pb-[40px]'>
        <Button
          onClick={() => {
            setStep((prev) => prev - 1);
            window.scrollTo(0, 150);
          }}
          size='large'
        >
          {t("previous")} <IoMdArrowBack />
        </Button>
        <Button
          onClick={onFinish}
          size='large'
          type='primary'
          className='bg-[var(--primary)] hover:bg-[var(--primary)]'
        >
          {t("confirm")} <PiStorefrontFill />
        </Button>
      </div>
    </div>
  );
}
