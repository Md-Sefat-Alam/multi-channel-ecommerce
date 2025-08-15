import Footer from "@/components/common/Footer";
import HeaderWrapper from "@/components/HeaderCom/HeaderWrapper";
import ContextWrapper from "@/context/ContextWrapper";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { hindSiliguri, openSans, poppins } from "../fonts";
import "./globals.css";
import { ConfigProvider } from "antd";
import WishlistSync from "@/components/SyncComponents/WishlistSync";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Suddha",
  description:
    "Welcome to Shuddha, a proud initiative of Barendra Krishi Udyog (BKU), launched in September 2022 with the commitment to purity and safety in food. Our journey began in Chapai Nawabganj with the motto 'Pledge of Purity,' aiming to connect consumers directly with fresh, processed agricultural products from our own farms. At Shuddha, we prioritize your health and well-being by providing a wide range of safe and nutritious food options. Our offerings include fresh milk, various types of rice (both perishable and non-perishable), seasonal fruits, jaggery, mustard oil, homemade ghee, pickles, and much more.",
  icons: {
    icon: "/logo.svg",
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${poppins.variable} ${openSans.variable} ${hindSiliguri.variable}`}
    >
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <AntdRegistry>
            <ConfigProvider
            // theme={{
            //   algorithm: theme.defaultAlgorithm, // This sets the light theme
            //   token: {
            //     // Optional: Customizations for light theme
            //     colorPrimary: "#1890ff", // Ant Design default blue
            //     colorBgContainer: "#ffffff", // Background color
            //     colorText: "#000000", // Text color
            //   },
            // }}
            >
              <ContextWrapper>
                <HeaderWrapper />
                <ToastContainer />
                <WishlistSync />
                {children}
                {/* Add padding for footer round wave extra area */}
                <div className='h-24'></div>
                <Footer />
                {/* Add padding to the bottom of the page when on mobile to account for the navigation bar */}
                <div className='sm:hidden h-16'></div>
              </ContextWrapper>
            </ConfigProvider>
          </AntdRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
