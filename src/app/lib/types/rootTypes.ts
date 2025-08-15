type TProductUnit =
  | "KG"
  | "LITER"
  | "PIECES"
  | "METER"
  | "GRAM"
  | "ML"
  | "OTHER";
export interface IProduct {
  uuid: string;
  title: string;
  titleBn: string;
  subTitle: string;
  subTitleBn: string;
  description: string;
  descriptionBn: string;
  price: number;
  originalPrice: number | null;
  discount: number | null;
  finalPrice: number;
  stock?: number;
  lowStockAlert?: number;
  restockDate?: string;
  unitType: TProductUnit;
  categoryId: string;
  activeStatus: 1;
  createdBy: string;
  createdAt: string;
  updateInfoId?: string | null;
  slug?: string;
  slugBn?: string;
  metaTitle?: string;
  metaTitleBn?: string;
  metaDescription?: string;
  metaDescriptionBn?: string;
  tags: string[];
  tagsBn: string[];
  variants?: string | null;
  averageRating?: number | null;
  isFeaturedProduct?: boolean;
  featuredSortOrder?: number;
  images: IImage[];
  category?: ICategory;
}

export interface IImage {
  type: "PRODUCT";
  relatedId: 2;
  filename: string;
  mimetype: string;
  path: string;
  size: number;
  createdAt: string;
}

export interface ICategory {
  uuid: string;
  categoryName: string;
  categoryNameBn: string;
  categoryDescription?: string;
  categoryDescriptionBn?: string;
  createdBy: string;
  createdAt: string;
  activeStatus: 1;
}
export interface ICategoryWiseProducts {
  products: IProduct[];
  uuid: string;
  categoryName: string;
  categoryNameBn: string;
  categoryDescription?: string;
  categoryDescriptionBn?: string;
  createdBy: string;
  createdAt: string;
  activeStatus: 1;
}

export interface IHeroImages {
  uuid: string;
  heroTitle?: string;
  subTitle?: string;
  activeStatus: string;
  images: string;
}

export interface IWishlistItem {
  id: string; // product.uuid
  name: string; // product.title
  price: number; // product.finalPrice
  imageLink: string[]; // product.images.map(img => img.path)
}

export interface IAddWishlistResponse extends IWishlistItem {}

export interface IRemoveWishlistResponse {
  message: string;
}
