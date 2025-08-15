"use client";
import { Link } from "@/MUST_USE_Navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import Title from "@/components/common/Title";
import { useAuth } from "@/context/AuthContext";
import { useMessageGroup } from "@/context/MessageGroup";
import { Button, Form, FormProps, Input } from "antd";
import { useLoginMutation } from "./lib/api/loginApi";
import { ILoginForm } from "./lib/types/loginTypes";
import { useRouter } from "@/MUST_USE_Navigation";

const onFinishFailed: FormProps<ILoginForm>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

type Props = {};

export default function page({}: Props) {
  const tr = useTranslations("login");
  const [form] = Form.useForm();
  const { login, token, isLoading: authLoading, logout } = useAuth();
  const [loginPost, { isError, isLoading, isSuccess, error, data }] =
    useLoginMutation();
  const { notify } = useMessageGroup();
  const router = useRouter();
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;
  const redirect = searchParams?.get("redirect") || "/";

  useEffect(() => {
    notify({
      isError,
      isLoading,
      isSuccess,
      key: "login-Message-Group",
      error,
      success_content: "Successfully Logged-in!",
      success_url: redirect,
    });

    if (isSuccess) {
      login(data);
    }
  }, [isError, isLoading, isSuccess, error]);

  // If already loggedIn going to redirect, else if not token getting logout!
  useEffect(() => {
    if (token && !authLoading) {
      router.push(redirect);
    } else {
      logout();
    }
  }, [token, authLoading]);

  return (
    <div className='bg-gradient-to-b min-h-screen'>
      <div className='container mx-auto min-h-screen flex justify-center items-start mt-[80px]'>
        <div className='lg:w-3/4 sm:w-11/12 w-full mx-2 min-h-full md:mx-auto rounded-xl shadow-xl flex md:flex-row flex-col justify-center items-center'>
          <div
            className={`md:w-1/2 w-[350px] md:min-h-[500px] h-[250px] flex justify-center items-center`}
          >
            <Title addAfter title='Login Now' />
          </div>
          <div className='md:w-1/2 w-11/12 sm:mr-8'>
            <Form
              form={form}
              name='basic'
              initialValues={{ remember: true }}
              onFinish={loginPost}
              onFinishFailed={onFinishFailed}
              layout='vertical'
              size='large'
            >
              <Form.Item<ILoginForm>
                label={tr("email")}
                name={["username"]}
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input placeholder={tr("type") + ": admin@admin.com"} />
              </Form.Item>

              <Form.Item<ILoginForm>
                label={tr("password")}
                name={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password placeholder={tr("type") + ": admin@"} />
              </Form.Item>

              <p className='text-sm'>
                Create a{" "}
                <Link className='text-[--secondary]' href={"/register"}>
                  new account
                </Link>
                .
              </p>

              <div className='flex justify-end'>
                <Form.Item>
                  <Button type='primary' htmlType='submit'>
                    Login
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
