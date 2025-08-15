"use client";
import Defaults from "@/constant/Defaults";
import {
  ArrowLeftOutlined,
  ReloadOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Button, Col, FormInstance, Popconfirm, Row } from "antd";
import { useRouter } from "@/MUST_USE_Navigation";
import { ReactNode } from "react";

type Props<T> = {
  form: FormInstance<FormInstance<T>>;
  isLoading: boolean;
  submitBtnTitle?: string;
  submitButton?: ReactNode;
};

export default function CombineSubmitButton<T>({
  form,
  isLoading: loading,
  submitBtnTitle,
  submitButton,
}: Props<T>) {
  const router = useRouter();
  return (
    <Row className='mt-10'>
      <Col span={24}>
        <div className='flex justify-end flex-col sm:flex-row gap-[15px]'>
          <Button
            size={Defaults.inputFields}
            type={"dashed"}
            htmlType={"reset"}
            onClick={() => {
              router.back();
            }}
          >
            <ArrowLeftOutlined /> Go Back
          </Button>

          <Popconfirm
            title='Reset Form'
            description='Are you sure to reset this form?'
            onConfirm={() => {
              form.resetFields();
            }}
            // onCancel={cancel}
            okText='Yes'
            cancelText='No'
          >
            <Button size={Defaults.inputFields} type={"dashed"}>
              Reset <ReloadOutlined />
            </Button>
          </Popconfirm>

          {submitButton ? (
            submitButton
          ) : (
            <Button
              loading={loading}
              size={Defaults.inputFields}
              type={"primary"}
              htmlType={"submit"}
            >
              {submitBtnTitle || "Submit"} <SaveOutlined />
            </Button>
          )}
        </div>
      </Col>
    </Row>
  );
}
