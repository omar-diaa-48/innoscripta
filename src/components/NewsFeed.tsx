import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

import Article from "./Article";
import { IArticle } from "../utils/interfaces";
import { getNewsApiData, getNewsDataData, getNyTimesData } from "../utils/api";
import Loader from "./Loader";
import useDebouncedValue from "../hooks/useDebouncedValue";
import Dropdown from "./inputs/Dropdown";
import Input from "./inputs/Input";
import { shuffleArray } from "../utils/helpers";

function NewsFeed() {
    const [isLoading, setIsLoading] = useState(false);
    const [groupedArticles, setGroupedArticles] = useState<Array<IArticle>>([]);

    const [selectedSource, setSelectedSource] = useState("All");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedAuthor, setSelectedAuthor] = useState("All");

    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 250);

    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const filteredArticles = useMemo(() => {
        return groupedArticles.filter((article) => {
            const articleDate = new Date(article.date);

            const isWithinDateRange =
                (!startDate || articleDate >= new Date(startDate)) &&
                (!endDate || articleDate <= new Date(endDate));

            const matchesAuthor =
                selectedAuthor === "All" || article.authors?.includes(selectedAuthor);

            return (
                (selectedSource === "All" || article.source === selectedSource) &&
                (selectedCategory === "All" || article.category === selectedCategory) &&
                matchesAuthor &&
                isWithinDateRange &&
                article.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
            );
        });
    }, [groupedArticles, selectedSource, selectedCategory, selectedAuthor, debouncedSearchQuery, startDate, endDate]);

    const allowedSources = useMemo(() => {
        const allowedSourcesSet = new Set<string>();

        groupedArticles.forEach((article) => {
            allowedSourcesSet.add(article.source);
        });

        return ["All", ...allowedSourcesSet];
    }, [groupedArticles]);

    const allowedCategories = useMemo(() => {
        const allowedCategoriesSet = new Set<string>();

        groupedArticles.forEach((article) => {
            allowedCategoriesSet.add(article.category);
        });

        return ["All", ...allowedCategoriesSet];
    }, [groupedArticles]);

    const allowedAuthors = useMemo(() => {
        const allowedAuthorsSet = new Set<string>();

        groupedArticles.forEach((article) => {
            article.authors?.forEach((authorName) => {
                if (authorName)
                    allowedAuthorsSet.add(authorName);
            });
        });

        return ["All", ...allowedAuthorsSet];
    }, [groupedArticles]);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            getNewsApiData(),
            // getTheGuardianData(),
            getNyTimesData(),
            getNewsDataData(),
        ])
            .then((responses) => {
                const [
                    newsApiData,
                    /* theGuardianData, */
                    nyTimesData,
                    newsDataData
                ] = responses;

                const shuffledArticles = shuffleArray([
                    ...newsApiData,
                    // ...theGuardianData,
                    ...nyTimesData,
                    ...newsDataData
                ]);

                setGroupedArticles(shuffledArticles);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <div className="flex gap-x-4 mb-6 overflow-x-scroll lg:overflow-x-visible">
                {allowedSources.map((source) => (
                    <button
                        key={source}
                        type="button"
                        className={clsx(
                            `px-2 lg:px-4 py-2 rounded-md transition ease-in-out duration-500 cursor-pointer`,
                            selectedSource === source ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800"
                        )}
                        onClick={() => setSelectedSource(source)}
                    >
                        {source}
                    </button>
                ))}
            </div>

            <div className="flex flex-wrap gap-4 bg-white p-4 shadow rounded-md mb-6 items-center">
                <Input
                    type="text"
                    placeholder="Search articles..."
                    className="flex-1 min-w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <Dropdown
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    options={allowedCategories.map((category) => ({ label: category, value: category }))}
                />

                <Dropdown
                    value={selectedAuthor}
                    onChange={(e) => setSelectedAuthor(e.target.value)}
                    options={allowedAuthors.map((author) => ({ label: author, value: author }))}
                />

                <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />

                <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>

            {isLoading ? (
                <div className="flex justify-center">
                    <Loader />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                        <Article key={article.id} article={article} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default NewsFeed;
