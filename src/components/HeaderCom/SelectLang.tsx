"use client";
import { usePathname, useRouter } from "@/MUST_USE_Navigation";
import { Switch } from "antd";
import { useLocale } from "next-intl";
import Image from "next/image";

type Props = {};

export default function SelectLang({}: Props) {
  const pathName = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const handleChange = (value: boolean) => {
    if (value) {
      router.replace(pathName, { locale: "en" });
    } else {
      router.replace(pathName, { locale: "bn" });
    }
  };
  return (
    <>
      <div>
        <Switch
          style={{ outline: "none" }}
          value={locale === "bn" ? false : true}
          onChange={handleChange}
          className="!bg-transparent"
          checkedChildren={
            <div className="mt-1">
              <Image
                alt="Bd flag"
                src={"/assets/flags/bd.png"}
                height={15}
                width={20}
                className="w-[20px] h-[15px]"
              />
            </div>
          }
          unCheckedChildren={
            <div className="">
              <Image
                alt="Bd flag"
                src={"/assets/flags/en.png"}
                height={15}
                width={20}
                className="w-[20px] h-[15px]"
              />
            </div>
          }
        />
      </div>
    </>
    // <Select
    //   defaultValue="bd"
    //   style={{
    //     width: 120,
    //   }}
    //   className=""
    //   onChange={handleChange}
    //   dropdownStyle={{ backgroundColor: "transparent" }}
    //   options={[
    //     {
    //       value: "bd",
    //       label: (
    //         <div className="flex gap-1 items-center ">
    //           <Image
    //             alt="Bd flag"
    //             src={"/assets/flags/bd.png"}
    //             height={15}
    //             width={20}
    //             className="w-[20px] h-[15px]"
    //           />
    //           <div>বাংলা</div>
    //         </div>
    //       ),
    //     },
    //     {
    //       value: "en",
    //       label: (
    //         <div className="flex gap-1 items-center">
    //           <Image
    //             alt="Bd flag"
    //             src={"/assets/flags/en.png"}
    //             height={15}
    //             width={20}
    //             className="w-[20px] h-[15px]"
    //           />
    //           <div>English</div>
    //         </div>
    //       ),
    //     },
    //   ]}
    // />
  );
}
