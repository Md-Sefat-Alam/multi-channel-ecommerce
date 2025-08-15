"use client";

import { openSans } from "@/app/fonts";
import "./style.css";
import {
  FaCow,
  FaPeopleGroup,
  FaLeaf,
  FaSeedling,
  FaHandHoldingHeart,
} from "react-icons/fa6";
import { HiLocationMarker, HiMail, HiPhone, HiClock } from "react-icons/hi";
import Image from "next/image";
import { FaShoppingBasket } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function AboutUs() {
  const t = useTranslations("about");

  return (
    <div className='min-h-screen flex flex-col'>
      {/* Hero Section with Parallax Effect */}
      <div
        className='relative h-[500px] bg-cover bg-center bg-no-repeat overflow-hidden'
        style={{
          backgroundImage: `url('https://demo.7iquid.com/donalfarm/wp-content/uploads/2024/08/pt-about-bg.webp')`,
        }}
      >
        <div className='absolute inset-0 bg-primary/50'></div>
        <div className='relative container mx-auto h-full px-4 flex items-center'>
          <div className='max-w-3xl'>
            <div
              className={`text-xl md:text-2xl font-bold text-secondary uppercase tracking-wider ${openSans.className}`}
            >
              {t("hero.tagline")}
            </div>
            <h1 className='text-4xl md:text-5xl font-bold text-white mt-2'>
              {t("hero.title")}
            </h1>
            <div className='flex space-x-2 mt-6 text-white'>
              <a href='/' className='hover:text-secondary transition'>
                {t("hero.breadcrumb.home")}
              </a>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 448 512'
                  className='w-4 h-4 inline'
                >
                  <path
                    d='M264.547 70.633L440.547 238.633C445.297 243.164 447.984 249.445 447.984 256.008S445.297 268.852 440.547 273.383L264.547 441.383C254.953 450.508 239.766 450.164 230.609 440.57C221.453 431.07 221.797 415.82 231.422 406.633L364.09 280.008H24C10.75 280.008 0 269.258 0 256.008S10.75 232.008 24 232.008H364.09L231.422 105.383C221.797 96.227 221.453 80.977 230.609 71.445C239.766 61.852 254.953 61.508 264.547 70.633Z'
                    fill='currentColor'
                  />
                </svg>
              </span>
              <span>{t("hero.breadcrumb.about")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className='py-16 md:py-24 px-4'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
            <div className='space-y-6'>
              <div className='inline-block px-4 py-2 bg-secondary/20 text-secondary rounded-full font-medium'>
                {t("intro.badge")}
              </div>
              <h2 className='text-3xl md:text-4xl font-bold text-primary'>
                {t("intro.title")}
              </h2>
              <p className='text-2xl md:text-3xl font-semibold text-gray-800'>
                {t("intro.subtitle")}
              </p>
              <div className='h-1 w-24 bg-secondary rounded'></div>
              <p className='text-gray-700 leading-relaxed'>
                {t("intro.para1")}
              </p>
              <p className='text-gray-700 leading-relaxed'>
                {t("intro.para2")}
              </p>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300'>
                <img
                  src='https://demo.7iquid.com/donalfarm/wp-content/uploads/2024/06/pt-bg-events.webp'
                  alt='Organic Farming'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='rounded-2xl overflow-hidden shadow-lg transform translate-y-8 hover:scale-105 transition duration-300'>
                <img
                  src='https://demo.7iquid.com/donalfarm/wp-content/uploads/2024/07/pt-bg-services.webp'
                  alt='Fresh Products'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='rounded-2xl overflow-hidden shadow-lg transform translate-y-4 hover:scale-105 transition duration-300'>
                <img
                  src='https://demo.7iquid.com/donalfarm/wp-content/uploads/2024/09/shop-pt-bg.webp'
                  alt='Organic Products'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300'>
                <img
                  src='https://demo.7iquid.com/donalfarm/wp-content/uploads/2024/08/pt-about-bg.webp'
                  alt='Farm View'
                  className='w-full h-full object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className='py-16 bg-bg-light-gray'>
        <div className='container mx-auto px-4'>
          <div className='text-center max-w-3xl mx-auto mb-16'>
            <div className='inline-block px-4 py-2 bg-secondary/20 text-secondary rounded-full font-medium mb-4'>
              {t("promise.badge")}
            </div>
            <h2 className='text-3xl md:text-5xl font-bold text-primary'>
              {t("promise.title").split("Freshness")[0]}
              <span className='text-secondary-bright'>
                {t("promise.title").split(" ")[2]}
              </span>
              {t("promise.title").split("Freshness")[1]}
            </h2>
            <div className='h-1 w-24 bg-secondary rounded mx-auto mt-6'></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='bg-white rounded-2xl p-6 shadow-lg transform hover:-translate-y-2 transition duration-300'>
              <div className='bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6'>
                <FaLeaf className='text-primary text-2xl' />
              </div>
              <h3 className='text-xl font-bold text-primary mb-3'>
                {t("promise.features.organic.title")}
              </h3>
              <p className='text-gray-600'>
                {t("promise.features.organic.desc")}
              </p>
            </div>

            <div className='bg-white rounded-2xl p-6 shadow-lg transform hover:-translate-y-2 transition duration-300'>
              <div className='bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6'>
                <FaSeedling className='text-primary text-2xl' />
              </div>
              <h3 className='text-xl font-bold text-primary mb-3'>
                {t("promise.features.quality.title")}
              </h3>
              <p className='text-gray-600'>
                {t("promise.features.quality.desc")}
              </p>
            </div>

            <div className='bg-white rounded-2xl p-6 shadow-lg transform hover:-translate-y-2 transition duration-300'>
              <div className='bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6'>
                <FaHandHoldingHeart className='text-primary text-2xl' />
              </div>
              <h3 className='text-xl font-bold text-primary mb-3'>
                {t("promise.features.service.title")}
              </h3>
              <p className='text-gray-600'>
                {t("promise.features.service.desc")}
              </p>
            </div>

            <div className='bg-white rounded-2xl p-6 shadow-lg transform hover:-translate-y-2 transition duration-300'>
              <div className='bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6'>
                <FaShoppingBasket className='text-primary text-2xl' />
              </div>
              <h3 className='text-xl font-bold text-primary mb-3'>
                {t("promise.features.diversity.title")}
              </h3>
              <p className='text-gray-600'>
                {t("promise.features.diversity.desc")}
              </p>
            </div>
          </div>

          <div className='mt-16 text-center'>
            <p className='text-2xl md:text-3xl text-primary font-semibold max-w-4xl mx-auto'>
              {t("promise.bottomLine").split("food hygiene")[0]}
              <a
                href='https://web.suddha.com.bd/en'
                className='text-secondary-bright hover:underline'
              >
                {t("promise.bottomLine").split(" ")[5]}{" "}
                {t("promise.bottomLine").split(" ")[6]}{" "}
                {t("promise.bottomLine").split(" ")[7]}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className='py-16 bg-primary relative overflow-hidden'>
        <div className='absolute inset-0 opacity-10'>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
            <pattern
              id='pattern-circles'
              x='0'
              y='0'
              width='50'
              height='50'
              patternUnits='userSpaceOnUse'
              patternContentUnits='userSpaceOnUse'
            >
              <circle
                id='pattern-circle'
                cx='10'
                cy='10'
                r='2'
                fill='#fff'
              ></circle>
            </pattern>
            <rect
              id='rect'
              x='0'
              y='0'
              width='100%'
              height='100%'
              fill='url(#pattern-circles)'
            ></rect>
          </svg>
        </div>

        <div className='container mx-auto px-4 relative'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
            <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white'>
              <h3 className='text-3xl font-bold mb-6'>{t("impact.title")}</h3>
              <p className='mb-6'>{t("impact.desc1")}</p>
              <p>{t("impact.desc2")}</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center'>
                <div className='flex justify-center'>
                  <FaCow size={40} className='text-secondary-bright' />
                </div>
                <h4 className='text-xl font-semibold text-white mt-4'>
                  {t("impact.stats.products.title")}
                </h4>
                <div className='flex justify-center items-baseline mt-2'>
                  <span className='text-5xl font-bold text-secondary-bright'>
                    {t("impact.stats.products.value").split("+")[0]}
                  </span>
                  <span className='text-3xl font-bold text-white ml-1'>+</span>
                </div>
              </div>

              <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center'>
                <div className='flex justify-center'>
                  <FaPeopleGroup size={40} className='text-secondary-bright' />
                </div>
                <h4 className='text-xl font-semibold text-white mt-4'>
                  {t("impact.stats.clients.title")}
                </h4>
                <div className='flex justify-center items-baseline mt-2'>
                  <span className='text-5xl font-bold text-secondary-bright'>
                    {t("impact.stats.clients.value").split("+")[0]}
                  </span>
                  <span className='text-3xl font-bold text-white ml-1'>+</span>
                </div>
              </div>

              <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center col-span-full'>
                <h4 className='text-xl font-semibold text-white mb-2'>
                  {t("impact.stats.production.title")}
                </h4>
                <div className='w-full bg-white/20 h-2 rounded-full mt-4'>
                  <div
                    className='bg-secondary-bright h-2 rounded-full'
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <div className='flex justify-between text-white mt-2 text-sm'>
                  <span>0 kg</span>
                  <span>{t("impact.stats.production.progress")}</span>
                  <span>1000 kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className='py-16 bg-secondary/10'>
        <div className='container mx-auto px-4'>
          <div className='text-center max-w-3xl mx-auto mb-16'>
            <div className='inline-block px-4 py-2 bg-primary/10 text-primary rounded-full font-medium mb-4'>
              {t("missionVision.badge")}
            </div>
            <h2 className='text-3xl md:text-4xl font-bold text-primary'>
              {t("missionVision.title")}
            </h2>
            <div className='h-1 w-24 bg-primary rounded mx-auto mt-6'></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className='bg-white rounded-2xl overflow-hidden shadow-lg group'>
              <div className='h-48 bg-primary flex items-center justify-center group-hover:bg-secondary transition duration-300'>
                <svg
                  className='w-20 h-20 text-white'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'
                >
                  <path d='M176 24c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H24c-13.3 0-24 10.7-24 24s10.7 24 24 24h104v200c0 13.3 10.7 24 24 24s24-10.7 24-24V136h104c13.3 0 24-10.7 24-24s-10.7-24-24-24H176V24zM465 239c-13.3 0-24 10.7-24 24v192H334v-82.8c0-17-6.7-33.3-18.7-45.3L272 283.7V480c0 17.7 14.3 32 32 32h240c17.7 0 32-14.3 32-32V263c0-13.3-10.7-24-24-24h-87z' />
                </svg>
              </div>
              <div className='p-8'>
                <h3 className='text-2xl font-bold text-primary mb-4'>
                  {t("missionVision.mission.title")}
                </h3>
                <p className='text-gray-700'>
                  {t("missionVision.mission.desc")}
                </p>
              </div>
            </div>

            <div className='bg-white rounded-2xl overflow-hidden shadow-lg group'>
              <div className='h-48 bg-secondary flex items-center justify-center group-hover:bg-primary transition duration-300'>
                <svg
                  className='w-20 h-20 text-white'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 576 512'
                >
                  <path d='M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z' />
                </svg>
              </div>
              <div className='p-8'>
                <h3 className='text-2xl font-bold text-primary mb-4'>
                  {t("missionVision.vision.title")}
                </h3>
                <p className='text-gray-700'>
                  {t("missionVision.vision.desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
            {/* Contact Info */}
            <div className='bg-primary text-white rounded-2xl overflow-hidden'>
              <div className='p-8'>
                <h3 className='text-3xl font-bold mb-8'>
                  {t("contact.title")}
                </h3>

                <div className='space-y-6'>
                  <div className='flex items-start space-x-4'>
                    <div className='bg-white/10 p-3 rounded-full'>
                      <HiLocationMarker className='text-secondary-bright text-xl' />
                    </div>
                    <div>
                      <h4 className='text-xl font-semibold mb-2'>
                        {t("contact.info.address.title")}
                      </h4>
                      <p className='text-white/80'>
                        {t("contact.info.address.desc")
                          .split("\n")
                          .map((line, index) => (
                            <span key={index}>
                              {line}
                              <br />
                            </span>
                          ))}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start space-x-4'>
                    <div className='bg-white/10 p-3 rounded-full'>
                      <HiMail className='text-secondary-bright text-xl' />
                    </div>
                    <div>
                      <h4 className='text-xl font-semibold mb-2'>
                        {t("contact.info.email.title")}
                      </h4>
                      <p className='text-white/80'>
                        {t("contact.info.email.desc")}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start space-x-4'>
                    <div className='bg-white/10 p-3 rounded-full'>
                      <HiPhone className='text-secondary-bright text-xl' />
                    </div>
                    <div>
                      <h4 className='text-xl font-semibold mb-2'>
                        {t("contact.info.phone.title")}
                      </h4>
                      <p className='text-white/80'>
                        {t("contact.info.phone.desc")}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start space-x-4'>
                    <div className='bg-white/10 p-3 rounded-full'>
                      <HiClock className='text-secondary-bright text-xl' />
                    </div>
                    <div>
                      <h4 className='text-xl font-semibold mb-2'>
                        {t("contact.info.hours.title")}
                      </h4>
                      <p className='text-white/80'>
                        {t("contact.info.hours.desc")
                          .split("\n")
                          .map((line, index) => (
                            <span key={index}>
                              {line}
                              <br />
                            </span>
                          ))}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='mt-10'>
                  <h4 className='text-xl font-semibold mb-4'>
                    {t("contact.whyUs.title")}
                  </h4>
                  <ul className='space-y-3'>
                    <li className='flex items-center'>
                      <svg
                        className='w-5 h-5 text-secondary-bright mr-3'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                      {t("contact.whyUs.list.1")}
                    </li>
                    <li className='flex items-center'>
                      <svg
                        className='w-5 h-5 text-secondary-bright mr-3'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          name='check'
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                      {t("contact.whyUs.list.2")}
                    </li>
                    <li className='flex items-center'>
                      <svg
                        className='w-5 h-5 text-secondary-bright mr-3'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                      {t("contact.whyUs.list.3")}
                    </li>
                  </ul>
                </div>
              </div>

              <div className='mt-6'>
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d977.7995331461227!2d88.27156352850047!3d24.5968536986257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbb7e4da36eced%3A0xf100634e6555a6a4!2zU3VkZGhhLCAn4Ka24KeB4Kam4KeN4KanJyDgpqzgpr_gprbgp4Hgpqbgp43gpqfgpqTgpr7gprAg4Kaq4KeN4Kaw4Kak4Ka_4Ka24KeN4Kaw4KeB4Kak4Ka_!5e1!3m2!1sen!2sbd!4v1743742172636!5m2!1sen!2sbd'
                  className='w-full h-64'
                  style={{ border: 0 }}
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className='bg-bg-light-gray rounded-2xl p-8'>
              <h3 className='text-3xl font-bold text-primary mb-6'>
                {t("contact.formTitle")}
              </h3>
              <p className='text-xl text-primary mb-2'>
                {t("contact.formSubtitle")}
              </p>
              <p className='text-gray-600 mb-8'>{t("contact.formDesc")}</p>

              <form className='space-y-6'>
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {t("contact.form.name")}
                  </label>
                  <input
                    type='text'
                    id='name'
                    placeholder={t("contact.form.name")}
                    className='w-full p-4 bg-white placeholder-gray-400 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent'
                  />
                </div>

                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {t("contact.form.email")}
                  </label>
                  <input
                    type='email'
                    id='email'
                    placeholder={t("contact.form.email")}
                    className='w-full p-4 bg-white placeholder-gray-400 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent'
                  />
                </div>

                <div>
                  <label
                    htmlFor='phone'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {t("contact.form.phone")}
                  </label>
                  <input
                    type='tel'
                    id='phone'
                    placeholder={t("contact.form.phone")}
                    className='w-full p-4 bg-white placeholder-gray-400 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent'
                  />
                </div>

                <div>
                  <label
                    htmlFor='message'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    id='message'
                    rows={6}
                    placeholder={t("contact.form.message")}
                    className='w-full p-4 bg-white placeholder-gray-400 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent'
                  ></textarea>
                </div>

                <button
                  type='submit'
                  className='w-full py-4 px-6 bg-primary text-white font-bold text-lg rounded-lg shadow-md hover:bg-primary/90 transition duration-300 flex items-center justify-center'
                >
                  {t("contact.form.submit")}
                  <svg
                    className='ml-2 w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M14 5l7 7m0 0l-7 7m7-7H3'
                    ></path>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
