import React from "react";
import "./Offers.css";
import { Button } from "antd";
import classNames from "classnames";
import * as motion from "framer-motion/client";
import { Variants } from "framer-motion";

type Props = { url: string; title: string; offerTitle: string };

const cardVariants: Variants = {
    offscreen: {
        x: -300,
        y: 100,
    },
    onscreen: {
        x: 0,
        y: 100,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
};

export default function OffersCard({ url, title, offerTitle }: Props) {
    return (
        <div
            className='relative min-h-[550px] bg-no-repeat bg-cover bg-center rounded-xl bg-green-500/5 overflow-hidden'
            style={{
                backgroundImage: `url('${url}')`,
            }}
        >
            {/* Bookmark Effect */}
            {/* <motion.div
                className='card-container'
                initial='offscreen'
                whileInView='onscreen'
                viewport={{ once: false, amount: 0.8 }}
            >
                <motion.div className='card' variants={cardVariants}> */}
            <div className='absolute top-1/4 inline-block pr-[80px] left-0 h-[50px] bg-[--secondary] shadow-xl bookmark '>
                <div className='bookmark-tail'></div>
                <h2 className='text-xl leading-[3rem] ml-2 font-bold text-[--primary] inline'>
                    {offerTitle}
                </h2>
                <div className='border-white border-2 rounded-full h-[70px] w-[70px] flex flex-col justify-center items-center text-center font-bold absolute -top-3 right-1 bg-[--primary] text-white shadow-xl'>
                    <span className='text-2xl leading-none'>30%</span>{" "}
                    <small className='leading-none font-extrabold'>
                        OFF
                    </small>
                </div>
            </div>
            {/* </motion.div>
            </motion.div> */}

            {/* Bottom Text */}
            <div
                className={classNames(
                    "font-poppins",
                    "absolute top-1/2 ml-4 w-4/5 flex flex-col gap-2"
                )}
            >
                <h2 className='bg-[--secondary-0-2] inline rounded-xl p-3 text-xl'>
                    {title}
                </h2>
                <p
                    className={classNames(
                        "bg-[--secondary-0-2] inline rounded-xl p-3"
                    )}
                >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quasi, quisquam?
                </p>
                <div>
                    <Button
                        type='link'
                        size='large'
                        className='!text-[--primary]'
                    >
                        Get It...
                    </Button>
                </div>
            </div>
        </div>
    );
}
