import React from "react";
import InSelect from "../FormItems/InSelect";
import { NamePath } from "antd/es/form/interface";
import { useGetDivisionQuery } from "@/lib/api/apiSlice";
import { InputCommonProps } from "@/types/common";

interface Props<T> extends InputCommonProps<T> {
  validate?: NamePath[];
}

export default function SelectDivision({
  name,
  readOnly,
  disabled,
  validate,
  rules,
  form,
  label,
  placeholder,
  onChange,
  bPoint,
}: Props<any>) {
  const {
    data: division,
    isLoading,
    isFetching,
  } = useGetDivisionQuery({
    start: 0,
    length: 1000,
  });

  return (
    <InSelect
      name={name}
      values={
        division?.data?.map((item) => ({
          title: item.nameEn,
          value: item.uuid,
        })) || []
      }
      label={label}
      placeholder={placeholder}
      loading={isLoading || isFetching}
      disabled={disabled || readOnly}
      rules={rules}
      form={form}
      onChange={onChange}
      bPoint={bPoint}
    />
  );
}
