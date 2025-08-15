import { useGetCategoryQuery } from "@/app/lib/api/rootApis";
import { BASE_URL_DEV } from "@/lib/api/apiSlice";
import { Radio } from "antd";

export default function ProductCategory() {
    const { Group, Button } = Radio;
    const { data } = useGetCategoryQuery();

    return (
        <div>
            <Group defaultValue='all' size='large'>
                <Button value='all'>All</Button>
                {data?.data?.length
                    ? data?.data.map((item: any, index: number) => (
                          <Button key={index} value={item?.categoryName}>
                              {item?.categoryName}
                          </Button>
                      ))
                    : null}
            </Group>
        </div>
    );
}
