"use client";
import { HeartOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { RefObject, useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import SelectLang from "../HeaderCom/SelectLang";
import IconWithText from "./IconWithText";
import WishlistModal from "./modals/WishlistModal";
import { useAuth } from "@/context/AuthContext";
import { Link } from "@/MUST_USE_Navigation";
import { useTranslations } from "next-intl";
import { FcAbout } from "react-icons/fc";

type Props = { getHeightRef1: RefObject<HTMLDivElement> };

export default function HeaderTopBar({ getHeightRef1 }: Props) {
  const [wishlistVisible, setWishlistVisible] = useState(false);
  const { user } = useAuth();
  const t = useTranslations("navbar");

  return (
    <div
      ref={getHeightRef1}
      className={classNames("font-poppins", "bg-[--secondary-0-2] !text-sm")}
    >
      <div className='container mx-auto flex justify-between py-2 px-1 lg:px-0'>
        <div className='flex gap-2 sm:gap-4'>
          <a href='tel:+8801322330948'>
            <IconWithText icon={<PhoneOutlined />} text='+8801322330948' />
          </a>
          <a href='mailto:suddha@gmail.com'>
            <IconWithText
              icon={<MailOutlined />}
              text='suddha@gmail.com'
              smHiddenText
            />
          </a>
        </div>
        <div className='flex justify-center items-center gap-2 sm:gap-4'>
          {/* Mobile - Show About Us and Blogs */}
          <div className='sm:hidden flex-grow justify-end items-center'>
            <Link
              href='/about-us'
              className='flex flex-col items-center transition-colors hover:text-[--primary] group'
            >
              <FcAbout className='text-xl' />
            </Link>
          </div>

          {user?.uuid ? (
            <IconWithText
              icon={<MdOutlineAccountCircle />}
              text={`${t("account_user")}: ${user.fullName}`}
              smHiddenText
            />
          ) : (
            <Link href={"/login"}>
              <IconWithText
                icon={<MdOutlineAccountCircle />}
                text={t("account_user")}
                smHiddenText
              />
            </Link>
          )}
          <div
            className='flex justify-center items-center'
            onClick={() => setWishlistVisible(true)}
          >
            <IconWithText
              icon={<HeartOutlined />}
              text={t("wishlist")}
              smHiddenText
            />
          </div>
          {/* <IconWithText icon={<TbTruckDelivery />} text='Track Order' smHiddenText /> */}
          <SelectLang />
        </div>
      </div>
      <WishlistModal
        visible={wishlistVisible}
        onClose={() => setWishlistVisible(false)}
      />
    </div>
  );
}
