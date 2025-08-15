import Title from "@/components/common/Title";
import { BASE_URL } from "@/constant/Defaults";
import { ReactNode } from "react";
import StoreFilters from "./components/StoreFilters";
import StoreSorting from "./components/StoreSorting";

type Props = { children: ReactNode };

export default async function layout({ children }: Props) {
  // Category fetch
  let cat = await fetch(`${BASE_URL}/client/category/fetch`, {
    method: "POST",
    cache: "no-store",
  });
  let category: IRes<
    {
      categoryName: string;
      categoryNameBn: string;
    }[]
  > = await cat.json();

  return (
    <>
      <div className='bg-white'>
        <div>
          <main className='mx-auto container px-4 sm:px-6 lg:px-8'>
            <div className='flex items-baseline justify-between border-b border-gray-200 pb-6 pt-4 lg:hidden'>
              <Title title='Our Store' />
              <StoreSorting category={category} />
            </div>

            <section className='pb-24 pt-6'>
              <div className='grid grid-cols-1 gap-x-8 md:gap-y-10 lg:grid-cols-4'>
                <div className='relative'>
                  <div className='hidden lg:block sticky top-[60px] overflow-y-auto max-h-[calc(100vh-60px)] scrollbar-thin'>
                    <StoreFilters category={category} />
                  </div>
                </div>

                <div className='lg:col-span-3 min-h-screen'>{children}</div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
