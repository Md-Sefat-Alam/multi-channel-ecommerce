import { useRouter } from "@/MUST_USE_Navigation";
import { message } from "antd";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface MessageGroupContextType {
  key: string;
  loading_content?: string;
  success_content?: string;
  error_content?: string;
  duration?: number;
  success_url?: string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: any;
}

const initialValues = {
  key: "key",
  loading_content: "Loading...",
  success_content: "Success",
  duration: 3,
  error_content: "Something went wrong!",
  success_url: undefined,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: "Something went wrong",
};

const MessageGroupContext = createContext<
  { notify: (values: MessageGroupContextType) => void } | undefined
>(undefined);

export function MessageGroupProvider({ children }: { children: ReactNode }) {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const [status, setStatus] = useState<MessageGroupContextType>(initialValues);

  useEffect(() => {
    if (status.isLoading) {
      messageApi.open({
        key: status.key,
        type: "loading",
        content: status.loading_content || "Loading...",
        duration: status.duration || 3,
      });
    }
    if (status.isSuccess) {
      messageApi
        .open({
          key: status.key,
          type: "success",
          content: status.success_content || "Success",
          duration: status.duration || 3,
        })
        .then(() => {
          setStatus(initialValues);
        });
      status.success_url ? router.push(status.success_url) : null;
    } else if (status.isError) {
      console.error({
        error: status?.error,
        message: status.error?.data?.message,
        errorContent: status.error_content,
      });
      messageApi
        .open({
          key: status.key,
          type: "error",
          content: status.error?.data?.message || status.error_content,
          duration: status.duration || 3,
        })
        .then(() => {
          setStatus(initialValues);
        });
    }

    setTimeout(() => {
      setStatus(initialValues);
    }, (status.duration || 3) * 1000);
  }, [status]);

  const setValues = (values: MessageGroupContextType) => {
    setStatus((prev) => ({ ...prev, ...values }));
  };

  return (
    <MessageGroupContext.Provider value={{ notify: setValues }}>
      {contextHolder}
      {children}
    </MessageGroupContext.Provider>
  );
}

export function useMessageGroup() {
  const context = useContext(MessageGroupContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
