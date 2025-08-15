import { useGetThanaQuery } from "@/lib/api/apiSlice";

interface Props {
  uuid: string;
}

export default function SelectThanaView({ uuid }: Props) {
  const {
    data: thana,
    isLoading,
    isFetching,
  } = useGetThanaQuery({
    start: 0,
    length: 1000,
    filters: { uuid: uuid || undefined } as any,
  });

  console.log({ thana });

  if (!thana?.data.length) {
    return "";
  }
  return thana?.data[0].nameEn;
}
