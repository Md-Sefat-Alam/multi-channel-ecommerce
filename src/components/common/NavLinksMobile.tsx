import auth from "@/firebase/firebase.init";
import { INavLink } from "@/types/hero";
import { Link } from "@/MUST_USE_Navigation";
import React, { Dispatch, SetStateAction } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type Props = {
  item: INavLink;
  isSticky: boolean;
  setIsNavMobile: Dispatch<SetStateAction<boolean>>;
};

export default function NavLinksMobile({
  item,
  isSticky,
  setIsNavMobile,
}: Props) {
  const [user] = useAuthState(auth);
  return (
    <Link
      onClick={() => setIsNavMobile((prev) => !prev)}
      href={"/" + item.href}
      className="relative bg-blue-500/50 px-10 py-2"
    >
      {item.href === "dashboard" && user ? (
        <div className="absolute top-3 right-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
        </div>
      ) : null}
      {item.icon ? item.icon : null}
      <li className={`font-bold text-white`}>{item.title}</li>
    </Link>
  );
}
