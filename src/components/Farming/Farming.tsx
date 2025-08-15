import React from "react";
import Title from "../common/Title";
import FarmingCard from "./FarmingCard";
import { MotionContainer } from "../common/MotionContainer";

type Props = {};

export default function Farming({ }: Props) {
  return (
    <div className="py-12 overflow-hidden bg-white">
      <div className="container mx-auto px-4">
        <MotionContainer>
          <Title title="Farming" addAfter />
          <p className="text-center text-[var(--font-dark)] opacity-80 max-w-2xl mx-auto mb-10 font-light">
            Discover the latest farming techniques, sustainable practices, and agricultural innovations
            to help your crops thrive and your land flourish.
          </p>
        </MotionContainer>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {farmingData.map((item, index) => (
            <MotionContainer key={item.id} delay={index * 0.1}>
              <FarmingCard
                id={item.id}
                title={item.title}
                summary={item.summary}
                imageUrl={item.imageUrl}
                tags={item.tags}
                author={item.author}
                publishedAt={item.publishedAt || item.createdAt}
              />
            </MotionContainer>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="bg-[var(--secondary)] hover:bg-[var(--secondary-bright)] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center mx-auto gap-2">
            <span>View More Articles</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Mock data based on the provided JSON structure
const farmingData = [
  {
    id: 1,
    uuid: "980b5688-b408-44ee-ae31-abcce2d372fa",
    slug: "sustainable-farming-practices",
    title: "Sustainable Farming Practices",
    subtitle: "Eco-friendly approaches for better yield",
    summary: "Discover how sustainable farming practices can increase your yield while protecting the environment for future generations.",
    imageUrl: "/images/farming/sustainable-farming.jpg",
    tags: ["Sustainable", "Eco-friendly"],
    author: {
      id: 1,
      fullName: "John Doe",
      email: "admin@admin.com"
    },
    createdAt: "2025-03-16T17:31:49.294Z",
    publishedAt: null
  },
  {
    id: 2,
    uuid: "980b5688-b408-44ee-ae31-abcce2d372fb",
    slug: "organic-pest-control",
    title: "Organic Pest Control Methods",
    subtitle: "Natural solutions for crop protection",
    summary: "Learn about effective organic pest control methods that keep your crops healthy without harmful chemicals.",
    imageUrl: "/images/farming/pest-control.jpg",
    tags: ["Organic", "Pest Control"],
    author: {
      id: 1,
      fullName: "John Doe",
      email: "admin@admin.com"
    },
    createdAt: "2025-03-18T10:23:49.294Z",
    publishedAt: "2025-03-20T09:15:00.000Z"
  },
  {
    id: 3,
    uuid: "980b5688-b408-44ee-ae31-abcce2d372fc",
    slug: "water-conservation",
    title: "Water Conservation Techniques",
    subtitle: "Save water in agricultural practices",
    summary: "Explore innovative water conservation techniques that can significantly reduce water usage in your farming operations.",
    imageUrl: "/images/farming/water-conservation.jpg",
    tags: ["Water", "Conservation"],
    author: {
      id: 2,
      fullName: "Jane Smith",
      email: "jane@example.com"
    },
    createdAt: "2025-03-22T14:45:49.294Z",
    publishedAt: "2025-03-25T11:30:00.000Z"
  },
  {
    id: 4,
    uuid: "980b5688-b408-44ee-ae31-abcce2d372fd",
    slug: "crop-rotation-benefits",
    title: "Benefits of Crop Rotation",
    subtitle: "Maximize soil health and productivity",
    summary: "Understand how crop rotation can improve soil health, reduce pest problems, and increase overall farm productivity.",
    imageUrl: "/images/farming/crop-rotation.jpg",
    tags: ["Soil Health", "Productivity"],
    author: {
      id: 3,
      fullName: "Robert Johnson",
      email: "robert@example.com"
    },
    createdAt: "2025-03-28T09:12:49.294Z",
    publishedAt: "2025-04-01T08:45:00.000Z"
  }
];