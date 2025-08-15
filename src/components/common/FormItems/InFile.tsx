"use client";
import Defaults from "@/constant/Defaults";
import { Col, Form, Input, Upload } from "antd";
import { NamePath } from "antd/es/form/interface";
import { PlusOutlined } from "@ant-design/icons";
import { InputCommonProps } from "@/types/common";
const { Item } = Form;

interface Props<T> extends InputCommonProps<T> {}

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

export default function InFile<T>({
    name,
    bPoint,
    label,
    placeholder,
    rules,
    size,
    readOnly,
    disabled,
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
            <Form.Item
                label={label}
                rules={rules}
                name={name as NamePath}
                valuePropName='fileList'
                getValueFromEvent={normFile}
            >
                <Upload
                    //   action="/upload.do"
                    listType='picture-card'
                    disabled={readOnly || disabled}
                >
                    <button
                        style={{ border: 0, background: "none" }}
                        type='button'
                    >
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </button>
                </Upload>
            </Form.Item>
        </Col>
    );
}
