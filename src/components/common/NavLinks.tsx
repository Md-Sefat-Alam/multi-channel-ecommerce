import auth from "@/firebase/firebase.init";
import { INavLink } from "@/types/hero";
import { Link } from "@/MUST_USE_Navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type Props = { item: INavLink; isSticky: boolean };

export default function NavLinks({ item, isSticky }: Props) {
  const [user] = useAuthState(auth);
  return (
    <Link href={"/" + item.href}>
      {item.icon ? item.icon : null}
      <li
        className={`font-bold relative ${
          isSticky ? "text-gray-900" : "text-white"
        } hover:-translate-y-1 transition-all hover:text-red-400`}
      >
        {item.href === "dashboard" && user ? (
          <div className="absolute -top-2 -right-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          </div>
        ) : null}
        {item.title}
      </li>
    </Link>
  );
}
