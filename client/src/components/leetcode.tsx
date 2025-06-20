import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import * as Recharts from 'recharts';

interface LeetCodeProps {
    link: string;
}

const LeetCode: React.FC<LeetCodeProps> = ({ link }) => {
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
    console.log("LeetCode Stats:", stats);
    const questionsolveddata = [
        { name: "Easy", value: stats.easy },
        { name: "Medium", value: stats.medium },
        { name: "Hard", value: stats.hard },
    ];
    const languagesUsedData = (stats.languageProblemCount as {
        languageName: string;
        problemsSolved: number;
    }[]).map((item) => ({
        name: item.languageName,
        value: item.problemsSolved,
    }));

    const advancedTopicsData = (stats.tagProblemCount.advanced as {
        tagName: string;
        problemsSolved: number;
    }[]).map((item) => ({
        name: item.tagName,
        value: item.problemsSolved,
    }));

    const fundamentalTopicsData = (stats.tagProblemCount.fundamental as {
        tagName: string;
        problemsSolved: number;
    }[]).map((item) => ({
        name: item.tagName,
        value: item.problemsSolved,
    }));

    const intermediateTopicsData = (stats.tagProblemCount.intermediate as {
        tagName: string;
        problemsSolved: number;
    }[]).map((item) => ({
        name: item.tagName,
        value: item.problemsSolved,
    }));

    const COLORS = ["#1cbbba", "#f7b206", "red"]; // green, yellow, red

    return (
        <>
            <div className="flex items-center space-x-4 p-4 text-[#a0a1a3]">
                <div className="w-1/2 flex justify-center">
                    <img className="rounded-full h-[120px] border-[2px] border-white" src={stats.avatar}></img>
                </div>
                <div>
                    <h1 className="text-white text-[16px] font-semibold">{stats.realName}</h1>
                    <h6>{stats.username}</h6>
                    <br></br>
                    <p className="text-[14px]">Rank: <a className="text-white font-semibold">{stats.ranking}</a></p><br></br>
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center text-white font-semibold">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-tag"
                                viewBox="0 0 16 16"
                            >
                                <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0" />
                                <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1m0 5.586 7 7L13.586 9l-7-7H2z" />
                            </svg>
                        </div>
                        <ul className="flex flex-wrap gap-2 items-center">
                            {stats.skillTags.map((tag: string, index: number) => (
                                <li className="bg-[#3e3e3e] px-2 py-1 rounded-md" key={index}>
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
            <h1 className="mt-20 text-[14px]">Total Problems Solved : {stats.total_problems_solved} </h1>
            <h1 className="text-[14px]">Acceptance Rate : {stats.beatsPercentage.totalQuestionBeatsPercentage}% </h1>
            <div className="flex flex-col items-center justify-center">
                <div className="flex">
                    <Recharts.PieChart width={250} height={250}>
                        <Recharts.Pie
                            data={questionsolveddata}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            strokeWidth={0}      // ⬅️  (either prop works)
                        >
                            {questionsolveddata.map((entry, index) => (
                                <Recharts.Cell className="focus:outline-none" key={`cell-${index}`} fill={COLORS[index]} tabIndex={-1} />
                            ))}
                        </Recharts.Pie>
                        <Recharts.Tooltip
                            contentStyle={{
                                backgroundColor: "#F2F2F2",
                                borderRadius: "8px",
                                border: "none",
                                paddingTop: "4px",   // reduced Y padding
                                paddingBottom: "4px", // reduced Y padding
                                paddingLeft: "8px",  // optional: control X padding
                                paddingRight: "8px",
                            }}
                            itemStyle={{ padding: 0 }} // optional: override internal item padding
                            formatter={(value: any, name: any) => [`${value}`, name]}
                        />

                    </Recharts.PieChart>
                    <div className="flex flex-col space-y-4 items-start justify-center">
                        {/* Easy */}
                        <div className="relative group">
                            <div className="bg-[#353535] py-2 px-3 rounded-md w-[95px] text-center">
                                <p className="text-[#1cbbba] font-semibold">Easy: {stats.easy}</p>
                            </div>
                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 scale-0 group-hover:scale-100 transition-transform bg-[#F2F2F2] text-black text-sm px-3 py-2 rounded shadow-md z-10 whitespace-nowrap">
                                Acceptance: {stats.beatsPercentage.userSessionBeatsPercentage[0].percentage}%
                            </div>
                        </div>

                        {/* Medium */}
                        <div className="relative group">
                            <div className="bg-[#353535] py-2 px-3 rounded-md w-[95px] text-center">
                                <p className="text-[#f7b206] font-semibold">Med: {stats.medium}</p>
                            </div>
                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 scale-0 group-hover:scale-100 transition-transform bg-[#F2F2F2] text-black text-sm px-3 py-2 rounded shadow-md z-10 whitespace-nowrap">
                                Acceptance: {stats.beatsPercentage.userSessionBeatsPercentage[1].percentage}%
                            </div>
                        </div>

                        {/* Hard */}
                        <div className="relative group">
                            <div className="bg-[#353535] py-2 px-3 rounded-md w-[95px] text-center">
                                <p className="text-[#e33736] font-semibold">Hard: {stats.hard}</p>
                            </div>
                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 scale-0 group-hover:scale-100 transition-transform bg-[#F2F2F2] text-black text-sm px-3 py-2 rounded shadow-md z-10 whitespace-nowrap">
                                Acceptance: {stats.beatsPercentage.userSessionBeatsPercentage[2].percentage}%
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <h1 className="text-[14px] mb-15">Most Used Language</h1>
            <div>
                <div className="w-full h-64 flex">
                    <Recharts.ResponsiveContainer className={`mr-10`} width="100%" height="100%">
                        <Recharts.BarChart data={languagesUsedData}>
                            <Recharts.CartesianGrid strokeDasharray="3 3" />
                            <Recharts.XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={100} />
                            <Recharts.YAxis />
                            <Recharts.Tooltip
                                cursor={{ fill: "transparent" }}
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-white p-2 border rounded shadow">
                                                <p className="text-sm font-semibold text-black">{label}</p>
                                                <p className="text-xs text-black">Solved: {payload[0].value}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Recharts.Bar dataKey="value" fill="#B6B09F" radius={[10, 10, 0, 0]} />
                        </Recharts.BarChart>
                    </Recharts.ResponsiveContainer>
                </div>
            </div>
            <h1 className="text-[14px] my-15">Fundamental Topics Solved</h1>
            <div className="w-full h-64 flex">
                <Recharts.ResponsiveContainer className={`mr-10`} width="100%" height="100%">
                    <Recharts.BarChart data={fundamentalTopicsData}>
                        <Recharts.CartesianGrid strokeDasharray="3 3" />
                        <Recharts.XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={100} />
                        <Recharts.YAxis />
                        <Recharts.Tooltip
                            cursor={{ fill: "transparent" }}
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-white p-2 border rounded shadow">
                                            <p className="text-sm font-semibold text-black">{label}</p>
                                            <p className="text-xs text-black">Solved: {payload[0].value}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Recharts.Bar dataKey="value" fill="#B6B09F" radius={[10, 10, 0, 0]} />
                    </Recharts.BarChart>
                </Recharts.ResponsiveContainer>
            </div>
            <h1 className="text-[14px] my-15">Intermediate Topics Solved</h1>
            <div className="w-full h-64 flex">
                <Recharts.ResponsiveContainer className={`mr-10`} width="100%" height="100%">
                    <Recharts.BarChart data={intermediateTopicsData}>
                        <Recharts.CartesianGrid strokeDasharray="3 3" />
                        <Recharts.XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={100} />
                        <Recharts.YAxis />
                        <Recharts.Tooltip
                            cursor={{ fill: "transparent" }}
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-white p-2 border rounded shadow">
                                            <p className="text-sm font-semibold text-black">{label}</p>
                                            <p className="text-xs text-black">Solved: {payload[0].value}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Recharts.Bar dataKey="value" fill="#B6B09F" radius={[10, 10, 0, 0]} />
                    </Recharts.BarChart>
                </Recharts.ResponsiveContainer>
            </div>
            <h1 className="text-[14px] my-15">Advanced Topics Solved</h1>
            <div className="w-full h-64 flex">
                <Recharts.ResponsiveContainer className={`mr-10`} width="100%" height="100%">
                    <Recharts.BarChart data={advancedTopicsData}>
                        <Recharts.CartesianGrid strokeDasharray="3 3" />
                        <Recharts.XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={120} />
                        <Recharts.YAxis />
                        <Recharts.Tooltip
                            cursor={{ fill: "transparent" }}
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-white p-2 border rounded shadow">
                                            <p className="text-sm font-semibold text-black">{label}</p>
                                            <p className="text-xs text-black">Solved: {payload[0].value}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Recharts.Bar dataKey="value" fill="#B6B09F" radius={[10, 10, 0, 0]} />
                    </Recharts.BarChart>
                </Recharts.ResponsiveContainer>
            </div>

        </>
    );
};

export default LeetCode;