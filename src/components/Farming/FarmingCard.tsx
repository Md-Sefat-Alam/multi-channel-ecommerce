"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface FarmingCardProps {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  tags?: string[];
  author?: {
    id: number;
    fullName: string;
    email: string;
  };
  publishedAt: string;
}

const FarmingCard: React.FC<FarmingCardProps> = ({
  id,
  title,
  summary,
  imageUrl,
  tags = [],
  author,
  publishedAt,
}) => {
  const formattedDate = publishedAt ? formatDistanceToNow(new Date(publishedAt), { addSuffix: true }) : "";

  // Fallback image for development
  const imageSrc = imageUrl.startsWith("http")
    ? imageUrl
    : "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png";

  return (
    <article className="w-full rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-gray-100">
      <Link href={`/farming/${id}`} className="block overflow-hidden">
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-5">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-[var(--secondary-light)] text-[var(--primary)] rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h2 className="mb-3 text-xl font-semibold text-[var(--primary)]">
          <Link href={`/farming/${id}`} className="hover:text-[var(--secondary)] transition-colors duration-300">
            {title}
          </Link>
        </h2>

        <p className="mb-4 text-gray-600 line-clamp-3">
          {summary}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          {author && (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[var(--primary-light)] flex items-center justify-center text-[var(--primary)] font-medium mr-2">
                {author.fullName.charAt(0)}
              </div>
              <span className="text-sm text-gray-500">{author.fullName}</span>
            </div>
          )}

          <span className="text-xs text-gray-500">
            {formattedDate || "Recently published"}
          </span>
        </div>

        <Link
          href={`/farming/${id}`}
          className="inline-flex items-center mt-4 text-sm font-medium text-[var(--secondary)] hover:text-[var(--primary)] transition-colors duration-300"
        >
          Read more
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default FarmingCard;