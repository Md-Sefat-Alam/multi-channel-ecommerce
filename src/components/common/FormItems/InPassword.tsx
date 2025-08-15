"use client";
import Defaults from "@/constant/Defaults";
import { InputCommonProps } from "@/types/common";
import { Col, Form, Input } from "antd";
import { NamePath } from "antd/es/form/interface";
const { Item } = Form;
const { Password } = Input;

interface Props<T> extends InputCommonProps<T> {}

export default function InPassword<T>({
    name,
    bPoint,
    label,
    placeholder,
    rules,
    size,
}: Props<T>) {
    return (
        <Col
            xs={bPoint?.xs || 24}
            sm={bPoint?.sm || bPoint?.xs || 12}
            md={bPoint?.md || bPoint?.xs || bPoint?.sm || 12}
            lg={bPoint?.lg || bPoint?.xs || bPoint?.sm || bPoint?.md || 6}
            xl={
                bPoint?.xl ||
                bPoint?.xs ||
                bPoint?.sm ||
                bPoint?.md ||
                bPoint?.lg ||
                6
            }
            xxl={
                bPoint?.xxl ||
                bPoint?.xs ||
                bPoint?.sm ||
                bPoint?.md ||
                bPoint?.lg ||
                6
            }
        >
            <Item<T> name={name as NamePath} label={label} rules={rules}>
                <Password
                    size={size || Defaults.inputFields}
                    placeholder={placeholder}
                />
            </Item>
        </Col>
    );
}
