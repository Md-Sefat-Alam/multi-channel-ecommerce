"use client";
import React from 'react';

interface HighlightTextProps {
  text: string;
  searchTerm: string;
  className?: string;
}

const HighlightText: React.FC<HighlightTextProps> = ({
  text,
  searchTerm,
  className = ""
}) => {
  if (!searchTerm || !text) return <span className={className}>{text}</span>;

  // Escape special regex characters in the search term
  const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Case insensitive search
  const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, i) =>
        regex.test(part) ?
          <mark key={i} className="bg-yellow-200 px-0 rounded">{part}</mark> :
          <span key={i}>{part}</span>
      )}
    </span>
  );
};

export default HighlightText;