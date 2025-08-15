"use client";
import { useAuth } from "@/context/AuthContext";
import { Link } from "@/MUST_USE_Navigation";
import { Avatar, Button, MenuProps, Popover, Skeleton } from "antd";
import classNames from "classnames";
import { CgProfile } from "react-icons/cg";
import { CiUser } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { TbLogout, TbUserQuestion } from "react-icons/tb";
import { useTranslations } from "next-intl";

type Props = {};

export default function Account({}: Props) {
  const { token, user, logout, isLoading } = useAuth();
  const t = useTranslations("account");

  const content = (
    <div className='min-w-[250px] flex flex-col p-3'>
      <div className='pt-4 pb-2 flex justify-center items-center flex-col'>
        <div className='border-2 rounded-full border-[--secondary] p-1 select-none'>
          <Avatar
            size={95}
            style={{ backgroundColor: "var(--secondary" }}
            icon={
              user?.fullName ? (
                user.fullName[0].toUpperCase()
              ) : (
                <CiUser
                  className='text-[--primary]'
                  style={{ fontSize: "32px" }}
                />
              )
            }
          />
        </div>
        <small>{user?.email}</small>
        <small>{user?.fullName}</small>
      </div>
      <br />
      <Link className='w-full' href={"/profile/my-orders"}>
        <Button
          type='text'
          className='!justify-start !w-full'
          icon={<MdOutlineSpaceDashboard />}
        >
          {t("orders")}
        </Button>
      </Link>
      <Link className='w-full' href={"/profile"}>
        <Button
          type='text'
          className='!justify-start !w-full'
          icon={<CgProfile />}
        >
          {t("profile")}
        </Button>
      </Link>
      <br />
      <Button onClick={logout} icon={<TbLogout />}>
        {t("logout")}
      </Button>
    </div>
  );

  return (
    <div className='flex gap-1 justify-center items-center'>
      {!token ? (
        isLoading ? (
          <div className='h-[50px] w-[50px] rounded-full p-1'>
            <Skeleton loading={true} active avatar></Skeleton>
          </div>
        ) : (
          <Link href={"/login"}>
            <div className='border-2 rounded-full border-[--secondary] p-1'>
              <TbUserQuestion
                className='text-[--primary]'
                style={{ fontSize: "32px" }}
              />
            </div>
          </Link>
        )
      ) : (
        <Popover content={content} trigger='click' placement='bottom'>
          <div className='border-2 rounded-full border-[--secondary] p-1 select-none cursor-pointer'>
            <Avatar
              size={35}
              style={{ backgroundColor: "var(--secondary" }}
              icon={
                user?.fullName ? (
                  user.fullName[0].toUpperCase()
                ) : (
                  <CiUser
                    className='text-[--primary]'
                    style={{ fontSize: "32px" }}
                  />
                )
              }
            />
          </div>
        </Popover>
      )}

      {!token ? (
        <div className='flex flex-col gap-0'>
          <small className={classNames("font-poppins", "text-[--secondary]")}>
            {t("login")}
          </small>
          <p className='text-[--primary]'>{t("now")}</p>
        </div>
      ) : (
        <div className='flex flex-col gap-0'>
          <small className={classNames("font-poppins", "text-[--secondary]")}>
            {t("welcome")}
          </small>
          <p className='text-[--primary]'>{user?.fullName.split(" ")[0]}</p>
        </div>
      )}
    </div>
  );
}
