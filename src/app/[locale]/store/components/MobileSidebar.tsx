"use client";
import classNames from "classnames";
import { useState } from "react";
import StoreFilters from "./StoreFilters";
import { Button, Drawer, message } from "antd";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "@/lib/hooks";

type Props = {
  category: IRes<{
    categoryName: string;
    categoryNameBn: string;
  }[]>;
};

export default function MobileSidebar({ category }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const filters = useAppSelector((state) => state.filters);

  const handleApplyFilters = () => {
    // dispatch(applyFilters(filters));
    message.info("Should apply filters!")
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <Button
          type="text"
          icon={<FaFilter />}
          className="flex items-center gap-2 text-gray-700"
          onClick={() => setIsOpen(true)}
        >
          <span className="sm:inline hidden">Filters</span>
        </Button>
      </div>

      <Drawer
        title="Filters"
        placement="right"
        onClose={() => setIsOpen(false)}
        open={isOpen}
        width={320}
        footer={
          <Button
            type="primary"
            block
            onClick={handleApplyFilters}
            className="bg-blue-600"
          >
            Apply Filters
          </Button>
        }
      >
        <div className="overflow-y-auto h-full">
          <StoreFilters category={category} />
        </div>
      </Drawer>
    </>
  );
}