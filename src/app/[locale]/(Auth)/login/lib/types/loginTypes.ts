export interface ILoginForm {
  username: string;
  password: string;
}

export interface ILoginUser {
  uuid: string;
  userRole: "ADMIN";
  fullName: string;
  fullNameBn: string;
  mobileNumber: string;
  email: string;
  nationalID?: string;
  gender?: string;
  dob?: string;
  division?: string;
  district?: string;
  thana?: string;
  postalCode?: string;
  address?: string;
  userProfileImage?: string;
  nomineeFullName?: string;
  nomineeFullNameBn?: string;
  nomineeMobileNumber?: string;
  nomineeDob?: string;
  relationShip?: string;
  activeStatus: 1;
  remarks?: string;
  createdAt: string;
  createdBy?: string;
  updatedAt: string;
  updatedBy?: string;
}

export interface ILoginResponse {
  data: ILoginUser;
  authentication: {
    sessionId: string;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
}

export interface IUserGetType {
  uuid: string;
  userRole: "CUSTOMER";
  fullName: string;
  fullNameBn: string;
  mobileNumber: string;
  email: string;
  userProfileImage?: IImage[];
  gender: "FEMALE" | "MALE" | "OTHER";
  dob?: string;
  division?: string;
  district?: string;
  thana?: string;
  postalCode?: string;
  address?: string;
  relationShip?: string;
  activeStatus: 1;
}

export interface IUserUpdate {
  uuid?: string;
  fullName?: string; // Optional string
  mobileNumber?: string; // Optional string (you may use string if it's a formatted number)
  nationalID?: string; // Optional string (assuming National ID is a string)
  email?: string; // Optional string (email)
  dob?: string; // Optional string (date of birth as string, e.g., "YYYY-MM-DD")
  gender?: string; // Optional string (could be 'male', 'female', or other)

  // Other info
  postalCode?: string; // Optional string (postal code)
  division?: string; // Optional string (division name)
  district?: string; // Optional string (district name)
  thana?: string; // Optional string (thana or sub-district name)
  address?: string; // Optional string (full address)
  nidImageFront?: string; // Optional string (URL or base64 image)
  nidImageBack?: string; // Optional string (URL or base64 image)

  activeStatus?: 1;
}
