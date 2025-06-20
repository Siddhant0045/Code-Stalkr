import React, { useEffect, useState } from "react";
import LeetCode from "./leetcode";
import CodeForces from "./codeforces";

interface FetchedDataProps {
  link: string;
}

const FetchedData: React.FC<FetchedDataProps> = ({ link }) => {
  const [platform, setPlatform] = useState<string | null>(null);

  useEffect(() => {
    if (link.includes("leetcode")) {
      setPlatform("leetcode");
    } else if (link.includes("codeforces")) {
      setPlatform("codeforces");
    } else {
      setPlatform(null);
    }
  }, [link]);

  if (!platform) return null;

  return (
    <div className="p-8 bg-[#282828] rounded-xl shadow-lg space-y-1 border border-[#282828] text-white">
      <p className="font-bold text-lg capitalize text-[30px] mb-10 text-center">{platform} Stats</p>
      {platform === "leetcode" && <LeetCode link={link} />}
      {platform === "codeforces" && <CodeForces link={link}/>}
    </div>
  );
};

export default FetchedData;
