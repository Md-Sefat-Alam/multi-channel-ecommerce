"use client";
import Defaults from "@/constant/Defaults";
import { InputCommonProps } from "@/types/common";
import { Col, Form, Select } from "antd";
import { NamePath } from "antd/es/form/interface";
const { Item } = Form;
const { Option } = Select;

interface Props<T> extends InputCommonProps<T> {
  defaultValue?: string | number;
  values: { title: string; value: string }[];
  loading?: boolean;
  showSearch?: boolean;
  allowClear?: boolean;
  virtual?: boolean;
}

export default function InSelect<T>({
  name,
  bPoint,
  label,
  placeholder,
  rules,
  defaultValue,
  values,
  size,
  readOnly,
  disabled,
  loading,
  onChange,
  showSearch = true,
  allowClear,
  virtual = false,
}: Props<T>) {
  return (
    <Col
      xs={bPoint?.xs || 24}
      sm={bPoint?.sm || bPoint?.xs || 12}
      md={bPoint?.md || bPoint?.xs || bPoint?.sm || 12}
      lg={bPoint?.lg || bPoint?.xs || bPoint?.sm || bPoint?.md || 6}
      xl={
        bPoint?.xl || bPoint?.xs || bPoint?.sm || bPoint?.md || bPoint?.lg || 6
      }
      xxl={
        bPoint?.xxl || bPoint?.xs || bPoint?.sm || bPoint?.md || bPoint?.lg || 6
      }
    >
      <Item<T> name={name as NamePath} label={label} rules={rules}>
        <Select
          size={size || Defaults.inputFields}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled || readOnly}
          loading={loading}
          onChange={onChange}
          optionFilterProp='label'
          options={values?.map((item) => ({
            value: item.value,
            label: item.title,
          }))}
          // showSearch={showSearch}
          // allowClear={allowClear}
          showSearch
          allowClear
          virtual={virtual}
        />
      </Item>
    </Col>
  );
}
