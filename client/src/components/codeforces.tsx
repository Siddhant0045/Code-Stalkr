import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

interface CodeForcesProps {
  link?: string;
}

const CodeForces: React.FC<CodeForcesProps>  = ({link}) => {
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
      <p className="font-bold text-lg">Codeforces Stats</p>
      <p>👤 Handle: Not provided</p>
      <p>🏆 Rating: Not available</p>
      <p>📈 Max Rating: Not available</p>
      <p>🧪 Total Contests: 0</p>
      <p>📊 Recent Submissions: No recent submissions</p>
    </div>
  );
}

export default CodeForces;