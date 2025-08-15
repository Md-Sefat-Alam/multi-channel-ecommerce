"use client";
import React, { useState } from "react";
import { IReviewList } from "@/app/common/fetchingData/serverSideFetch";
import ReviewItem from "./ReviewItem";
import AddReview from "./AddReview";
import { useTranslations } from "next-intl";

type Props = {
  productId: string;
  reviews: IReviewList[];
  averageRating: number;
  ratingCounts: { [key: number]: number };
  totalReviews: number;
};

const Reviews: React.FC<Props> = ({
  productId,
  reviews,
  averageRating,
  ratingCounts,
  totalReviews,
}) => {
  const t = useTranslations("reviews");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  // Calculate indexes for current page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Calculate total pages
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  // Change page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll back to the top of the reviews section
    document
      .getElementById("reviews-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id='reviews-section'
      className='bg-white py-8 antialiased md:py-12'
    >
      <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
        <AddReview productId={productId} />
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
          <h2 className='text-2xl font-semibold text-gray-900'>
            {t("customerReviews")}
          </h2>
          <div className='mt-2 flex items-center gap-2 sm:mt-0'>
            <div className='flex items-center gap-0.5'>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`h-5 w-5 ${
                    averageRating >= star ? "text-yellow-300" : "text-gray-300"
                  }`}
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z' />
                </svg>
              ))}
            </div>
            <p className='text-sm font-medium leading-none text-gray-500'>
              ({averageRating.toFixed(1)})
            </p>
            <span className='text-sm font-medium leading-none text-gray-900'>
              {totalReviews} {t("reviews")}
            </span>
          </div>
        </div>
        <div className='my-8 gap-8 sm:flex sm:items-start'>
          <div className='shrink-0 space-y-4'>
            <p className='text-3xl font-bold leading-none text-gray-900'>
              {averageRating.toFixed(1)}{" "}
              <span className='text-lg font-medium text-gray-500'>/ 5</span>
            </p>
            <div className='flex items-center'>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`h-5 w-5 ${
                    averageRating >= star ? "text-yellow-300" : "text-gray-300"
                  }`}
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z' />
                </svg>
              ))}
            </div>
            <p className='text-sm text-gray-500'>
              {t("basedOn", { count: totalReviews })}
            </p>
          </div>
          <div className='mt-6 min-w-0 flex-1 space-y-3 sm:mt-0'>
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className='flex items-center gap-2'>
                <p className='w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900'>
                  {rating}
                </p>
                <svg
                  className='h-4 w-4 shrink-0 text-yellow-300'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z' />
                </svg>
                <div className='h-2 w-full rounded-full bg-gray-200'>
                  <div
                    className='h-2 rounded-full bg-yellow-300'
                    style={{
                      width: `${
                        ((ratingCounts[rating] || 0) / totalReviews) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <span className='w-8 shrink-0 text-right text-sm font-medium leading-none text-primary hover:underline sm:w-auto sm:text-left'>
                  {ratingCounts[rating] || 0}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className='mt-6 divide-y divide-gray-200'>
          {reviews.length > 0 ? (
            currentReviews.map((review) => (
              <ReviewItem key={review.uuid} {...review} />
            ))
          ) : (
            <div className='py-12 text-center'>
              <p className='text-lg text-gray-500'>{t("noReviewsYet")}</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {reviews.length > reviewsPerPage && (
          <div className='mt-8 flex justify-center'>
            <nav className='flex items-center'>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className='mr-2 rounded-lg border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 disabled:opacity-50'
                aria-label={t("previousPage")}
              >
                &laquo;
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`mx-1 px-3 py-1 rounded-lg text-sm font-medium ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                    aria-current={currentPage === page ? "page" : undefined}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className='ml-2 rounded-lg border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 disabled:opacity-50'
                aria-label={t("nextPage")}
              >
                &raquo;
              </button>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
