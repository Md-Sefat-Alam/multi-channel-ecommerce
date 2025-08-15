export const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
  
    return `${year}-${month}-${day}`;
  };
  
  // Example usage:
  const formattedDate = formatDate("2024-11-22T11:56:36.171Z");
  console.log(formattedDate); // Output: "2024-11-22"
  