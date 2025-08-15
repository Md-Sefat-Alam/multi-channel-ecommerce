import React, { useEffect, useState } from "react";
import { Button, message, Modal } from "antd";
import { BiEdit, BiLock } from "react-icons/bi";
import { useTranslations } from "next-intl";

import type { FormProps } from "antd";
import { Checkbox, Form, Input } from "antd";
import { IUserUpdate } from "../profileType";
import { useChangePasswordMutation } from "../api/profileApi";
import { useFormValidationMessages } from "@/utils/rules/formRules";
import { useAuth } from "@/context/AuthContext";
import { useMessageGroup } from "@/context/MessageGroup";

const ChangePasswordModal: React.FC = () => {
  const t = useTranslations("changePassword");
  const validationRules = useFormValidationMessages();
  const [changePassword, { isLoading, isSuccess, isError, error }] =
    useChangePasswordMutation();
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const { notify } = useMessageGroup();

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const onFinish: FormProps<IUserUpdate>["onFinish"] = (values) => {
    if (user?.uuid) values["uuid"] = user?.uuid;
    console.log("Success:", values);
    changePassword(values);
  };

  const onFinishFailed: FormProps<IUserUpdate>["onFinishFailed"] = (
    errorInfo,
  ) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    notify({
      isError: isError,
      isLoading: isLoading,
      isSuccess: isSuccess,
      key: "UpdatePassword",
      error: error,
      success_content: t("successMessage"),
    });
    if (isSuccess) {
      form.resetFields();
      handleCancel();
    }
  }, [isError, isLoading, isSuccess, t]);

  return (
    <>
      <button
        onClick={() => {
          showModal();
        }}
        className='w-full flex items-center text-gray-600 hover:text-gray-900'
      >
        <BiLock className='w-5 h-5 mr-2' />
        {t("changePassword")}
      </button>
      <Modal
        title={t("modalTitle")}
        open={open}
        onCancel={handleCancel}
        footer={false}
      >
        <div className='flex justify-center w-full items-center'>
          <Form
            form={form}
            name='basic'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            layout='vertical'
            className='!pt-[40px] !w-full'
            size='middle'
          >
            <Form.Item<IUserUpdate>
              label={t("oldPasswordLabel")}
              name='oldPassword'
              rules={[{ required: true, message: t("oldPasswordRequired") }]}
            >
              <Input.Password
                onChange={() => {
                  if (
                    form.getFieldValue("conPassword") &&
                    form.getFieldValue("newPassword")
                  ) {
                    form.validateFields(["conPassword", "newPassword"]);
                  }
                }}
              />
            </Form.Item>
            <Form.Item<IUserUpdate>
              label={t("newPasswordLabel")}
              name='newPassword'
              rules={[{ required: true, message: t("newPasswordRequired") }]}
            >
              <Input.Password
                onChange={() => {
                  if (form.getFieldValue("conPassword")) {
                    form.validateFields(["conPassword"]);
                  }
                }}
              />
            </Form.Item>
            <Form.Item<IUserUpdate>
              label={t("confirmPasswordLabel")}
              name='conPassword'
              rules={[
                validationRules.rule_confirmPassword("newPassword"),
                validationRules.rule_confirmPassword_unique_by_old_one(
                  "newPassword",
                  "oldPassword",
                ),
                {
                  required: true,
                  message: t("confirmPasswordRequired"),
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <div className='flex justify-end'>
              <Form.Item>
                <Button loading={isLoading} type='primary' htmlType='submit'>
                  <BiEdit /> {t("changePasswordButton")}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
