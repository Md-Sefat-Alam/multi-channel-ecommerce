"use client";

import { Avatar, Divider, message } from "antd";
import Image from "next/image";
import React from "react";
import { BiLock, BiLogOut } from "react-icons/bi";
import ChangePasswordModal from "./ChangePasswordModal";
import { useAuth } from "@/context/AuthContext";
import { Link, usePathname } from "@/MUST_USE_Navigation";
import { useTranslations } from "next-intl";

type Props = { setCollapsed: (value: React.SetStateAction<boolean>) => void };

const ProfileLinks = ({ setCollapsed }: Props) => {
  const t = useTranslations();
  const { user, logout } = useAuth();
  const router = usePathname();

  const { fullName, email, mobileNumber } = user || {};

  return (
    <>
      <aside className='flex flex-col w-full h-full'>
        <div className='p-2 lg:p-6 mb-6'>
          <div className='flex justify-center'>
            <Avatar
              style={{
                backgroundColor: "var(--secondary)",
              }}
              className='!w-32 !h-32 !text-font-light rounded-full !border-secondary !mx-auto !mb-4 !border-4'
              icon={
                user?.fullName ? (
                  <span className='text-5xl font-bold'>
                    {user.fullName[0].toLocaleUpperCase()}
                  </span>
                ) : (
                  <></>
                )
              }
              // src={user?.data.userProfileImage[0].path}
            />
          </div>
          {/* <Image
            src={"/assets/hero/muhin.jpg"}
            alt="account logo"
            className="w-32 h-32 rounded-full border-button mx-auto mb-4 border-4 "
            height={150}
            width={150}
            priority
          /> */}
          <div className='flex flex-col gap-0 justify-center items-center'>
            <h2 className='text-xl font-semibold text-center'>{fullName}</h2>
            <small>{email}</small>
            <small>{mobileNumber}</small>
          </div>
          <Divider />
          <nav className='space-y-2'>
            <Link
              onClick={() => {
                setCollapsed((prev) => !prev);
              }}
              href='/profile'
              className={`block py-2 px-2 lg:px-4 rounded ${
                router === "/profile"
                  ? "bg-blue-100"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {t("profileSidebar.profile")}
            </Link>
            <Link
              onClick={() => {
                setCollapsed((prev) => !prev);
              }}
              href='/profile/my-orders'
              className={`block py-2 px-2 lg:px-4 rounded ${
                router === "/profile/my-orders"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {t("profileSidebar.my_orders")}
            </Link>
          </nav>
        </div>

        <div className='flex-grow mt-[350px]'></div>

        <div className='p-4 space-y-2 py-10'>
          <Divider />
          {/* Change password modal */}
          <ChangePasswordModal />
          <button
            onClick={logout}
            className='w-full flex items-center text-gray-600 hover:text-gray-900'
          >
            <BiLogOut className='w-5 h-5 mr-2' />
            {t("profileSidebar.log_out")}
          </button>
        </div>
      </aside>
    </>
  );
};

export default ProfileLinks;
