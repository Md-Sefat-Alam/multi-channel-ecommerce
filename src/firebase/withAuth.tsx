"use client";

import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./firebase.init";
import { CgSpinner } from "react-icons/cg";
import { useRouter } from "@/MUST_USE_Navigation";
import { usePathname } from "next/navigation";

export default function withAuth(Component: any) {
  return function WithAuthComponent(props: any) {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
      if (!loading && !user) {
        console.log(path);
        router.push("/login" + `?redirect=${encodeURIComponent(path)}`);
      }
    }, [user, loading, router]);

    if (loading) {
      return (
        <div className='min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-500 to-transparent'>
          <CgSpinner className='animate-spin text-5xl text-blue-500 font-bold' />
        </div>
      );
    }
    if (!user) {
      return (
        <div className='min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-500 to-transparent'>
          <CgSpinner className='animate-spin text-5xl text-blue-500 font-bold' />
        </div>
      );
    }

    return <Component {...props} />;
  };
}
