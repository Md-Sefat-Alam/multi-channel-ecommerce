import { FormInstance, Rule } from "antd/es/form";
import { NamePath } from "antd/es/form/interface";
import {
  Formats,
  MarkupTranslationValues,
  RichTranslationValues,
  TranslationValues,
} from "next-intl";
import { ReactElement, ReactNodeArray } from "react";

export interface ITrans {
  <TargetKey extends any>(
    key: TargetKey,
    values?: TranslationValues,
    formats?: Partial<Formats>
  ): string;
  rich<TargetKey extends any>(
    key: TargetKey,
    values?: RichTranslationValues,
    formats?: Partial<Formats>
  ): string | ReactElement | ReactNodeArray;
  markup<TargetKey extends any>(
    key: TargetKey,
    values?: MarkupTranslationValues,
    formats?: Partial<Formats>
  ): string;
  raw<TargetKey extends any>(key: TargetKey): any;
}

export interface InputCommonProps<T> {
  // name: NamePath | typeof T;
  name: keyof T | NamePath<T>;
  label?: string;
  rules?: Rule[];
  placeholder?: string;
  bPoint?: BreakPoints;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  size?: "large" | "middle" | "small";
  readOnly?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (event: any) => void;
  form?: FormInstance<any>;
}

export interface IUser {
  uuid: string;
  userRoleId: number;
  fullName: string;
  fullNameBn: string;
  mobileNumber: string;
  email: string;
  nationalID: null;
  gender?: string;
  dob?: string;
  activeStatus: 1 | 0;
  remarks?: string;
  createdAt: string;
  createdBy?: string;
  updatedAt: string;
  updatedBy?: string;
  userRole: IUserRole;
  division?: string;
  district?: string;
  thana?: string;
  postalCode?: string;
  address?: string;
}

export interface IUserRole {
  id: number;
  uuid: string;
  roleTitle: "CUSTOMER" | "ADMIN";
  roleTitleValue?: string;
  rolePermission: {
    placeOrders: boolean;
    viewProducts: boolean;
    writeReviews: boolean;
  };
  activeStatus: 1;
  createdAt: string;
  createdBy?: string;
  updatedAt: string;
  updatedBy?: string;
}
export interface IUserRes {
  data: IUser;
  authentication: {
    sessionId: string;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
}
