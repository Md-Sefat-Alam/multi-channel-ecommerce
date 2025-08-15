export interface ISliderData {
  id: number;
  heroTitle: string;
  subTitle: string;
  buttonLink?: string;
  images: string;
  products?: IHeroProduct[];
  isProductView?: boolean;

  position:
    | "top_right"
    | "bottom_right"
    | "top_left"
    | "bottom_left"
    | "left_center"
    | "right_center"
    | "center"
    | "top_center"
    | "bottom_center";
}

export interface IHeroProduct {
  uuid: string;
  title: string;
  subTitle: string;
  price: number;
  originalPrice: null;
  discount: number;
  finalPrice: number;
  unitType: string;
  categoryId: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  variants: string;
  averageRating: number;
  heroImageUuid: string;
  images: IImage[];
}
export interface INavLink {
  id: number;
  title: string;
  icon?: React.ReactNode;
  href: string;
}
