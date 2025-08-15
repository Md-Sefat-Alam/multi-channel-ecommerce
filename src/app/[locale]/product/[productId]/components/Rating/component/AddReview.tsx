"use client";
import { serverFetch } from "@/app/common/fetchingData/serverSideFetch";
import { message } from "antd";
import { useState } from "react";

const AddReview = ({ productId }: { productId: string }) => {
  const [rating, setRating] = useState(0); // Holds the star rating
  const [comment, setComment] = useState(""); // Holds the comment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    const reviewData = { rating, comment };
    formData.append("rating", String(rating));
    formData.append("comment", comment);
    formData.append("productId", productId);
    const data = await serverFetch<any>(
      "/client/product/add-review",
      "POST",
      formData
    );

    if (data?.success) {
      message.success("Successfully added");
      setRating(0);
      setComment("");
    }
  };

  return (
    <div className="max-w-[600px] mb-3 p-6 bg-white rounded-lg shadow-md ">
      <h2 className="text-xl font-bold mb-4 text-gray-900 ">
        Provide your valuable feedback
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Star Rating */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700  mb-2">
            Rating:
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                onClick={() => setRating(star)}
                className={`h-6 w-6 cursor-pointer ${star <= rating ? "text-yellow-300" : "text-gray-300"
                  }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Comment Input */}
        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700  mb-2"
          >
            Comment:
          </label>
          <textarea
            id="comment"
            rows={4}
            className="w-full  px-3 py-2 text-gray-900 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300   "
            placeholder="Write your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-300 text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-yellow-400  "
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
