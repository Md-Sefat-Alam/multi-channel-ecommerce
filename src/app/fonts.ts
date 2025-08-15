import { Hind_Siliguri, Poppins, Open_Sans } from "next/font/google";

// Define fonts with required subsets and weights
export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-poppins", // Custom CSS variable
    display: "swap",
});

export const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-open-sans",
    display: "swap",
});

export const hindSiliguri = Hind_Siliguri({
    subsets: ["bengali", "latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-hind-siliguri",
    display: "swap",
});
