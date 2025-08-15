"use client";
import Image from "next/image";

type Props = {
  title: string;
  color?: string;
  isReverse?: boolean;
  addBefore?: boolean;
  addAfter?: boolean;
};

export default function Title({
  title,
  color,
  isReverse,
  addAfter,
  addBefore,
}: Props) {
  return (
    <div className='pt-2 '>
      <div className='container mx-auto flex justify-center'>
        <div
          className={`py-2 flex ${
            isReverse ? "sm:flex-row flex-row-reverse" : ""
          } gap-4`}
        >
          <h1
            className={`relative text-lg md:text-xl font-bold uppercase z-10 ${
              color ? color : "text-[--primary]"
            }`}
          >
            {addBefore && (
              <Image
                src={"/assets/common/title_logo.png"}
                alt=''
                height={80}
                priority
                width={200}
                // layout="responsive"
                className='select-none absolute !top-[-55px] right-[-108px] z-10 !max-w-[300px] !w-[300px] !h-[100px]'
              />
            )}
            <p>{title}</p>
            {addAfter && (
              <Image
                src={"/assets/common/title_logo.png"}
                alt=''
                height={80}
                width={150}
                layout='responsive'
                className='absolute !top-[-5px] md:!top-[-5px] right-[-70px] md:right-[-70px] z-10 !max-w-[150px] !w-[150px] !h-[40px] md:!w-[150px] md:!h-[40px]'
              />
            )}
          </h1>
        </div>
      </div>
    </div>
  );
}
