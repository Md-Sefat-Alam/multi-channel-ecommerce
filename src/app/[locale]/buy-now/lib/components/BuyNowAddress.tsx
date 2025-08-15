"use client";

import { Button, Form, FormInstance, Radio, message } from "antd";
import React from "react";
import { GrFormNextLink } from "react-icons/gr";
import { IoMdArrowBack } from "react-icons/io";
import BuyFormItems from "./BuyNowForm";
import { FaCreditCard } from "react-icons/fa";
import { HiCash } from "react-icons/hi";
import { useTranslations } from "next-intl";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  form: FormInstance<any>;
  setPaymentMethod?: React.Dispatch<React.SetStateAction<"COD" | "online">>;
};

export default function BuyNowAddress({
  setStep,
  form,
  setPaymentMethod,
}: Props) {
  const t = useTranslations("buyNowCheckout");

  const onFinish = (values: any) => {
    setStep((prev) => prev + 1);
    window.scrollTo(0, 150);
    if (setPaymentMethod) {
      setPaymentMethod(values.paymentMethod);
    }
  };

  return (
    <div>
      <div>
        <Form
          form={form}
          layout='vertical'
          onFinish={onFinish}
          onFinishFailed={(values) => {
            message.error(
              `${values?.errorFields?.length} ${t("fieldsRequired")}`,
            );
          }}
          initialValues={{
            quantity: 1,
            paymentMethod: "COD",
          }}
        >
          <BuyFormItems form={form} />
          <br />
          <br />

          <Form.Item
            name='paymentMethod'
            label={t("paymentMethod")}
            rules={[{ required: true, message: t("selectPayment") }]}
          >
            <Radio.Group buttonStyle='solid' className='w-full'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Radio.Button
                  value='COD'
                  className='h-auto flex items-center !p-10'
                >
                  <div className='flex items-center -mt-6'>
                    <HiCash className='text-2xl mr-3 text-[var(--primary)]' />
                    <div>
                      <div className='font-medium'>{t("codTitle")}</div>
                      <div className='text-sm'>{t("codDesc")}</div>
                    </div>
                  </div>
                </Radio.Button>
                <Radio.Button
                  disabled
                  value='online'
                  className='h-auto flex items-center !p-10'
                >
                  <div className='flex items-center -mt-6'>
                    <FaCreditCard className='text-2xl mr-3 text-[var(--primary)]' />
                    <div>
                      <div className='font-medium'>{t("onlineTitle")}</div>
                      <div className='text-sm'>{t("onlineDesc")}</div>
                    </div>
                  </div>
                </Radio.Button>
              </div>
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
      <div className='flex gap-4 justify-end pb-[40px] mt-6'>
        <Button
          onClick={() => {
            setStep((prev) => prev - 1);
            window.scrollTo(0, 150);
          }}
          size='large'
          className='bg-gray-100 hover:bg-gray-200 text-[var(--font-dark)]'
        >
          <IoMdArrowBack className='mr-1' /> {t("previous")}
        </Button>
        <Button
          onClick={() => form.submit()}
          size='large'
          type='primary'
          className='bg-[var(--primary)] hover:bg-[var(--primary)]'
        >
          {t("next")} <GrFormNextLink className='ml-1' />
        </Button>
      </div>
    </div>
  );
}
