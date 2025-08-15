import { IGalleryData } from "@/types/gallery";
import { Dispatch, SetStateAction } from "react";

const MasonryLayout = ({
  imageData,
  isDashboard,
  setImageData,
}: {
  imageData: IGalleryData[];
  setImageData: Dispatch<SetStateAction<IGalleryData[]>>;
  isDashboard?: boolean;
}) => {
  return (
    <div className="masonry-grid py-4 min-h-[500px]">
      {imageData.map((item) => (
        <div key={item._id} className="masonry-item overflow-hidden">
          {/* <GalleryGetImage
            item={item}
            isDashboard={isDashboard}
            setImageData={setImageData}
          /> */}
        </div>
      ))}
    </div>
  );
};

export default MasonryLayout;
