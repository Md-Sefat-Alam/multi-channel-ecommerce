"use client";
import { Link, useRouter } from "@/MUST_USE_Navigation";
import { useAuth } from "@/context/AuthContext";
import { RootState } from "@/lib/store";
import type { MenuProps } from "antd";
import { Avatar, Badge, ConfigProvider, Menu, message, theme } from "antd";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { RefObject, useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { FaRegFontAwesome } from "react-icons/fa6";
import { GiShoppingCart } from "react-icons/gi";
import { IoHomeOutline, IoStorefrontOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

type MenuItem = Required<MenuProps>["items"][number];
interface Props {
  getHeightRef3: RefObject<HTMLDivElement>;
}

const titleClass = classNames("!text-lg");
const iconClass = classNames("!text-lg");

const NavBar = ({ getHeightRef3 }: Props) => {
  const [current, setCurrent] = useState("mail");
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { user, token } = useAuth();
  const t = useTranslations("navbar");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY || document.documentElement.scrollTop;
      setIsSticky(offset > 280);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Desktop menu items
  const desktopItems: MenuItem[] = [
    {
      label: (
        <Link href={"/"}>
          <span className={titleClass}>{t("home")}</span>
        </Link>
      ),
      key: "home",
      icon: <IoHomeOutline className={iconClass} />,
    },
    {
      label: (
        <Link href={"/store"}>
          <span className={titleClass}>{t("store")}</span>
        </Link>
      ),
      key: "store",
      icon: <IoStorefrontOutline className={iconClass} />,
    },
    {
      label: (
        <Link href={"/about-us"}>
          <span className={titleClass}>{t("about")}</span>
        </Link>
      ),
      key: "about_us",
      icon: <FaRegFontAwesome className={iconClass} />,
    },
    // {
    //   label: (
    //     <span
    //       onClick={() => {
    //         message.info(t("coming_soon"));
    //       }}
    //       className={titleClass}
    //     >
    //       {t("farming")}
    //     </span>
    //   ),
    //   key: "news",
    //   icon: <FaRegNewspaper className={iconClass} />,
    // },
  ];

  // Handle search modal
  const handleSearchClick = () => {
    // @ts-ignore
    if (window.showSearchModal) {
      // @ts-ignore
      window.showSearchModal();
    } else {
      message.info("Search is loading...");
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div
        ref={getHeightRef3}
        className='!sticky top-0 z-[999] hidden sm:block'
      >
        <ConfigProvider
          theme={{
            algorithm: theme.defaultAlgorithm,
            token: {
              colorPrimary: "var(--primary)",
              borderRadius: 2,
              colorBgContainer: isSticky ? "var(--secondary)" : "white",
              colorBgBase: "#7cb44c",
              colorText: isSticky ? "#fff" : "var(--primary)",
            },
          }}
        >
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode='horizontal'
            items={desktopItems}
            className='flex justify-center'
            style={{ border: "none" }}
          />
        </ConfigProvider>
      </div>

      {/* Mobile Bottom Navigation - only visible on mobile */}
      <div className='sm:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50'>
        <div className='flex justify-around items-center h-16 px-2'>
          {/* Home */}
          <Link href='/' className='flex flex-col items-center justify-center'>
            <IoHomeOutline className='text-2xl text-gray-600' />
            <span className='text-xs mt-1'>{t("home")}</span>
          </Link>

          {/* Store */}
          <Link
            href='/store'
            className='flex flex-col items-center justify-center'
          >
            <IoStorefrontOutline className='text-2xl text-gray-600' />
            <span className='text-xs mt-1'>{t("store")}</span>
          </Link>

          {/* Search - Elevated with special styling */}
          <div className='flex flex-col items-center justify-center -mt-6'>
            <div
              className='bg-[var(--primary)] p-3 rounded-full shadow-lg'
              onClick={handleSearchClick}
            >
              <FaSearch className='text-2xl text-white' />
            </div>
            <span className='text-xs mt-1'>{t("search")}</span>
          </div>

          {/* Cart */}
          <Badge
            count={cartItems.length}
            className={classNames("", {
              // "!hidden": cartItems.length <= 0
            })}
            size='small'
          >
            <div
              onClick={() => {
                if (cartItems.length > 0) {
                  router.push("/buy-now");
                } else {
                  message.info(t("cart_empty"));
                }
              }}
              className='relative'
            >
              <GiShoppingCart className='text-2xl text-gray-600 font-extrabold' />
            </div>
            <span className='text-xs mt-1 text-black'>{t("cart")}</span>
          </Badge>

          {/* Profile */}
          <Link
            href={token ? "/profile" : "/login"}
            className='flex flex-col items-center justify-center'
          >
            <div className='relative flex items-center justify-center'>
              {token && user?.fullName ? (
                <Avatar
                  size={28}
                  style={{ backgroundColor: "var(--secondary)" }}
                >
                  {user.fullName[0].toUpperCase()}
                </Avatar>
              ) : (
                <CiUser className='text-2xl text-black' />
              )}
            </div>
            <span className='text-xs mt-1'>{t("profile")}</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
