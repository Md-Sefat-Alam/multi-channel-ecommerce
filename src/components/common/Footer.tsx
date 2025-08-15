"use client";

import { Link } from "@/MUST_USE_Navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaLeaf,
  FaSeedling,
} from "react-icons/fa";
import {
  MdOutlineLocationOn,
  MdOutlineMailOutline,
  MdAccessTimeFilled,
  MdSend,
  MdOutlineArrowForward,
} from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import SelectLang from "../HeaderCom/SelectLang";

export default function Footer() {
  const t = useTranslations("footer");

  const socialLinks = [
    {
      href: "https://facebook.com",
      icon: <FaFacebookF size={18} />,
      label: "Facebook",
    },
    {
      href: "https://instagram.com",
      icon: <FaInstagram size={18} />,
      label: "Instagram",
    },
    {
      href: "https://youtube.com",
      icon: <FaYoutube size={18} />,
      label: "YouTube",
    },
  ];

  const quickLinks = [
    { name: t("quickLinks.home"), href: "/" },
    { name: t("quickLinks.store"), href: "/store" },
    { name: t("quickLinks.about"), href: "/about-us" },
    { name: t("quickLinks.farming"), href: "/farming" },
    { name: t("quickLinks.products"), href: "/products" },
  ];

  const latestPosts = [
    {
      title: t("latestPosts.0.title"),
      date: t("latestPosts.0.date"),
    },
    {
      title: t("latestPosts.1.title"),
      date: t("latestPosts.1.date"),
    },
  ];

  return (
    <footer className='bg-gradient-to-b from-slate-900 to-slate-950 text-white'>
      {/* Top Section with waves */}
      <div className='relative'>
        <svg
          className='absolute top-0 w-full transform -translate-y-full'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1440 120'
        >
          <path
            fill='#0f172a'
            fillOpacity='1'
            d='M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z'
          ></path>
        </svg>
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='flex flex-col md:flex-row justify-between items-center mb-10'>
          <div className='flex items-center mb-6 md:mb-0'>
            <div className='p-2 mr-3'>
              <Image
                src='/logo.svg'
                alt='Shuddha Logo'
                height={70}
                width={70}
              />
            </div>
            <div>
              <h2 className='text-2xl font-bold text-green-400'>Shuddha</h2>
              <p className='text-green-300 italic'>{t("tagline")}</p>
            </div>
          </div>

          <div className='flex space-x-4'>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                target='_blank'
                rel='noopener noreferrer'
                className='bg-green-600 hover:bg-green-500 p-3 rounded-full text-white transition-all duration-300'
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Border Accent */}
        <div className='relative py-2 mb-8'>
          <div className='border-b border-slate-700'></div>
          <div className='absolute -top-2 left-1/2 transform -translate-x-1/2 bg-slate-900 px-4'>
            <FaLeaf className='text-green-500' size={20} />
          </div>
        </div>

        {/* Grid Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* About */}
          <div>
            <h3 className='text-xl font-semibold text-green-400 mb-4'>
              {t("about.title")}
            </h3>
            <p className='text-slate-300 mb-4 leading-relaxed'>
              {t("about.description")}
            </p>
            <div className='mt-6'>
              <Link
                href='/about-us'
                className='inline-flex items-center text-green-400 hover:text-green-300 transition-colors duration-300'
              >
                {t("about.learnMore")}
                <MdOutlineArrowForward className='ml-2' size={16} />
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className='text-xl font-semibold text-green-400 mb-4'>
              {t("contact.title")}
            </h3>
            <ul className='space-y-3'>
              <li className='flex items-start'>
                <MdOutlineLocationOn
                  className='text-green-500 mr-3 mt-1'
                  size={20}
                />
                <span className='text-slate-300'>{t("contact.address")}</span>
              </li>
              <li className='flex items-center'>
                <FaPhoneAlt className='text-green-500 mr-3' size={16} />
                <span className='text-slate-300'>01322-330948</span>
              </li>
              <li className='flex items-center'>
                <MdOutlineMailOutline
                  className='text-green-500 mr-3'
                  size={18}
                />
                <span className='text-slate-300'>suddha@gmail.com</span>
              </li>
              <li className='flex items-center'>
                <MdAccessTimeFilled className='text-green-500 mr-3' size={18} />
                <span className='text-slate-300'>{t("contact.open")}</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-xl font-semibold text-green-400 mb-4'>
              {t("quickLinks.title")}
            </h3>
            <ul className='space-y-2'>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className='flex items-center text-slate-300 hover:text-white transition-colors duration-300'
                  >
                    <IoIosArrowForward
                      className='text-green-500 mr-2'
                      size={14}
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className='text-xl font-semibold text-green-400 mb-4'>
              {t("newsletter.title")}
            </h3>
            <p className='text-slate-300 mb-4'>{t("newsletter.description")}</p>
            <div className='relative'>
              <input
                type='email'
                placeholder={t("newsletter.placeholder")}
                className='w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-green-500'
              />
              <button className='absolute right-1 top-1 bg-green-600 hover:bg-green-500 text-white p-2 rounded-lg transition-colors duration-300'>
                <MdSend size={20} />
              </button>
            </div>
            <div className='mt-6'>
              <div className='flex items-center space-x-2'>
                <FaSeedling className='text-green-500' size={16} />
                <span className='text-slate-300 text-sm'>
                  {t("newsletter.tagline")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Posts */}
        <div className='mt-12 pt-8 border-t border-slate-800'>
          <h3 className='text-xl font-semibold text-green-400 mb-4'>
            {t("latestPosts.title")}
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {latestPosts.map((post, index) => (
              <div
                key={index}
                className='bg-slate-800/50 rounded-lg p-4 hover:bg-slate-800 transition-colors duration-300'
              >
                <h4 className='text-white font-medium mb-2'>{post.title}</h4>
                <div className='flex justify-between items-center'>
                  <span className='text-green-400 text-sm'>{post.date}</span>
                  <Link
                    href='#'
                    className='text-green-300 hover:text-white text-sm flex items-center transition-colors duration-300'
                  >
                    {t("latestPosts.readMore")}
                    <IoIosArrowForward className='ml-1' size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='bg-slate-950 py-4'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center'>
          <p className='text-slate-400 text-sm mb-2 md:mb-0'>
            © 2025 <span className='font-medium text-green-400'>Shuddha</span> -{" "}
            {t("bottomTagline")}
          </p>
          <div className='flex space-x-4'>
            <div className='flex items-center space-x-2 text-sm text-slate-400 '>
              Language: <SelectLang />
            </div>
            <Link
              href='/terms'
              className='text-slate-400 hover:text-white text-sm transition-colors duration-300'
            >
              {t("terms")}
            </Link>
            <Link
              href='/privacy'
              className='text-slate-400 hover:text-white text-sm transition-colors duration-300'
            >
              {t("privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
