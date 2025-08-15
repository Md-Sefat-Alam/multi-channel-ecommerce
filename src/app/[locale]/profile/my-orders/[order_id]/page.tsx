"use client";
import getUrl from "@/utils/getUrl";
import { Divider } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import { useGetOrdersByUuidQuery } from "../lib/api/orderApi";
import { useTranslations } from "next-intl";

interface Props {
  params: { order_id: string };
}

const ViewOrders: React.FC<Props> = ({ params }) => {
  const t = useTranslations("myOrders");
  const tCommon = useTranslations("common");

  const {
    data: orders,
    isLoading,
    isFetching,
  } = useGetOrdersByUuidQuery({ uuid: params?.order_id });

  const {
    orderDate = undefined,
    mode = undefined,
    sumAssured = undefined,
    term = undefined,
    orderStatus = undefined,
    insurerId = undefined,
    remarks = undefined,
    activeStatus = undefined,
    // nominee info
    nomineeFullName = undefined,
    nomineeFullNameBn = undefined,
    nomineeMobileNumber = undefined,
    nomineeDob = undefined,
    userId = undefined,
    mailingAddress: mailingAddressTemp = undefined,

    payment = [],
    user = {},
    productDescription = {},
  } = orders?.data || {};

  const {
    paymentMode = undefined,
    transactionId = undefined,
    paymentDate = undefined,
    paidAmount = undefined,
    orderId = undefined,
    createdAt = undefined,
    createdBy = undefined,
    updatedAt = undefined,
    updatedBy = undefined,
    attachment = [],
  } = payment?.length ? payment[0] || {} : {};

  const {
    fullName = undefined,
    fullNameBn = undefined,
    mobileNumber = undefined,
    email = undefined,
  } = user || {};

  const {
    // mode=undefined,
    // term=undefined,
    uuid = undefined,
    premium = undefined,
    ageLimit = undefined,
    benefits = undefined,
    disclaimer = undefined,
    // sumAssured=undefined,
    productName = undefined,
    // productDescription=undefined,
    insurer = {},
    policyFiles = [],
  } = productDescription || {};

  const {
    insurerLogo = undefined,
    insurerName = undefined,
    insurerEmail = undefined,
    insurerThana = undefined,
    insurerMobile = undefined,
    insurerNameBn = undefined,
    insurerAddress = undefined,
    insurerCountry = undefined,
    insurerDistrict = undefined,
    insurerDivision = undefined,
    insurerPostalCode = undefined,
  } = insurer;

  console.log({ orders });
  const { postalCode, division, district, thana, address } = mailingAddressTemp
    ? JSON.parse(mailingAddressTemp)
    : ({} as any);

  return (
    <>
      <div className='flex-1 bg-gray-50 rounded-lg p-6 flex flex-col gap-2.5 items-start w-full'>
        <div className='mb-8 w-full'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-xl font-semibold text-button'>
              {t("insurerInformation")}
            </h3>
          </div>
          <Divider className='text-button' />
          <div className='grid gap-4 font-sans text-button w-full'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <p className='text-sm text-button'>{t("insurerName")}</p>
              <p className='font-medium text-gray-600'>
                {insurerName || tCommon("noData")}
              </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <p className='text-sm '>{t("insurerEmail")}</p>
              <p className='font-medium text-gray-600'>
                {insurerEmail || tCommon("noData")}
              </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <p className='text-sm text-button'>{t("insurerMobile")}</p>
              <p className='font-medium text-gray-600'>
                {insurerMobile || tCommon("noData")}
              </p>
            </div>
          </div>
        </div>
        {/* ======================= End Insurer Information ====================== */}
        <div className='mb-8 w-full'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-xl font-semibold text-button'>
              {t("orderInformation")}
            </h3>
          </div>
          <Divider className='text-button' />
          <div className='grid gap-4 font-sans text-button w-full'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <p className='text-sm text-button'>{t("productName")}</p>
              <p className='font-medium text-gray-600'>
                {productName || tCommon("noData")}
              </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <p className='text-sm '>{t("sumAssured")}</p>
              <p className='font-medium text-gray-600'>
                {sumAssured || tCommon("noData")}
              </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <p className='text-sm text-button'>{t("premium")}</p>
              <p className='font-medium text-gray-600'>
                {premium || tCommon("noData")}
              </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <p className='text-sm text-button'>{t("term")}</p>
              <p className='font-medium text-gray-600'>
                {term || tCommon("noData")}
              </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <p className='text-sm text-button'>{t("mode")}</p>
              <p className='font-medium text-gray-600'>
                {mode || tCommon("noData")}
              </p>
            </div>
          </div>
        </div>
        {/* =================== End Order Information ======================== */}
        <div className='w-full mb-8'>
          <h3 className='text-xl font-semibold text-button mb-4'>
            {t("userInfo")}
          </h3>
          <Divider />
          <div className='grid gap-4 font-sans text-button w-full'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <p className='text-sm text-button'>{t("fullName")}</p>
              <p className='font-medium text-gray-600'>
                {fullName || tCommon("noData")}
              </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <p className='text-sm '>{t("email")}</p>
              <p className='font-medium text-gray-600'>
                {email || tCommon("noData")}
              </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <p className='text-sm text-button'>{t("mobileNumber")}</p>
              <p className='font-medium text-gray-600'>
                {mobileNumber || tCommon("noData")}
              </p>
            </div>
          </div>
        </div>
        {/* ====================== End User Info ====================== */}
        <div className='w-full'>
          <h3 className='text-xl font-semibold text-button mb-4'>
            {t("nomineeInfo")}
          </h3>
          <Divider />
          <div className='grid gap-4 font-sans text-button w-full'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <p className='text-sm text-button'>{t("nomineeFullName")}</p>
              <p className='font-medium text-gray-600'>
                {nomineeFullName || tCommon("noData")}
              </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <p className='text-sm '>{t("sumAssured")}</p>
              <p className='font-medium text-gray-600'>
                {sumAssured || tCommon("noData")}
              </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <p className='text-sm text-button'>{t("mobileNumber")}</p>
              <p className='font-medium text-gray-600'>
                {nomineeMobileNumber || tCommon("noData")}
              </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <p className='text-sm text-button'>{t("dateOfBirth")}</p>
              <p className='font-medium text-gray-600'>
                {nomineeDob
                  ? dayjs(nomineeDob).format("DD.MM.YYYY")
                  : tCommon("noData")}
              </p>
            </div>
          </div>
        </div>
        {/* ====================== End Nominee Info ====================== */}

        <div className='my-8 w-full'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-xl font-semibold text-button'>
              {t("paymentInformation")}
            </h3>
          </div>
          <Divider className='text-button' />
          {paymentDate ? (
            <div className='grid gap-4 font-sans text-button w-full'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <p className='text-sm text-button'>{t("paymentDate")}</p>
                <p className='font-medium text-gray-600'>
                  {paymentDate ? dayjs(paymentDate).format("DD.MM.YYYY") : null}
                </p>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <p className='text-sm '>{t("paymentMode")}</p>
                <p className='font-medium text-gray-600'>
                  {paymentMode || tCommon("noData")}
                </p>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <p className='text-sm text-button'>{t("paidAmount")}</p>
                <p className='font-medium text-gray-600'>
                  {paidAmount} {t("bdt")}
                </p>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <p className='text-sm text-button'>{t("attachment")}</p>
                <p className='font-medium text-gray-600'>
                  {attachment.length ? (
                    <Image
                      alt='attachment'
                      src={getUrl({ path: attachment[0].path })}
                      width={100}
                      height={400}
                    />
                  ) : (
                    tCommon("noData")
                  )}
                </p>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <p className='text-sm text-button'>{t("remarks")}</p>
                <p className='font-medium text-gray-600'>
                  {remarks || tCommon("noData")}
                </p>
              </div>
            </div>
          ) : (
            <div className='text-xl py-5 text-center'>{t("noPaymentData")}</div>
          )}
        </div>
        {/* ====================== End Payment Info ====================== */}
        <div className='mb-8 w-full'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-xl font-semibold text-button'>
              {t("mailingAddress")}
            </h3>
          </div>
          <Divider className='text-button' />
          <div className='grid gap-4 font-sans text-button w-full'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <p className='text-sm text-button'>{t("postalCode")}</p>
              <p className='font-medium text-gray-600'>
                {postalCode || tCommon("noData")}
              </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <p className='text-sm '>{t("division")}</p>
              <p className='font-medium text-gray-600'>
                {division || tCommon("noData")}
              </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <p className='text-sm text-button'>{t("district")}</p>
              <p className='font-medium text-gray-600'>
                {district || tCommon("noData")}
              </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <p className='text-sm text-button'>{t("thana")}</p>
              <p className='font-medium text-gray-600'>
                {thana || tCommon("noData")}
              </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <p className='text-sm text-button'>{t("address")}</p>
              <p className='font-medium text-gray-600'>
                {address || tCommon("noData")}
              </p>
            </div>
          </div>
        </div>
        {/* ====================== End Mailing Info ====================== */}
      </div>
    </>
  );
};

export default ViewOrders;
