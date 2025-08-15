import React from "react";
import InSelect from "../FormItems/InSelect";
import { InputCommonProps } from "@/types/common";
import { useGetCategoryQuery } from "@/app/lib/api/rootApis";

interface Props<T> extends InputCommonProps<T> {}

export default function SelectCategory({
    name,
    readOnly,
    disabled,
}: Props<any>) {
    const { data: category, isLoading: categoryLoading } =
        useGetCategoryQuery();
    return (
        <InSelect
            name={name}
            values={
                category?.data?.map((item) => ({
                    title: item.categoryName,
                    value: item.categoryName,
                })) || []
            }
            label='Category'
            placeholder='Select Category'
            loading={categoryLoading}
            disabled={disabled || readOnly}
        />
    );
}
