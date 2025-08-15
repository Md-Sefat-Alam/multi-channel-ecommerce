"use client";

import { useEffect } from "react";
import { Spin } from "antd";
import { usePathname, useRouter } from "@/MUST_USE_Navigation";
import { useAuth } from "@/context/AuthContext";

export default function withAuth(Component: any) {
  return function WithAuthComponent(props: any) {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
      if (!user?.uuid && !isLoading) {
        router.push(`/login?redirect=${encodeURIComponent(path)}`);
      }
    }, [user, router, isLoading]);

    if (!user?.uuid) {
      return (
        <div className='min-h-screen flex justify-center items-center'>
          <Spin size='large' />
        </div>
      );
    }

    return <Component {...props} />;
  };
}
