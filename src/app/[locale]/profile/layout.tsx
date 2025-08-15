"use client";
import ProfileLinks from "./lib/components/ProfileLinks";

import withAuth from "@/components/common/withAuth";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

const { Content, Sider } = Layout;

const ProfileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const t = useTranslations();
  const [collapsed, setCollapsed] = useState(true);
  const [siderWidth, setSiderWidth] = useState(300);

  // Dynamic navigation items with translations
  const items = [
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    UserOutlined,
  ].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: t(`navigation.nav_${index + 1}`),
  }));

  console.log({ siderWidth });

  return (
    <div className='bg-[#fafafa] overflow-hidden'>
      <Layout className='container !bg-[#fafafa]'>
        <Sider
          breakpoint='md'
          collapsedWidth='0'
          onBreakpoint={(broken) => {
            console.log(broken);
            setSiderWidth(broken ? 200 : 300);
          }}
          onCollapse={(collapsed, type) => {
            setCollapsed(collapsed);
          }}
          collapsed={siderWidth === 200 ? collapsed : false}
          theme='light'
          style={{
            minHeight: "100vh",
            backgroundColor: "transparent",
            paddingLeft: "0px",
            margin: "80px 0px 80px 0px",
          }}
          width={siderWidth}
          collapsible={false}
          trigger={null}
        >
          <ProfileLinks setCollapsed={setCollapsed} />
        </Sider>
        <Layout
          style={{
            backgroundColor: "transparent",
            margin: "80px 0px",
            borderRadius: "20px",
            border: "1px dashed #D5D5D5",
          }}
        >
          <Content
            style={{
              margin: "24px 16px 0",
              borderRadius: "20px",
              position: "relative",
            }}
          >
            <div
              className='block md:hidden'
              style={{
                position: "absolute",
                top: -60,
                left: -15,
                // left: collapsed ? "10px" : "260px", // Adjust dynamically
                // transition: "left 0.3s",
                fontSize: "20px",
              }}
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <div className='p-[8px] lg:p-[20px] !rounded-[20px]'>
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default withAuth(ProfileLayout);
