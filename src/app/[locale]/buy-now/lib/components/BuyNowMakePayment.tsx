"use client";
import { Button, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { IoMdArrowBack } from "react-icons/io";
import { usePaymentMutation } from "../api/buyNowApi";
import { useMessageGroup } from "@/context/MessageGroup";
import { useLocale } from "next-intl";
import { useRouter } from "@/MUST_USE_Navigation";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  orderUuid: string;
};

export default function BuyNowMakePayment({ setStep, orderUuid }: Props) {
  const [isLoading, setIsLoading] = useState();
  const [isPaymentPage, setIsPaymentPage] = useState(false);
  const { notify } = useMessageGroup();
  const router = useRouter();
  const locale = useLocale();

  const [
    payment,
    {
      isLoading: paymentIsLoading,
      isError: paymentIsError,
      isSuccess: paymentIsSuccess,
      data: paymentData,
      error: paymentError,
    },
  ] = usePaymentMutation();

  // useEffect(() => {
  //   notify({
  //     isError: paymentIsError,
  //     isLoading: paymentIsLoading,
  //     isSuccess: paymentIsSuccess,
  //     key: "Create_payment",
  //     error: paymentError,
  //     success_content: "Payment created successfully!",
  //   });
  //   if (!paymentIsLoading && paymentIsSuccess) {
  //     if (paymentData?.data?.uuid) {
  //       setStep((prev) => prev + 1);
  //       window.scrollTo(0, 150);
  //     } else {
  //       message.error("paymentId missing!");
  //     }
  //   }
  // }, [paymentIsError, paymentIsSuccess, paymentIsLoading, paymentError]);

  useEffect(() => {
    if (!isPaymentPage) {
      payment({ orderId: orderUuid, locale: locale });
      setIsPaymentPage(true);
    }
    if (paymentIsSuccess && paymentData.data?.redirectUrl) {
      window.location.href = paymentData.data?.redirectUrl;
    }
  }, [paymentIsSuccess]);

  return (
    <div>
      <div className='h-[50vh] flex justify-center items-center'>
        <Spin size='large' />
      </div>
      <div className='flex gap-4 justify-end'>
        {/* <Button
          onClick={() => {
            setStep((prev) => prev + 1);
            window.scrollTo(0, 150);
          }}
          size='large'
        >
          Payment <GrFormNextLink />
        </Button> */}
      </div>
    </div>
  );
}
