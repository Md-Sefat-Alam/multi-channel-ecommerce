import MobileSidebar from "./MobileSidebar";

type Props = {
  category: IRes<
    {
      categoryName: string;
      categoryNameBn: string;
    }[]
  >;
};

export default function StoreSorting({ category }: Props) {
  return (
    <div className='flex justify-center items-center gap-4'>
      {/* <div className='relative inline-block text-left'>
                <div>
                    <button
                        type='button'
                        className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'
                        id='menu-button'
                        aria-expanded='false'
                        aria-haspopup='true'
                    >
                        Sort
                        <svg
                            className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            aria-hidden='true'
                        >
                            <path
                                fillRule='evenodd'
                                d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                                clipRule='evenodd'
                            />
                        </svg>
                    </button>
                </div>
                <div
                    className='absolute hidden right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='menu-button'
                    tabIndex={-1}
                >
                    <div className='py-1' role='none'>
                        <a
                            href='#'
                            className='block px-4 py-2 text-sm font-medium text-gray-900'
                            role='menuitem'
                            tabIndex={-1}
                            id='menu-item-0'
                        >
                            Most Popular
                        </a>
                        <a
                            href='#'
                            className='block px-4 py-2 text-sm text-gray-500'
                            role='menuitem'
                            tabIndex={-1}
                            id='menu-item-1'
                        >
                            Best Rating
                        </a>
                        <a
                            href='#'
                            className='block px-4 py-2 text-sm text-gray-500'
                            role='menuitem'
                            tabIndex={-1}
                            id='menu-item-2'
                        >
                            Newest
                        </a>
                        <a
                            href='#'
                            className='block px-4 py-2 text-sm text-gray-500'
                            role='menuitem'
                            tabIndex={-1}
                            id='menu-item-3'
                        >
                            Price: Low to High
                        </a>
                        <a
                            href='#'
                            className='block px-4 py-2 text-sm text-gray-500'
                            role='menuitem'
                            tabIndex={-1}
                            id='menu-item-4'
                        >
                            Price: High to Low
                        </a>
                    </div>
                </div>
            </div>

            <button
                type='button'
                className='text-gray-400 hover:text-gray-500 sm:ml-7'
            >
                <span className='sr-only'>View grid</span>
                <svg
                    className='h-5 w-5'
                    aria-hidden='true'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                >
                    <path
                        fillRule='evenodd'
                        d='M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z'
                        clipRule='evenodd'
                    />
                </svg>
            </button> */}

      <MobileSidebar category={category} />
    </div>
  );
}
