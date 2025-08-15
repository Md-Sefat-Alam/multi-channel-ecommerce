import { useState } from "react";
import { GalleryContext, IGalleryContext } from "./GalleryEditContext";

export const GalleryContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [galleryEditId, setGalleryEditId] = useState<string>("");
  const [isGalleryEdit, setIsGalleryEdit] = useState<boolean>(false);
  const [getUpdate, setGetUpdate] = useState("");
  const changeGalleryEdit = (_id: string, isEdit: boolean) => {
    setGalleryEditId(_id);
    setIsGalleryEdit(isEdit);
  };

  const updateGet = (num: string) => {
    setGetUpdate(num);
  };

  return (
    <GalleryContext.Provider
      value={{
        _id: galleryEditId,
        isEdit: isGalleryEdit,
        setData: changeGalleryEdit,
        updateState: getUpdate,
        setGetUpdate: updateGet,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};
