// Rating.tsx
import {
  IReviewList,
  serverFetch,
} from "@/app/common/fetchingData/serverSideFetch";
import Reviews from "../Review/Reviews";

type Props = {
  productId: string;
};

export default async function Rating({ productId }: Props) {
  const body = {
    productId: productId,
    filters: {
      productId: productId,
    },
  };

  const data = await serverFetch<IReviewList[]>(
    "/client/product/get-review",
    "POST",
    body
  );

  // Calculate average rating and counts for each rating
  const calculateReviewStats = (reviews: IReviewList[]) => {
    const totalRatings = reviews.length;
    const ratingCounts: { [key: number]: number } = {};
    let sumOfRatings = 0;

    for (const review of reviews) {
      const ratingNum = Number(review.rating);
      sumOfRatings += ratingNum;
      // Increment count for this rating
      ratingCounts[ratingNum] = (ratingCounts[ratingNum] || 0) + 1;
    }

    const averageRating = totalRatings ? sumOfRatings / totalRatings : 0;

    return {
      averageRating: parseFloat(averageRating.toFixed(2)), // Round to 2 decimal places
      ratingCounts,
    };
  };

  const { averageRating, ratingCounts } = calculateReviewStats(data?.data || []);

  return (
    <Reviews
      productId={productId}
      reviews={data?.data || []}
      averageRating={averageRating}
      ratingCounts={ratingCounts}
      totalReviews={data?.data?.length || 0}
    />
  );
}