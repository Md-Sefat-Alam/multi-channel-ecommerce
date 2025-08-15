"use client";

import { Link, usePathname } from "@/MUST_USE_Navigation";
import { useLocale } from "next-intl";
import { BiWorld } from "react-icons/bi";

const dataFullName = {
  en: "English",
  bn: "বাংলা ",
};

export default function LocaleCn({ isSticky }: { isSticky: boolean }) {
  return (
    <div className="flex gap-3 py-5">
      <LocaleLink locale="en" isSticky={isSticky} />
      <LocaleLink locale="bn" isSticky={isSticky} />
    </div>
  );
}

function LocaleLink({ locale, isSticky }: { locale: string; isSticky: boolean }) {
  const pathname = usePathname();
  const isActive = useLocale() === locale;

  return (
    <Link
      className={`${isSticky?'md:text-gray-800 text-white':'text-white'} font-bold rounded flex gap-1 ${
        !isActive ? "block" : "hidden"
      }`}
      href={pathname}
      locale={locale}
    >
      <BiWorld className="text-2xl text-blue-400" />{" "}
      {dataFullName[locale as "en" | "bn"]}
    </Link>
  );
}
