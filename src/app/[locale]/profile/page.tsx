"use client";
import { Button, Col, Divider, Form, message, Row } from "antd";
import { BiPencil } from "react-icons/bi";
import dayjs from "dayjs";
import Image from "next/image";
import getUrl from "@/utils/getUrl";
import { useEffect, useState } from "react";
import InText from "@/components/common/FormItems/InText";
import { rule_numeric, rule_required } from "@/utils/rules/formRules";
import InDatePicker from "@/components/common/FormItems/InDatePicker";
import classNames from "classnames";
import AutoFillEditUserForm from "./lib/components/AutoFillEditUserForm";
import CombineSubmitButton from "@/components/common/FormItems/CombineSumbitButton";
import makeFormData from "@/utils/makeFormData";
import InTextArea from "@/components/common/FormItems/InTextArea";
import { useAuth } from "@/context/AuthContext";
import { useMessageGroup } from "@/context/MessageGroup";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../(Auth)/login/lib/api/loginApi";
import { IUserUpdate } from "../(Auth)/login/lib/types/loginTypes";
import InNID from "@/components/common/FormItems/InNID";
import { NidBack, NidFront } from "@/components/common/SVG/Icons";
import { useTranslations } from "next-intl";

export default function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useAuth();
  const [form] = Form.useForm<any>();
  const { notify } = useMessageGroup();
  const t = useTranslations("profile");
  const tCommon = useTranslations("common");

  const [
    updateUser,
    {
      isError: userIsError,
      isLoading: userIsLoading,
      isSuccess: userIsSuccess,
      error: userError,
      data: userUpdatedData,
    },
  ] = useUpdateUserMutation();
  const uuid = user?.uuid || "";
  const { data: userData, isLoading } = useGetUserQuery({ uuid: uuid });
  const {
    userRole = undefined,
    fullName = undefined,
    fullNameBn = undefined,
    mobileNumber = undefined,
    email = undefined,
    nationalID = undefined,
    gender = undefined,
    dob = undefined,
    division = undefined,
    district = undefined,
    thana = undefined,
    postalCode = undefined,
    address = undefined,
    activeStatus = undefined,
  } = user || {};

  useEffect(() => {
    notify({
      isError: userIsError,
      isLoading: userIsLoading || userIsLoading,
      isSuccess: userIsSuccess,
      key: "updatedUser",
      error: userError,
      success_content: t("messages.userUpdatedSuccessfully"),
    });
    if (userIsSuccess) {
      form.resetFields();
      // setUpdatedData(userUpdatedData?.data);
      setIsEdit(false);
    }
  }, [userIsError, userIsLoading, userIsSuccess, userIsLoading, t]);

  const onFinish = (data: any) => {
    message.info(t("messages.featureUnderDevelopment"));
    return;
    if (user?.uuid) {
      const userInfo: IUserUpdate = {
        uuid: user?.uuid,
        fullName: data?.fullName || undefined,
        mobileNumber: String(data?.mobileNumber) || undefined,
        nationalID: String(data?.nationalID) || undefined,
        email: data?.email || undefined,
        dob: data?.dob ? dayjs(data.dob).toISOString() : undefined,
        gender: data?.gender || undefined,
        postalCode: data?.postalCode || undefined,
        division: data?.division || undefined,
        district: data?.district || undefined,
        thana: data?.thana || undefined,
        address: data?.address || undefined,
        nidImageFront: data?.nidImageFront || undefined,
        nidImageBack: data?.nidImageBack || undefined,
      };
      // If you not remove images fields it's will get empty string
      if (!userInfo?.nidImageFront) {
        delete userInfo?.nidImageFront;
      }
      if (!userInfo?.nidImageBack) {
        delete userInfo?.nidImageBack;
      }
      // const formData = makeFormData(userInfo, true);
      const formData = makeFormData(userInfo);
      updateUser(formData);
    } else {
      message.error(t("messages.userNotFound"));
    }
  };

  return (
    <>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        onFinishFailed={(value: any) => {
          const errorCount = value?.errorFields?.length;
          const fieldsText =
            errorCount > 1
              ? t("messages.fieldsNotFoundPlural")
              : t("messages.fieldsNotFound");
          message.error(`${errorCount} ${fieldsText}`);
        }}
        initialValues={{}}
        style={{ maxWidth: "100%" }}
      >
        {/* {isEdit ? (
          <>
            <InImageWithCrop name={["profileImg"]} />
          </>
        ) : (
          <></>
        )} */}
        {isEdit ? (
          <AutoFillEditUserForm form={form} userData={userData} />
        ) : (
          <></>
        )}
        <div className='flex flex-col gap-2.5 items-start w-full'>
          <div className='mb-8 w-full'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-xl font-semibold text-button'>
                {t("generalInfo")}
              </h3>
              <Button
                onClick={() => {
                  setIsEdit((prev) => !prev);
                }}
                type={isEdit ? "primary" : "text"}
                className='text-blue-600 hover:text-blue-800'
              >
                <BiPencil className='w-5 h-5' />
              </Button>
            </div>
            <Divider className='text-button' />
            <div className='flex gap-[5px] flex-col font-sans text-primary w-full'>
              <DivPair>
                <p className='text-sm text-button'>{t("fullNameEnglish")}</p>
                <p className='font-medium text-gray-600'>
                  {isEdit ? (
                    <InText
                      bPoint={{ xs: 24 }}
                      size='middle'
                      name={["fullName"]}
                      placeholder={t("placeholders.fullName")}
                      rules={[rule_required()]}
                    />
                  ) : (
                    fullName
                  )}
                </p>
              </DivPair>
              <DivPair>
                <p className='text-sm '>{t("mobileNumber")}</p>
                <p className='font-medium text-gray-600'>
                  {isEdit ? (
                    <InText
                      bPoint={{ xs: 24 }}
                      size='middle'
                      name={["mobileNumber"]}
                      rules={[rule_numeric(), rule_required()]}
                      placeholder={t("placeholders.mobileNumber")}
                    />
                  ) : (
                    mobileNumber
                  )}
                </p>
              </DivPair>
              <DivPair>
                <p className='text-sm text-button'>{t("nationalId")}</p>
                <p className='font-medium text-gray-600'>
                  {isEdit ? (
                    <InText
                      bPoint={{ xs: 24 }}
                      size='middle'
                      name={["nationalID"]}
                      rules={[rule_numeric(), rule_required()]}
                      placeholder={t("placeholders.nationalId")}
                    />
                  ) : (
                    nationalID
                  )}
                </p>
              </DivPair>
              <DivPair>
                <p className='text-sm text-button'>{t("email")}</p>
                <p className='font-medium text-gray-600'>
                  {isEdit ? (
                    <InText
                      bPoint={{ xs: 24 }}
                      size='middle'
                      name={["email"]}
                      placeholder={t("placeholders.email")}
                      type='email'
                      rules={[rule_required()]}
                    />
                  ) : (
                    email
                  )}
                </p>
              </DivPair>
              <DivPair>
                <p className='text-sm text-button'>{t("dateOfBirth")}</p>
                <p className='font-medium text-gray-600'>
                  {isEdit ? (
                    <InDatePicker
                      bPoint={{ xs: 24 }}
                      size='middle'
                      name={["dob"]}
                      placeholder={t("placeholders.dateOfBirth")}
                      rules={[rule_required()]}
                    />
                  ) : dob ? (
                    dayjs(dob).format("DD-MM-YYYY")
                  ) : (
                    ""
                  )}
                </p>
              </DivPair>
              <DivPair>
                <p className='text-sm text-button'>{t("gender")}</p>
                <p className='font-medium text-gray-600'>
                  {isEdit ? (
                    <InText
                      bPoint={{ xs: 24 }}
                      size='middle'
                      name={["gender"]}
                      placeholder={t("placeholders.gender")}
                      rules={[rule_required()]}
                    />
                  ) : (
                    gender
                  )}
                </p>
              </DivPair>
            </div>
          </div>
          <div className='w-full'>
            <h3 className='text-xl font-semibold text-primary mb-4'>
              {t("deliverAddress")}
            </h3>
            <Divider />
            <div className='grid gap-4'>
              <DivPair>
                <p className='text-sm text-button'>{t("postCode")}</p>
                <p className='font-medium text-gray-600'>
                  {isEdit ? (
                    <InText
                      bPoint={{ xs: 24 }}
                      size='middle'
                      name={["postalCode"]}
                      rules={[rule_numeric()]}
                      placeholder={t("placeholders.postCode")}
                    />
                  ) : (
                    postalCode || tCommon("noData")
                  )}
                </p>
              </DivPair>
              <DivPair>
                <p className='text-sm text-button'>{t("division")}</p>
                <p className='font-medium text-gray-600'>
                  {isEdit ? (
                    <InText
                      bPoint={{ xs: 24 }}
                      size='middle'
                      name={["division"]}
                      placeholder={t("placeholders.division")}
                    />
                  ) : (
                    division || tCommon("noData")
                  )}
                </p>
              </DivPair>
              <DivPair>
                <p className='text-sm text-button'>{t("district")}</p>
                <p className='font-medium text-gray-600'>
                  {isEdit ? (
                    <InText
                      bPoint={{ xs: 24 }}
                      size='middle'
                      name={["district"]}
                      placeholder={t("placeholders.district")}
                    />
                  ) : (
                    district || tCommon("noData")
                  )}
                </p>
              </DivPair>
              <DivPair>
                <p className='text-sm text-button'>{t("thana")}</p>
                <p className='font-medium text-gray-600'>
                  {isEdit ? (
                    <InText
                      bPoint={{ xs: 24 }}
                      size='middle'
                      name={["thana"]}
                      placeholder={t("placeholders.thana")}
                    />
                  ) : (
                    thana || tCommon("noData")
                  )}
                </p>
              </DivPair>
              {/* <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <p className='text-sm text-button'>Sub Office</p>
                            <p className='font-medium text-gray-600'>-</p>
                        </div> */}
              <DivPair>
                <p className='text-sm text-button'>{t("address")}</p>
                <p className='font-medium text-gray-600'>
                  {isEdit ? (
                    <InTextArea
                      bPoint={{ xs: 24 }}
                      size='middle'
                      name={["address"]}
                      placeholder={t("placeholders.address")}
                      rows={3}
                    />
                  ) : (
                    address || tCommon("noData")
                  )}
                </p>
              </DivPair>
            </div>
          </div>
        </div>
        {isEdit ? (
          <CombineSubmitButton
            form={form}
            isLoading={false}
            submitBtnTitle={tCommon("update")}
          />
        ) : (
          <></>
        )}
      </Form>
    </>
  );
}

const DivPair: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>{children}</div>
  );
};
