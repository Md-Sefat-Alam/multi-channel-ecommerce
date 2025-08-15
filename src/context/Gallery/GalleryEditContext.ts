import { createContext, useContext } from "react";

export interface IGalleryContext {
  _id: string;
  isEdit: boolean;
  setData(_id: string, isEdit: boolean): void;
  updateState: string;
  setGetUpdate(num: string): void;
}

export const GalleryContext = createContext<IGalleryContext>({
  _id: "",
  isEdit: false,
  setData: () => {},
  updateState: "0",
  setGetUpdate: () => {},
});

export const useGalleryEditContext = () => {
  const context = useContext(GalleryContext);
  return context;
};
