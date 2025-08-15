import { useGetDistrictQuery } from "@/lib/api/apiSlice";

interface Props {
  uuid: string;
}

export default function SelectDistrictView({ uuid }: Props) {
  const {
    data: district,
    isLoading,
    isFetching,
  } = useGetDistrictQuery({
    start: 0,
    length: 1000,
    filters: { uuid: uuid || undefined } as any,
  });

  if (!district?.data.length) {
    return "";
  }
  return district?.data[0].nameEn;
}
