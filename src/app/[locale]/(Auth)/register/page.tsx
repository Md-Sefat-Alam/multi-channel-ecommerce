"use client";
import InDatePicker from "@/components/common/FormItems/InDatePicker";
import InPassword from "@/components/common/FormItems/InPassword";
import InSelect from "@/components/common/FormItems/InSelect";
import InText from "@/components/common/FormItems/InText";
import Title from "@/components/common/Title";
import { useMessageGroup } from "@/context/MessageGroup";
import { rule_bangladesh_mobile, rule_required } from "@/utils/rules/formRules";

import { Button, Col, Form, Row } from "antd";
import { useEffect } from "react";
import { useRegistrationMutation } from "./lib/api/registrationApi";

type Props = {};

export default function Page_Registration({}: Props) {
  const [form] = Form.useForm();
  const [registration, { isError, isLoading, isSuccess, error, data }] =
    useRegistrationMutation();
  const { notify } = useMessageGroup();

  useEffect(() => {
    notify({
      isError,
      isLoading,
      isSuccess,
      key: "registration-Message-Group",
      error,
      success_content: "Successfully registered login now!",
      success_url: "/login",
    });
  }, [isError, isLoading, isSuccess, error]);

  return (
    <section className='min-h-screen flex justify-center items-start mt-[80px]'>
      <div className='max-w-[880px] mx-3 md:mx-0 '>
        <Title title='Registration' addAfter />
        <Form
          form={form}
          name='login_form'
          initialValues={{ remember: true }}
          onFinish={(values) => {
            delete values.password_confirm;
            console.log({ values });

            registration(values);
          }}
          layout='vertical'
          className='!pt-[40px]'
          size='large'
        >
          <Row gutter={[16, 16]}>
            {/* <Divider orientation="left">Product-info</Divider> */}
            <InText<any>
              name={["fullName"]}
              label='Full Name'
              rules={[rule_required()]}
              placeholder='Enter full name'
              bPoint={{
                xs: 24,
              }}
            />
            <InText<any>
              name={["email"]}
              label='Email'
              rules={[]}
              placeholder='Enter email'
              bPoint={{
                xs: 24,
                sm: 24,
                lg: 12,
                md: 12,
                xl: 12,
                xxl: 12,
              }}
            />
            <InText<any>
              name={["mobileNumber"]}
              label='Mobile Number'
              rules={[rule_required(), rule_bangladesh_mobile()]}
              placeholder='Enter mobile number'
              bPoint={{
                xs: 24,
                sm: 24,
                lg: 12,
                md: 12,
                xl: 12,
                xxl: 12,
              }}
            />
            <InSelect<any>
              name={["gender"]}
              label='Gender'
              rules={[rule_required()]}
              placeholder='Enter gender'
              values={[
                { value: "MALE", title: "Male" },
                { value: "FEMALE", title: "Female" },
                { value: "OTHER", title: "Other" },
              ]}
              bPoint={{
                xs: 24,
                sm: 24,
                lg: 12,
                md: 12,
                xl: 12,
                xxl: 12,
              }}
            />
            <InDatePicker<any>
              name={["dob"]}
              label='Date of Birth'
              rules={[rule_required()]}
              placeholder='Enter date of birth'
              bPoint={{
                xs: 24,
                sm: 24,
                lg: 12,
                md: 12,
                xl: 12,
                xxl: 12,
              }}
            />
            <InPassword<any>
              name={["password"]}
              label='Password'
              rules={[rule_required()]}
              placeholder='Enter password'
              bPoint={{
                xs: 24,
                sm: 24,
                lg: 12,
                md: 12,
                xl: 12,
                xxl: 12,
              }}
            />
            <InPassword<any>
              name={["password_confirm"]}
              label='Confirm Password'
              rules={[
                rule_required(),
                // ,rule_confirmPassword("password")
              ]}
              placeholder='Enter password'
              bPoint={{
                xs: 24,
                sm: 24,
                lg: 12,
                md: 12,
                xl: 12,
                xxl: 12,
              }}
            />
            <Col xs={24}>
              <Form.Item>
                <Button
                  style={{
                    width: "100%",
                    padding: "20px",
                    fontSize: "16px",
                    fontFamily: "var(--font-poppins)",
                  }}
                  type='primary'
                  htmlType='submit'
                  // loading={isLoading}
                >
                  Registration
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </section>
  );
}
