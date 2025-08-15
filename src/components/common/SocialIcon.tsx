import { FaceFrownIcon } from "@heroicons/react/16/solid";
import { Link } from "@/MUST_USE_Navigation";
import React from "react";
import {
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { TiWorld } from "react-icons/ti";

type social =
  | "facebook"
  | "twitter"
  | "instagram"
  | "linkedin"
  | "website"
  | "google";
type Props = {
  socialList: social[];
  link?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    website?: string;
    google?: string;
  };
};

export default function SocialIcon({ socialList, link }: Props) {
  return (
    <div className="flex gap-4">
      {socialList.includes("facebook") ? (
        <Link target="_blank" href={link?.facebook || "/"}>
          <Facebook />
        </Link>
      ) : null}
      {socialList.includes("twitter") ? (
        <Link href={link?.twitter || "/"}>
          <Twitter />
        </Link>
      ) : null}
      {socialList.includes("instagram") ? (
        <Link href={link?.instagram || "/"}>
          <Instagram />
        </Link>
      ) : null}
      {socialList.includes("linkedin") ? (
        <Link href={link?.linkedin || "/"}>
          <Linkedin />
        </Link>
      ) : null}
      {socialList.includes("website") ? (
        <Link href={link?.website || "/"}>
          <Website />
        </Link>
      ) : null}
      {socialList.includes("google") ? (
        <Link href={link?.google || "/"}>
          <Google />
        </Link>
      ) : null}
    </div>
  );
}

const commonClass =
  "text-3xl hover:-translate-y-1 transition-all cursor-pointer ";
const Facebook = () => {
  return (
    <div className="">
      <FaFacebook className={commonClass + "text-[#1877F2]"} />
    </div>
  );
};
const Twitter = () => {
  return (
    <div className="">
      <FaTwitter className={commonClass + "text-[#1DA1F2]"} />
    </div>
  );
};
const Linkedin = () => {
  return (
    <div className="">
      <FaLinkedin className={commonClass + "text-[#0e76a8]"} />
    </div>
  );
};
const Instagram = () => {
  return (
    <div className="">
      <FaInstagram className={commonClass + "text-[#1DA1F2]"} />
    </div>
  );
};
const Website = () => {
  return (
    <div className="">
      <TiWorld className={commonClass + "text-[#1DA1F2]"} />
    </div>
  );
};
const Google = () => {
  return (
    <div className="">
      <FaGoogle className={commonClass + "text-[#1DA1F2]"} />
    </div>
  );
};
