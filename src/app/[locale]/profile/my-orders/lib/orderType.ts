export interface IOrderGet {
  uuid: "c9982de9-b19a-442a-9655-a80e7fd59d6d";
  orderStatus: "PENDING";
  totalAmount: 545.46;
  createdAt: "2024-11-29T14:51:15.704Z";
  items: IOrders[];
  payments: IOrderPayment[];
  address: IOrderAddress;
}

export interface IOrders {
  uuid: string;
  quantity: number;
  price: number;
  productId: string;
  finalPrice: number;
  product: {
    title: string;
    category: {
      categoryName: string;
      categoryNameBn: string;
    };
  };
}

export interface IOrderPayment {
  uuid: string;
  createdAt: string;
  method: "CARD" | "PAYPAL" | "BANK_TRANSFER" | "CASH_ON_DELIVERY" | "ONLINE";
  amount: number;
  status: "PENDING" | "COMPLETED" | "FAILED" | "CANCELED";
}

interface IOrderAddress {
  addressLine: string;
  district: {
    nameEn: string;
    nameBn: string;
  };
  division: {
    nameEn: string;
    nameBn: string;
  };
  thana: {
    nameEn: string;
    nameBn: string;
  };
}
