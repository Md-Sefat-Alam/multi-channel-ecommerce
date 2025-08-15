"use client";

import InNumber from "@/components/common/FormItems/InNumber";
import InSelect from "@/components/common/FormItems/InSelect";
import InText from "@/components/common/FormItems/InText";
import InTextArea from "@/components/common/FormItems/InTextArea";
import SelectDistrict from "@/components/common/SelectItems/SelectDistrict";
import SelectDivision from "@/components/common/SelectItems/SelectDivision";
import SelectThana from "@/components/common/SelectItems/SelectThana";
import { Link } from "@/MUST_USE_Navigation";
import {
  rule_bangladesh_mobile,
  rule_numeric,
  rule_required,
} from "@/utils/rules/formRules";
import { Card, Checkbox, Col, Form, FormInstance, Row } from "antd";
import { useState } from "react";
import { useTranslations } from "next-intl";

type Props = {
  form: FormInstance<any>;
};

export default function BuyFormItems({ form }: Props) {
  const t = useTranslations("buyForm");
  const [divisionSelect, setDivisionSelect] = useState<string | undefined>();
  const [districtSelect, setDistrictSelect] = useState<string | undefined>();

  return (
    <>
      <div className='border rounded-[20px] border-border p-[20px] md:p-[80px] bg-white'>
        <Row gutter={[0, 14]}>
          {/* User Info */}
          <Card
            bordered={false}
            style={{ boxShadow: "none", width: "100%" }}
            styles={{
              body: { paddingLeft: 0, paddingRight: 0 },
              header: { padding: 0 },
            }}
            title={
              <span className='text-[22px] lg:text-[32px] text-primary font-bold'>
                {t("userInfo")}
              </span>
            }
          >
            <Row gutter={[24, 24]}>
              <InText
                name={["fullName"]}
                label={t("fullName")}
                rules={[rule_required()]}
                placeholder={t("enterFullName")}
                bPoint={{ sm: 24, md: 12, lg: 12, xl: 12, xxl: 12 }}
              />
              <InText
                name={["mobileNumber"]}
                label={t("mobile")}
                rules={[rule_bangladesh_mobile(), rule_required()]}
                placeholder={t("enterMobile")}
                bPoint={{ sm: 24, md: 12, lg: 12, xl: 12, xxl: 12 }}
              />
              <InText
                name={["email"]}
                label={t("email")}
                rules={[]}
                placeholder={t("enterEmail")}
                type='email'
                bPoint={{ sm: 24, md: 12, lg: 12, xl: 12, xxl: 12 }}
              />
            </Row>
          </Card>

          {/* Shipping Address */}
          <Col xs={24}>
            <Card
              bordered={false}
              style={{ boxShadow: "none" }}
              styles={{
                body: { paddingLeft: 0, paddingRight: 0 },
                header: { padding: 0 },
              }}
              title={
                <span className='text-[22px] lg:text-[32px] text-primary font-bold'>
                  {t("shippingAddress")}
                </span>
              }
            >
              <Row gutter={[16, 16]}>
                <InText
                  name={["postalCode"]}
                  label={t("postCode")}
                  rules={[rule_required()]}
                  placeholder={t("enterPostCode")}
                  bPoint={{ sm: 24, md: 12, lg: 12, xl: 12, xxl: 12 }}
                />

                <SelectDivision
                  name={["division"]}
                  label={t("division")}
                  rules={[rule_required()]}
                  placeholder={t("selectDivision")}
                  onChange={() => {
                    setDivisionSelect(form.getFieldValue("division"));
                    setDistrictSelect(undefined);
                    form.setFieldsValue({
                      district: undefined,
                      thana: undefined,
                    });
                  }}
                  bPoint={{ sm: 24, md: 12, lg: 12, xl: 12, xxl: 12 }}
                />

                <SelectDistrict
                  name={["district"]}
                  label={t("district")}
                  rules={[rule_required()]}
                  placeholder={t("selectDistrict")}
                  division={divisionSelect}
                  onChange={() => {
                    setDistrictSelect(form.getFieldValue("district"));
                    form.setFieldsValue({ thana: undefined });
                  }}
                  disabled={!divisionSelect}
                  bPoint={{ sm: 24, md: 12, lg: 12, xl: 12, xxl: 12 }}
                />

                <SelectThana
                  name={["thana"]}
                  label={t("thana")}
                  rules={[rule_required()]}
                  placeholder={t("selectThana")}
                  district={districtSelect}
                  disabled={!divisionSelect || !districtSelect}
                  bPoint={{ sm: 24, md: 12, lg: 12, xl: 12, xxl: 12 }}
                />

                <InTextArea
                  name={["address"]}
                  label={t("address")}
                  rules={[rule_required()]}
                  placeholder={t("enterAddress")}
                  rows={3}
                  bPoint={{ xs: 24 }}
                />
              </Row>
            </Card>
          </Col>

          {/* Remarks */}
          <Col xs={24}>
            <Card
              bordered={false}
              style={{ boxShadow: "none" }}
              styles={{
                body: { paddingLeft: 0, paddingRight: 0 },
                header: { padding: 0 },
              }}
              title={
                <span className='text-[22px] lg:text-[32px] text-primary font-bold'>
                  {t("remarks")}
                </span>
              }
            >
              <Row gutter={[16, 16]}>
                <InTextArea
                  name={["remarks"]}
                  rules={[]}
                  placeholder={t("enterRemarks")}
                  rows={3}
                  bPoint={{ xs: 24 }}
                />
              </Row>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Terms and Policy Checkboxes */}
      {/* <Row className='pt-5' gutter={[0, 0]}>
        <Col xs={24}>
          <Form.Item
            valuePropName='checked'
            name={["policy1Checked"]}
            rules={[rule_required()]}
          >
            <Checkbox>
              {t("confirmPolicy1")}{" "}
              <a target='_blank' href={"#"}>
                {t("policy")}
              </a>
            </Checkbox>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            valuePropName='checked'
            name={["policy2Checked"]}
            rules={[rule_required()]}
          >
            <Checkbox>
              {t("confirmPolicy2")}{" "}
              <Link target='_blank' href={"#"}>
                {t("privacy")}
              </Link>
            </Checkbox>
          </Form.Item>
        </Col>
      </Row> */}
    </>
  );
}
