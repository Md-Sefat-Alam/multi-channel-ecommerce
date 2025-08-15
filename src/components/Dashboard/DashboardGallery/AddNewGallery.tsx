"use client";
import { useGalleryEditContext } from "@/context/Gallery/GalleryEditContext";
import { IGalleryData } from "@/types/gallery";
import { useTranslations } from "next-intl";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaUpload } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "react-toastify";

type Props = {
  setGalleryData: Dispatch<SetStateAction<IGalleryData[]>>;
  imageData: IGalleryData[];
};

export default function AddNewGallery({ setGalleryData, imageData }: Props) {
  const tr = useTranslations("dashboard");
  const [isAddNew, setIsAddNew] = useState(false);
  const galleryImageRef = useRef<HTMLInputElement | null>(null);
  const galleryAddNewImagePreviewRef = useRef<HTMLImageElement | null>(null);

  const galleryTitleRef = useRef<HTMLInputElement | null>(null);
  const galleryDescriptionRef = useRef<HTMLInputElement | null>(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const { _id, isEdit, setData, setGetUpdate } = useGalleryEditContext();

  const handleImagePreview = () => {
    if (
      galleryImageRef?.current?.files &&
      galleryImageRef?.current?.files[0] &&
      galleryAddNewImagePreviewRef?.current
    ) {
      const oFReader = new FileReader();
      oFReader.readAsDataURL(galleryImageRef.current.files[0]);

      oFReader.onload = (oFREvent) => {
        if (galleryAddNewImagePreviewRef?.current?.src) {
          galleryAddNewImagePreviewRef.current.src = oFREvent?.target
            ?.result as string;
        }
      };
    } else {
      if (galleryAddNewImagePreviewRef.current) {
        galleryAddNewImagePreviewRef.current.src = "";
      }
    }
  };

  const resetForm = () => {
    if (galleryTitleRef.current) galleryTitleRef.current.value = "";
    if (galleryDescriptionRef.current) galleryDescriptionRef.current.value = "";
    if (galleryImageRef.current) galleryImageRef.current.value = "";
    if (galleryAddNewImagePreviewRef.current)
      galleryAddNewImagePreviewRef.current.src = "";
  };

  const handleAddNew = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = galleryTitleRef?.current?.value;
    const description = galleryDescriptionRef?.current?.value;
    const image = galleryImageRef.current?.files?.[0];

    if (!title || !description || !image) {
      toast("Please fill in all fields", { type: "error" });
      return;
    }

    setBtnLoading(true);
    const galleryFormData = new FormData();
    galleryFormData.append("title", title);
    galleryFormData.append("description", description);
    galleryFormData.append("image", image);
    galleryFormData.append("postDate", new Date().toLocaleDateString());
    galleryFormData.append("postTime", new Date().toLocaleTimeString());

    fetch(
      "https://agrani-doer-backend-ro9fiezz5-mdsefatalams-projects.vercel.app/gallery",
      {
        method: "POST",
        body: galleryFormData,
      }
    )
      .then((response) => response.json())
      .then(async (result) => {
        if (result.insertedId) {
          toast(`Added a new gallery item \n Id: ${result.insertedId}`, {
            type: "success",
          });

          await fetch(
            "https://agrani-doer-backend-ro9fiezz5-mdsefatalams-projects.vercel.app/gallery"
          )
            .then((res) => res.json())
            .then((data) => setGalleryData(data))
            .finally(() => {
              setBtnLoading(false);
              // setIsAddNew(false); // Close the form
              resetForm(); // Reset the form fields
            });
        }
      })
      .catch((error) => {
        toast("Server Error", { type: "error" });
      })
      .finally(() => setBtnLoading(false));
  };

  // ===================Handle Edit=========================
  useEffect(() => {
    if (isEdit) {
      setIsAddNew(true);
      window.scrollTo(0, 0);
      const imageDataFind = imageData.find((image) => image._id === _id);
      if (galleryTitleRef?.current) {
        galleryTitleRef.current.value = imageDataFind?.title || "";
      }
      if (galleryDescriptionRef?.current) {
        galleryDescriptionRef.current.value = imageDataFind?.description || "";
      }
    }
  }, [_id, isEdit]);

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = galleryTitleRef?.current?.value;
    const description = galleryDescriptionRef?.current?.value;
    const image = galleryImageRef.current?.files?.[0];

    if (!title || !description) {
      toast("Please fill in all fields", { type: "error" });
      return;
    }

    setBtnLoading(true);
    const galleryFormData = new FormData();
    galleryFormData.append("title", title);
    galleryFormData.append("description", description);
    if (image) {
      galleryFormData.append("image", image);
    }
    galleryFormData.append("postDate", new Date().toLocaleDateString());
    galleryFormData.append("postTime", new Date().toLocaleTimeString());

    fetch(
      "https://agrani-doer-backend-ro9fiezz5-mdsefatalams-projects.vercel.app/gallery/" +
        _id,
      {
        method: "PUT",
        body: galleryFormData,
      }
    )
      .then((response) => response.json())
      .then(async (result) => {
        if (result.acknowledged) {
          toast(`Updated gallery \n Id: ${result.insertedId}`, {
            type: "success",
          });
          setGetUpdate(_id);

          await fetch(
            "https://agrani-doer-backend-ro9fiezz5-mdsefatalams-projects.vercel.app/gallery"
          )
            .then((res) => res.json())
            .then((data) => setGalleryData(data))
            .finally(() => {
              setBtnLoading(false);
              setIsAddNew(false); // Close the form
              resetForm(); // Reset the form fields
            });
        }
      })
      .catch((error) => {
        toast("Server Error", { type: "error" });
      })
      .finally(() => setBtnLoading(false));
  };

  return (
    <div className="py-5">
      <div className="flex justify-end">
        <button
          className={`p-3 ${
            isAddNew ? "bg-red-500" : "bg-blue-500"
          } rounded-md text-white font-bold`}
          onClick={() => {
            setIsAddNew((prev) => !prev);
            setData("", false);
            resetForm(); // Reset the form when closing
          }}
        >
          {isAddNew ? tr("cancel") : tr("add_new")}
        </button>
      </div>
      <div
        className="bg-gray-100/30 transition-[height] overflow-hidden mt-4 rounded flex justify-center"
        style={{ height: isAddNew ? "600px" : "0px" }}
      >
        <form
          onSubmit={isEdit ? handleUpdate : handleAddNew}
          method="post"
          className="sm:w-1/2 w-full py-10 sm:px-0 px-4"
        >
          {isEdit ? (
            <div className="flex">
              <p>
                {tr("editing_id")}: {_id}
              </p>
              {/* <div className="w-52">
                <GalleryGetImage
                  item={{
                    _id,
                    description: "",
                    activity: true,
                    title: "",
                    postDateTime: { postDate: "", postTime: "" },
                  }}
                />
              </div> */}
            </div>
          ) : (
            <></>
          )}

          <div className="flex flex-col items-start gap-2 py-2">
            <label
              className="text-gray-500 after:content-['*'] after:text-red-500"
              htmlFor="title"
            >
              {tr("title")}:
            </label>
            <input
              required
              ref={galleryTitleRef}
              className="w-full py-2 px-2 focus:outline-red-200"
              type="text"
              name="title"
            />
          </div>
          <div className="flex flex-col items-start gap-2 py-2">
            <label
              className="text-gray-500 after:content-['*'] after:text-red-500"
              htmlFor="description"
            >
              {tr("small_description")}:
            </label>
            <input
              required
              ref={galleryDescriptionRef}
              className="w-full py-2 px-2 focus:outline-red-200"
              type="text"
              name="description"
            />
          </div>
          <div className="mt-5 flex gap-5 items-center">
            <div className="flex justify-between gap-5">
              <div className="full">
                <label
                  onClick={() => galleryImageRef.current?.click()}
                  className="after:content-['*'] after:text-red-500 btn py-10 px-10 bg-gray-500 rounded-lg flex justify-center cursor-pointer"
                >
                  <FaUpload className="text-5xl text-white" />
                </label>
                <input
                  required={!isEdit}
                  ref={galleryImageRef}
                  onChange={handleImagePreview}
                  className="hidden"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                />
              </div>
              <div className="flex flex-col relative">
                <img
                  className="h-40"
                  ref={galleryAddNewImagePreviewRef}
                  src=""
                  alt=""
                />
              </div>
              {/* Show the selected file name */}
              <div className="mt-2">
                {galleryImageRef.current?.files?.[0] && (
                  <p>{galleryImageRef.current.files[0].name}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={btnLoading}
              className="bg-blue-600 font-bold text-white p-3 px-4 rounded-md flex justify-center items-center"
            >
              <FaSpinner
                style={{ width: btnLoading ? "auto" : "0px" }}
                className={`animate-spin ${
                  btnLoading ? "h-5 w-5 mr-3" : ""
                } transition-all`}
              />
              {isEdit ? tr("update") : tr("submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
