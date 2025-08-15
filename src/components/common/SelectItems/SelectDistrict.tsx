import { useGetDistrictQuery } from "@/lib/api/apiSlice";
import { NamePath } from "antd/es/form/interface";
import InSelect from "../FormItems/InSelect";
import { InputCommonProps } from "@/types/common";

interface Props<T> extends InputCommonProps<T> {
  validate?: NamePath[];
  division?: string;
}

export default function SelectDistrict({
  name,
  readOnly,
  disabled,
  validate,
  rules,
  form,
  label,
  placeholder,
  size,
  division,
  onChange,
  bPoint,
}: Props<any>) {
  const {
    data: district,
    isLoading,
    isFetching,
  } = useGetDistrictQuery({
    start: 0,
    length: 1000,
    filters: { divisionId: division || undefined } as any,
  });

  return (
    <InSelect
      name={name}
      values={
        district?.data?.map((item) => ({
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
