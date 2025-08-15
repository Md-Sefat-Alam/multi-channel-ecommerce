"use server";

import { revalidatePath } from "next/cache";
import { BASE_URL } from "@/constant/Defaults";
import { getDecryptedData } from "@/utils/crypto/encryption";
type User = {
  id: number;
  uuid: string;
  userRoleId: number;
  fullName: string;
  fullNameBn: string | null;
  mobileNumber: string;
  email: string;
  password: string;
  nationalID: string | null;
  gender: string | null;
  dob: string | null;
  activeStatus: number;
  remarks: string | null;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string;
  updatedBy: string | null;
};

type IGETResponse<T> = {
  data: T;
  total?: number;
  success: boolean;
};

export type IReviewList = {
  uuid: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: User;
};
export const serverFetch = async <T>(
  url: string,
  method = "GET",
  body: any = null
): Promise<IGETResponse<T>> => {
  try {
    const token = getDecryptedData("token");
    const options: any = {
      method,
      headers: {
        Authorization: `Bearer ${token ? token : ""}`, // Include token in Authorization header
      },
      cache: "no-store",
    };

    // Check if body is FormData or plain JSON
    if (body) {
      if (body instanceof FormData) {
        options.body = body; // Attach FormData directly
        // Do not set Content-Type, FormData will set it automatically
      } else {
        options.body = JSON.stringify(body); // For JSON body
        options.headers["Content-Type"] = "application/json"; // Explicit Content-Type for JSON
      }
    }

    const response = await fetch(BASE_URL + url, options);

    if (!response.ok) {
      throw new Error(`Request failed! Status: ${response.status}`);
    }

    return await response.json(); // Parse and return JSON response
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow for the caller to handle
  }
};

export async function revalidateReviews() {
  revalidatePath("/client/product/get-review");
}
