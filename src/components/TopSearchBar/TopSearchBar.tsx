"use client";
import { useRouter } from "@/MUST_USE_Navigation";
import { Link } from "@/MUST_USE_Navigation";
import Image from "next/image";
import { RefObject } from "react";
import Account from "./Account/Account";
import Cart from "./Cart/Cart";
import Search from "./Search/Search";
import { FaRegFontAwesome, FaRegNewspaper } from "react-icons/fa6";
import { message } from "antd";
import { useTranslations } from "next-intl";

type Props = { getHeightRef2: RefObject<HTMLDivElement> };

export default function TopSearchBar({ getHeightRef2 }: Props) {
  const router = useRouter();
  const t = useTranslations("navbar");

  return (
    <div ref={getHeightRef2} className=''>
      <div className='container mx-auto pb-2 px-1 lg:px-0 flex justify-between items-center'>
        <Search />

        <div className='w-[100%] sm:w-[40%] sm:-mt-[45px] flex-grow flex justify-center sm:items-center ml-1 sm:ml-0 h-[80px] sm:h-auto'>
          <Image
            priority={true}
            alt='suddha logo'
            src={"/logo.svg"}
            height={90}
            width={90}
            onClick={() => {
              router.push("/");
            }}
          />
        </div>

        {/* Desktop - Show Cart and Account */}
        <div className='w-[30%] hidden sm:flex flex-grow justify-end items-center gap-5'>
          <Cart />
          <Account />
        </div>

        {/* Mobile - Show About Us and Blogs */}
        {/* <div className='w-[30%] flex sm:hidden flex-grow justify-end items-center gap-4'>
          <Link
            href='/about-us'
            className='flex flex-col items-center transition-colors hover:text-[--primary] group'
          >
            <div className='border-2 rounded-full border-[--secondary] p-2 bg-white shadow-sm group-hover:border-[--primary] transition-colors'>
              <FaRegFontAwesome
                className='text-[--primary] group-hover:scale-110 transition-transform'
                style={{ fontSize: "20px" }}
              />
            </div>
            <span className='text-xs mt-1 font-medium group-hover:text-[--primary] transition-colors'>
              {t("about")}
            </span>
          </Link>

          <button
            type='button'
            className='flex flex-col items-center transition-colors hover:text-[--primary] group focus:outline-none'
            onClick={() => message.info("Blogs coming soon!")}
          >
            <div className='border-2 rounded-full border-[--secondary] p-2 bg-white shadow-sm group-hover:border-[--primary] transition-colors'>
              <FaRegNewspaper
                className='text-[--primary] group-hover:scale-110 transition-transform'
                style={{ fontSize: "20px" }}
              />
            </div>
            <span className='text-xs mt-1 font-medium group-hover:text-[--primary] transition-colors'>
              {t("farming")}
            </span>
          </button>
        </div> */}
      </div>
    </div>
  );
}
