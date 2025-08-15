"use client"

import React, { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import theme from 'antd/es/theme';

interface AntDesignProviderProps {
  children: ReactNode;
}

export default function AntDesignProvider({ children }: AntDesignProviderProps): React.ReactElement {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm, // This sets the light theme
        token: {
          // Optional: Customizations for light theme
          colorPrimary: "#1890ff", // Ant Design default blue
          colorBgContainer: "#ffffff", // Background color
          colorText: "#000000", // Text color
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}