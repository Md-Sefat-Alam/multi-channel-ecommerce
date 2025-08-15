"use client";

import PrevItems from "@/components/common/PrevItems";
import SelectDistrictView from "@/components/common/SelectItems/SelectDistrictView";
import SelectDivisionView from "@/components/common/SelectItems/SelectDivisionView";
import SelectThanaView from "@/components/common/SelectItems/SelectThanaView";
import { Link } from "@/MUST_USE_Navigation";
import { rule_required } from "@/utils/rules/formRules";
import { Card, Checkbox, Col, Form, FormInstance, Row } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Props = {
  form: FormInstance<any>;
};

export default function BuyNowFormView({ form }: Props) {
  const t = useTranslations("buyNowForm");

  const {
    address,
    district,
    division,
    email,
    fullName,
    gender,
    mobileNumber,
    policy1Checked,
    policy2Checked,
    postalCode,
    remarks,
    thana,
  } = form.getFieldsValue();

  return (
    <>
      <div className='border rounded-[20px] border-border p-[20px] md:p-[80px] bg-white'>
        <Row gutter={[0, 34]}>
          <Card
            bordered={false}
            style={{ boxShadow: "none", width: "100%" }}
            styles={{
              body: { paddingLeft: 0, paddingRight: 0 },
              header: { padding: 0 },
            }}
            title={
              <span className='text-[22px] lg:text-[32px] text-primary !font-bold font-poppins'>
                {t("userInfo")}
              </span>
            }
          >
            <Row gutter={[24, 24]}>
              <PrevItems
                label={t("fullName")}
                bPoint={{ xs: 24, md: 12 }}
                value={fullName}
              />
              <PrevItems
                label={t("mobile")}
                bPoint={{ xs: 24, md: 12 }}
                value={mobileNumber}
              />
              {/* <PrevItems
                label={t("gender")}
                bPoint={{ xs: 24, md: 12 }}
                value={gender}
              /> */}
              <PrevItems
                label={t("email")}
                bPoint={{ xs: 24, md: 12 }}
                value={email}
              />
            </Row>
          </Card>

          <Col xs={24}>
            <Card
              bordered={false}
              style={{ boxShadow: "none" }}
              styles={{
                body: { paddingLeft: 0, paddingRight: 0 },
                header: { padding: 0 },
              }}
              title={
                <span className='text-[22px] lg:text-[32px] text-primary !font-bold font-poppins'>
                  {t("shippingAddress")}
                </span>
              }
            >
              <Row gutter={[16, 16]}>
                <PrevItems
                  label={t("postalCode")}
                  bPoint={{ xs: 24, md: 12 }}
                  value={postalCode}
                />
                <PrevItems
                  label={t("division")}
                  bPoint={{ xs: 24, md: 12 }}
                  value={<SelectDivisionView uuid={division} />}
                />
                <PrevItems
                  label={t("district")}
                  bPoint={{ xs: 24, md: 12 }}
                  value={<SelectDistrictView uuid={district} />}
                />
                <PrevItems
                  label={t("thana")}
                  bPoint={{ xs: 24, md: 12 }}
                  value={<SelectThanaView uuid={thana} />}
                />
                <PrevItems
                  label={t("address")}
                  bPoint={{ xs: 24 }}
                  value={address}
                />
              </Row>
            </Card>
          </Col>

          <Col xs={24}>
            <Card
              bordered={false}
              style={{ boxShadow: "none" }}
              styles={{
                body: { paddingLeft: 0, paddingRight: 0 },
                header: { padding: 0 },
              }}
              title={
                <span className='text-[22px] lg:text-[32px] text-primary !font-bold font-poppins'>
                  {t("remarks")}
                </span>
              }
            >
              <Row gutter={[16, 16]}>
                <PrevItems
                  label={t("remarks")}
                  bPoint={{ xs: 24 }}
                  value={remarks}
                />
              </Row>
            </Card>
          </Col>
        </Row>
      </div>

      {/* <Row className='pt-5' gutter={[0, 0]}>
        <Col xs={24}>
          <Form.Item<any>
            valuePropName='checked'
            name={["policy1Checked"]}
            rules={[rule_required()]}
          >
            <Checkbox>
              {t("policy1")}{" "}
              <a target='_blank' href='#'>
                {t("policyLink")}
              </a>
            </Checkbox>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item<any>
            valuePropName='checked'
            name={["policy2Checked"]}
            rules={[rule_required()]}
          >
            <Checkbox>
              {t("policy2")}{" "}
              <Link target='_blank' href='#'>
                {t("privacyPolicy")}
              </Link>
            </Checkbox>
          </Form.Item>
        </Col>
      </Row> */}
    </>
  );
}
