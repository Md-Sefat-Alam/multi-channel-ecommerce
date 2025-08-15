import { useGetThanaQuery } from "@/lib/api/apiSlice";
import { NamePath } from "antd/es/form/interface";
import InSelect from "../FormItems/InSelect";
import { InputCommonProps } from "@/types/common";

interface Props<T> extends InputCommonProps<T> {
  validate?: NamePath[];
  district?: string;
  virtual?: boolean;
}

export default function SelectThana({
  name,
  readOnly,
  disabled,
  validate,
  rules,
  form,
  label,
  placeholder,
  district,
  virtual,
  bPoint,
}: Props<any>) {
  const {
    data: thana,
    isLoading,
    isFetching,
  } = useGetThanaQuery({
    start: 0,
    length: 1000,
    filters: { districtId: district || undefined } as any,
  });

  return (
    <InSelect
      name={name}
      values={
        thana?.data?.map((item) => ({
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
      virtual={false}
      bPoint={bPoint}
    />
  );
}
