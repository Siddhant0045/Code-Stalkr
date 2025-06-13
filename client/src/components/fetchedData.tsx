import React from "react";

interface FetchedDataProps {
  link: string;
}

const FetchedData: React.FC<FetchedDataProps> = ({ link }) => {
  return (
    <div>
      <p><strong>Dummy Stats for:</strong> {link || "Unnamed"}</p>
      <p>✅ Solved: 150 | 🟠 Medium: 80 | 🔴 Hard: 20</p>
      <p>🔥 Streak: 5 days</p>
    </div>
  );
};

export default FetchedData;
