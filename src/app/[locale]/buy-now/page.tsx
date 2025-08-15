"use client";
import Title from "@/components/common/Title";
import withAuth from "@/components/common/withAuth";
import { useAuth } from "@/context/AuthContext";
import { useMessageGroup } from "@/context/MessageGroup";
import { clearCart } from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "@/MUST_USE_Navigation";
import { SmileOutlined } from "@ant-design/icons";
import { Form, message, Steps } from "antd";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdPayments } from "react-icons/md";
import { PiStorefrontFill } from "react-icons/pi";
import { useOrderMutation } from "./lib/api/buyNowApi";
import BuyNowAddress from "./lib/components/BuyNowAddress";
import BuyNowMakePayment from "./lib/components/BuyNowMakePayment";
import CartComponent from "./lib/components/CartComponent";
import OrderConfirmation from "./lib/components/OrderConfirmation";
import PaymentDoneMessage from "./lib/components/PaymentDoneMessage";
import { IOrder } from "./lib/types/buyNowTypes";
import { useTranslations } from "next-intl";

const BuyNow: React.FC = () => {
  const t = useTranslations("checkout");
  const [form] = Form.useForm();
  const [step, setStep] = useState(0);
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { notify } = useMessageGroup();
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "online">("COD");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const [
    create,
    {
      isLoading: orderIsLoading,
      isError: orderIsError,
      isSuccess: orderIsSuccess,
      data: orderData,
      error: orderError,
    },
  ] = useOrderMutation();

  const onFinish = () => {
    const values = form.getFieldsValue();
    const postData: IOrder = {
      userId: user?.uuid || "",
      totalAmount: cart.totalPrice,
      paymentMethod: values?.paymentMethod || "COD",
      address: {
        divisionId: values?.division,
        districtId: values?.district,
        thanaId: values?.thana,
        postalCode: values?.postalCode,
        addressLine: values?.address,
      },
      items: cart?.items.map((item) => ({
        productId: item?.id,
        quantity: item?.quantity,
        price: item?.price,
      })),
      remarks: values?.remarks,
    };
    create(postData);
  };

  useEffect(() => {
    notify({
      isError: orderIsError,
      isLoading: orderIsLoading,
      isSuccess: orderIsSuccess,
      key: "Create_Order",
      error: orderError,
      success_content: t("orderSuccess"),
    });

    if (!orderIsLoading && orderIsSuccess) {
      if (orderData?.data?.uuid) {
        const values = form.getFieldsValue();
        if (values?.paymentMethod === "COD") {
          setStep(4);
        } else {
          setStep(3);
        }
        dispatch(clearCart());
        window.scrollTo(0, 150);
      } else {
        message.error(t("missingOrderId"));
      }
    }
  }, [orderIsError, orderIsSuccess, orderIsLoading, orderError]);

  useEffect(() => {
    setIsLoading(true);
    const query = new URLSearchParams(window.location.search);
    const status = query.get("status");
    const tran_id = query.get("tran_id");

    if (!status && !tran_id) {
      setIsLoading(false);
    }

    if (!status && !tran_id && !cart.items?.length) {
      message.error(t("noCartItem"));
      setIsLoading(false);
      router.push("/");
    }

    if (isLoading && status && tran_id) {
      if (status === "SUCCESS" && tran_id) {
        message.success(t("paymentSuccess"));
        setStep(4);
        setIsLoading(false);
      } else if (status === "FAILED") {
        message.error(t("paymentFailed"));
        setIsLoading(false);
        router.push("/");
      } else if (status === "CANCELLED") {
        message.error(t("paymentCancelled"));
        setIsLoading(false);
        router.push("/");
      } else {
        message.error(t("paymentFailed"));
        setIsLoading(false);
        router.push("/");
      }
    }
  }, []);

  if (isLoading) {
    return (
      <div className='min-h-screen flex justify-center items-center bg-transparent'>
        <CgSpinner className='animate-spin text-5xl text-[#144c3b] font-bold' />
      </div>
    );
  }

  return (
    <section>
      <Title title={t("title")} />
      <div className='container mx-auto py-6'>
        <Steps
          current={step}
          items={[
            {
              title: t("steps.cart"),
              icon: <FaShoppingCart />,
              description: t("desc.cart"),
            },
            {
              title: t("steps.address"),
              icon: <FaLocationDot />,
              description: t("desc.address"),
            },
            {
              title: t("steps.order"),
              icon: <PiStorefrontFill />,
              description: t("desc.order"),
            },
            {
              title: t("steps.payment"),
              icon: <MdPayments />,
              description: t("desc.payment"),
            },
            {
              title: t("steps.done"),
              icon: <SmileOutlined />,
              description: t("desc.done"),
            },
          ]}
          className='custom-steps'
          progressDot={false}
          style={{ color: "var(--primary)", marginBottom: "2rem" }}
        />
      </div>
      <section className='mt-2 min-h-screen bg-[#fafafa]'>
        <div className='container mx-auto py-4 px-4 md:px-0'>
          <div className='bg-white rounded-lg shadow-sm p-6'>
            {step === 0 && <CartComponent setStep={setStep} />}
            <div
              className={classNames({
                "h-auto": step === 1,
                "h-0 overflow-hidden": step !== 1,
              })}
            >
              <BuyNowAddress
                setStep={setStep}
                form={form}
                setPaymentMethod={setPaymentMethod}
              />
            </div>
            {step === 2 && (
              <OrderConfirmation
                setStep={setStep}
                form={form}
                onFinish={onFinish}
              />
            )}
            {step === 3 && (
              <BuyNowMakePayment
                setStep={setStep}
                orderUuid={orderData?.data?.uuid!}
              />
            )}
            {step === 4 && (
              <PaymentDoneMessage
                setStep={setStep}
                orderUuid={orderData?.data?.uuid!}
                paymentMethod={form.getFieldValue("paymentMethod") || "COD"}
              />
            )}
          </div>
        </div>
      </section>
    </section>
  );
};

export default withAuth(BuyNow);
