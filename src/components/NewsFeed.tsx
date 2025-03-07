import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

import Article from "./Article";
import { IArticle } from "../utils/interfaces";
import { getNewsApiData, getNyTimesData } from "../utils/api";
import Loader from "./Loader";

function NewsFeed() {
    const [isLoading, setIsLoading] = useState(false);
    const [groupedArticles, setGroupedArticles] = useState<Array<IArticle>>([]);

    const [activeTab, setActiveTab] = useState("All");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const filteredArticles = useMemo(() => {
        return groupedArticles.filter((article) => {
            const articleDate = new Date(article.date);
            const isWithinDateRange =
                (!startDate || articleDate >= new Date(startDate)) &&
                (!endDate || articleDate <= new Date(endDate));

            return (
                (activeTab === "All" || article.source === activeTab) &&
                (selectedCategory === "All" || article.category === selectedCategory) &&
                article.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) &&
                isWithinDateRange
            );
        });
    }, [groupedArticles, activeTab, selectedCategory, debouncedSearchQuery, startDate, endDate]);

    const allowedCategories = useMemo(() => {
        const allowedCategoriesSet = new Set<string>();

        groupedArticles.forEach((article) => {
            allowedCategoriesSet.add(article.category);
        });

        return ["All", ...allowedCategoriesSet];
    }, [groupedArticles]);

    const allowedSources = useMemo(() => {
        const allowedSourcesSet = new Set<string>();

        groupedArticles.forEach((article) => {
            allowedSourcesSet.add(article.source);
        });

        return ["All", ...allowedSourcesSet];
    }, [groupedArticles])

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchQuery]);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            getNewsApiData(),
            // getTheGuardianData(),
            getNyTimesData(),
        ])
            .then((responses) => {
                const [newsApiData, /* theGuardianData, */ nyTimesData] = responses;

                setGroupedArticles([
                    ...newsApiData,
                    // ...theGuardianData, 
                    ...nyTimesData,
                ]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            {/* Tabs */}
            <div className="flex gap-x-4 mb-6 overflow-x-scroll lg:overflow-x-visible">
                {allowedSources.map((source) => (
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
            <div className="flex flex-wrap gap-4 bg-white p-4 shadow rounded-md mb-6 items-center">
                <input
                    type="text"
                    placeholder="Search articles..."
                    className="border p-2 rounded-md flex-1 min-w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                    className="border p-2 rounded-md"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {allowedCategories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    className="border p-2 rounded-md"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                    type="date"
                    className="border p-2 rounded-md"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>

            {/* Article Grid */}
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <Loader />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                        <Article key={article.id} article={article} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default NewsFeed;
