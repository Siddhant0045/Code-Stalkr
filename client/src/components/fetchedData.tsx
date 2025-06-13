import React, { useEffect, useState } from "react";
import axios from "axios";

interface FetchedDataProps {
  link: string;
}

const FetchedData: React.FC<FetchedDataProps> = ({ link }) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!link) return;

        const response = await axios.post("http://localhost:8000/api/fetch-stats", {
          links: [link],
        });

        const result = response.data[0]; // Because we sent one link
        if (result.stats?.error) {
          setError(result.stats.error);
        } else {
          setData(result);
        }
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, [link]);

  if (error) return <p className="text-red-500">❌ {error}</p>;
  if (!data) return <p>Loading data for <strong>{link}</strong>...</p>;

  const { platform, stats } = data;

  return (
    <div className="p-4 bg-white rounded-xl shadow-md space-y-1 border border-gray-200">
      <p className="font-bold text-lg capitalize">{platform} Stats</p>
      {platform === "leetcode" && (
        <>
          <p>👤 Username: {stats.username}</p>
          <p>✅ Solved: {stats.total_problems_solved} | 🟢 Easy: {stats.easy} | 🟠 Medium: {stats.medium} | 🔴 Hard: {stats.hard}</p>
          <p>🔥 Streak: {stats.streak} days | 📅 Active Days: {stats.totalActiveDays}</p>
          <p>🏅 Ranking: {stats.ranking}</p>
          <p>💡 Skill Tags: {stats.skillTags?.join(", ") || "N/A"}</p>
        </>
      )}
      {platform === "codeforces" && (
        <>
          <p>👤 Handle: {stats.handle}</p>
          <p>🏆 Rating: {stats.rating} ({stats.rank})</p>
          <p>📈 Max Rating: {stats.maxRating} ({stats.maxRank})</p>
          <p>🧪 Total Contests: {stats.contests.totalContests}</p>
          {stats.recentSubmissions && stats.recentSubmissions.length > 0 && (
            <div>
              <p>📝 Recent Submission:</p>
              <ul className="list-disc pl-5">
                {stats.recentSubmissions.slice(0, 5).map((s: any, index: number) => (
                  <li key={index}>
                    {s.problem} - {s.verdict} ({s.language})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FetchedData;
