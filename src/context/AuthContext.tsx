"use client";
import { BASE_URL_DEV } from "@/lib/api/apiSlice";
import StoreProvider from "@/lib/StoreProvider";
import { useRouter } from "@/MUST_USE_Navigation";
import { IUser, IUserRes } from "@/types/common";
import {
  decryptData,
  encryptData,
  getDecryptedData,
  setEncryptedData,
} from "@/utils/crypto/encryption";
import Cookies from "js-cookie"; // Import the js-cookie library
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { MessageGroupProvider } from "./MessageGroup";

interface AuthContextType {
  user: IUser | undefined;
  login: (userData: IUserRes) => void;
  logout: () => void;
  token?: string;
  isLoading: boolean;
  updateUser: (userData: IUser) => void;
  RedirectUrl: undefined | string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUserRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  let RedirectUrl: undefined | string = undefined;

  const navigate = () => {
    if (RedirectUrl) {
      router.push(RedirectUrl);
      RedirectUrl = undefined;
    }
  };

  // Function to verify accessToken
  const verifyToken = async (
    token: string,
    sessionId: string,
    refreshToken: string,
  ) => {
    try {
      // Verify accessToken using /auth/verify
      const verifyResponse = await fetch(BASE_URL_DEV + "/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken: token }),
      });

      if (verifyResponse.ok) {
        // Token is valid
        return;
      }

      // If token is invalid, attempt to refresh it
      if (verifyResponse.status === 401) {
        const refreshResponse = await fetch(BASE_URL_DEV + "/auth/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, refreshToken }),
        });

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();

          // Update tokens in localStorage and cookies
          setEncryptedData("token", data.accessToken, 1); // Encrypt and store token in cookies
          return;
        }
      }

      // If refreshing fails, logout the user
      RedirectUrl = "/login";
      setUser(null);
      logout();
    } catch (error) {
      console.error("Error verifying token:", error);
      setUser(null);
      RedirectUrl = "/login";
      logout();
    }
  };

  // Function to retrieve and decrypt user data from localStorage
  const loadUserFromStorage = async () => {
    setIsLoading(true);
    const encryptedUser = localStorage.getItem("userData");
    const token = getDecryptedData("token"); // Get token from cookies
    const sessionId = getDecryptedData("sessionId");
    // const refreshToken = Cookies.get("refreshToken");
    const refreshToken = getDecryptedData("refreshToken");

    if (token && sessionId && refreshToken && encryptedUser) {
      // Verify token and refresh if necessary
      await verifyToken(token, sessionId, refreshToken);

      if (encryptedUser) {
        const decryptedUser = decryptData(encryptedUser);
        if (decryptedUser) {
          setUser(decryptedUser);
        }
      } else {
        logout();
      }
    } else {
      logout();
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadUserFromStorage(); // Load user on page reload
  }, []);

  const login = (userData: IUserRes) => {
    // Encrypt and store user data in localStorage and cookies
    const encryptedUserData = encryptData(userData); // Encrypt the whole user object
    localStorage.setItem("userData", encryptedUserData); // Store encrypted user in localStorage
    setEncryptedData("token", userData.authentication.accessToken, 1); // Encrypt and store token in cookies
    setEncryptedData("sessionId", userData.authentication.sessionId, 30); // Store sessionId in cookies
    setEncryptedData("refreshToken", userData.authentication.refreshToken, 30);

    setUser(userData);
    RedirectUrl = "/";
    navigate();
  };

  const updateUser = (userData: IUser) => {
    if (user) {
      const updatedData: IUserRes = {
        ...user,
        data: userData,
      };

      console.log({ user, updatedData });

      // Encrypt and update the user object in localStorage
      const encryptedUserData = encryptData(updatedData);
      localStorage.setItem("userData", encryptedUserData);

      // Update state with the decrypted user data
      const decryptedUser = decryptData(encryptedUserData);
      if (decryptedUser) {
        setUser(decryptedUser);
      }
    }
  };

  const logout = () => {
    // Clear user data from localStorage and cookies
    setUser(null);
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    Cookies.remove("sessionId");
    localStorage.removeItem("userData");
    navigate(); // Navigate to home page on logout
  };

  const token = () => {
    return user?.authentication.accessToken;
  };

  return (
    <AuthContext.Provider
      value={{
        user: user?.data,
        login,
        logout,
        token: token(),
        isLoading,
        updateUser,
        RedirectUrl,
      }}
    >
      <StoreProvider>
        <MessageGroupProvider>{children}</MessageGroupProvider>
      </StoreProvider>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
