interface IAddress {
  divisionId: string;
  districtId: string;
  thanaId: string;
  postalCode: string;
  addressLine: string;
}

interface IProductItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface IOrder {
  userId: string;
  totalAmount: number;
  address: IAddress;
  paymentMethod: "COD";
  items: IProductItem[];
  remarks?: string; // Optional, in case remarks are not always provided
}

export interface IPaymentResponse {
  payment: {
    uuid: string;
    orderId: string;
    userId: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    method: "ONLINE";
    amount: number;
    createdAt: string;
    updatedAt: string;
  };
  redirectUrl: string;
}
