"use client";
import {
    CartItem,
    setCartItems
} from "@/lib/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/hooks";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useEffect, useRef } from "react";
import HeaderTopBar from "../common/HeaderTopBar";
import NavBar from "../common/NavBar";
import TopSearchBar from "../TopSearchBar/TopSearchBar";

type Props = {};

export default function HeaderWrapper({ }: Props) {
    const getHeightRef1 = useRef<HTMLDivElement>(null);
    const getHeightRef2 = useRef<HTMLDivElement>(null);
    const getHeightRef3 = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (
            getHeightRef1.current &&
            getHeightRef2.current &&
            getHeightRef3.current
        ) {
            const headerHeight1 = getHeightRef1.current.offsetHeight;
            const headerHeight2 = getHeightRef2.current.offsetHeight;
            const headerHeight3 = getHeightRef3.current.offsetHeight;
            // Set the height as a global CSS variable

            document.documentElement.style.setProperty(
                "--header-height",
                `${headerHeight1 + headerHeight2 + headerHeight3}px`
            );

            if (typeof window !== "undefined" && localStorage) {
                const cart = localStorage?.getItem("cart") || "[]";
                const items: CartItem[] = JSON.parse(cart);
                dispatch(setCartItems(items));
            }
        }
    }, [getHeightRef1.current, getHeightRef2.current, getHeightRef3.current, dispatch]);

    return (
        <>
            <ProgressBar
                height='4px'
                options={{ showSpinner: false }}
                shallowRouting={true}
            />
            {/* Only show top bar and search on non-mobile */}
            <div className="">
                <HeaderTopBar getHeightRef1={getHeightRef1} />
                <TopSearchBar getHeightRef2={getHeightRef2} />
            </div>
            <NavBar getHeightRef3={getHeightRef3} />
        </>
    );
}