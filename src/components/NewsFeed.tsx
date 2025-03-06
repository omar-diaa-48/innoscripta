import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

import Article from "./Article";
import { IArticle } from "../utils/interfaces";
import { ArticleSource } from "../utils/constants";
import { useQuery } from "@tanstack/react-query";
import { getNewsApiData, getNyTimesData, getTheGuardianData } from "../utils/api";

const sources = ["All", ArticleSource.NEWS_API, ArticleSource.NY_TIMES, ArticleSource.THE_GUARDIAN];
const categories = ["All", "Business", "Tech", "Sports"];

function NewsFeed() {
    const { data: newsApiData } = useQuery<Array<IArticle>>({
        queryKey: ['news-api-articles'],
        queryFn: getNewsApiData,
        initialData: [],
    })

    const { data: theGuardianData } = useQuery<Array<IArticle>>({
        queryKey: ['the-guardian-articles'],
        queryFn: getTheGuardianData,
        initialData: [],
        enabled: false
    })

    const { data: nyTimesData } = useQuery<Array<IArticle>>({
        queryKey: ['ny-times-articles'],
        queryFn: getNyTimesData,
        initialData: []
    })

    const [activeTab, setActiveTab] = useState("All");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")

    const filteredArticles = useMemo(() => [...(newsApiData.slice(0, 5)), ...(theGuardianData.slice(0, 5)), ...(nyTimesData.slice(0, 5))].filter(
        (article) =>
            (activeTab === "All" || article.source === activeTab) &&
            (selectedCategory === "All" || article.category === selectedCategory) &&
            article.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    ), [activeTab, selectedCategory, debouncedSearchQuery, newsApiData, theGuardianData, nyTimesData]);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery)
        }, 500);

        return () => {
            clearTimeout(timerId)
        }
    }, [searchQuery])

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            {/* Tabs */}
            <div className="flex gap-x-4 mb-6 overflow-x-scroll">
                {sources.map((source) => (
                    <button
                        key={source}
                        type="button"
                        className={clsx(
                            `px-2 lg:px-4 py-2 rounded-md transition`,
                            activeTab === source ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800"
                        )}
                        onClick={() => setActiveTab(source)}
                    >
                        {source}
                    </button>
                ))}
            </div>

            {/* Filter Bar */}
            <div className="flex justify-between items-center bg-white p-4 shadow rounded-md mb-6">
                <input
                    type="text"
                    placeholder="Search articles..."
                    className="border p-2 rounded-md w-1/2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                    className="border p-2 rounded-md"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Article Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                    <Article key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
}

export default NewsFeed