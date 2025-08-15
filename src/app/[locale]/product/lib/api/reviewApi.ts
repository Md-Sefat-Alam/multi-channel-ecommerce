// lib/features/reviews/reviewsApi.ts
import { apiSlice } from "@/lib/api/apiSlice";

export const reviewsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: (formData) => ({
        url: "/client/product/add-review",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Reviews"],
    }),
    getReviews: builder.query({
      query: (productId) => ({
        url: "/client/product/get-review",
        method: "POST",
        body: { filters: { productId } },
      }),
      providesTags: ["Reviews"],
    }),
    likeReview: builder.mutation({
      query: (data) => ({
        url: "/client/product/like-review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ReviewLikes"],
    }),
    addReviewComment: builder.mutation({
      query: (data) => ({
        url: "/client/product/add-review-comment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ReviewComments"],
    }),
    getReviewComments: builder.query({
      query: (reviewId) => `/client/product/review-comments/${reviewId}`,
      providesTags: ["ReviewComments"],
    }),
    getReviewLikes: builder.query({
      query: (reviewId) => `/client/product/review-likes/${reviewId}`,
      providesTags: ["ReviewLikes"],
    }),
    getUserReviewInteractions: builder.query({
      query: (reviewId) =>
        `/client/product/user-review-interaction/${reviewId}`,
    }),
  }),
});

export const {
  useAddReviewMutation,
  useGetReviewsQuery,
  useLikeReviewMutation,
  useAddReviewCommentMutation,
  useGetReviewCommentsQuery,
  useGetReviewLikesQuery,
  useGetUserReviewInteractionsQuery,
  useLazyGetReviewCommentsQuery,
  useLazyGetReviewLikesQuery,
  useLazyGetUserReviewInteractionsQuery,
} = reviewsApi;
