import { IUserGetType } from "@/app/[locale]/(Auth)/login/lib/types/loginTypes";
import { IUser } from "@/types/common";
import { FormInstance } from "antd";
import dayjs from "dayjs";
import { format } from "path";
import React, { useEffect } from "react";

type Props = {
  form: FormInstance<any>;
  userData: IResWithOutFilter<IUser | undefined> | undefined;
};

export default function AutoFillEditUserForm({ form, userData }: Props) {
  const {
    userRole = undefined,
    fullName = undefined,
    fullNameBn = undefined,
    mobileNumber = undefined,
    email = undefined,
    gender = undefined,
    dob = undefined,
    division = undefined,
    district = undefined,
    thana = undefined,
    postalCode = undefined,
    address = undefined,
  } = userData?.data || {};

  useEffect(() => {
    form.setFieldsValue({
      fullName: fullName || undefined,
      fullNameBn: fullNameBn || undefined,
      mobileNumber: mobileNumber || undefined,
      email: email || undefined,
      gender: gender || undefined,
      dob: (dob ? dayjs(dob) : undefined) || undefined,
      division: division || undefined,
      district: district || undefined,
      thana: thana || undefined,
      postalCode: postalCode || undefined,
      address: address || undefined,
    });
  }, [userData]);
  return <></>;
}
