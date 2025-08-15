import React from "react";
import InSelect from "../FormItems/InSelect";
import { InputCommonProps } from "@/types/common";

interface Props<T> extends InputCommonProps<T> {}

export default function SelectSubCategory({ name }: Props<any>) {
    // const { data: subCategory, isLoading: subCategoryLoading } =
    //   useGetSubCategoryQuery({ start: 0, length: 10 });

    return (
        <InSelect
            name={name}
            values={
                // subCategory?.data?.map((item) => ({
                //   title: item.subCategoryName,
                //   value: item.uuid,
                // })) || []
                []
            }
            // loading={subCategoryLoading}
            label='Sub-Category'
            placeholder='Select Sub-Category'
        />
    );
}
