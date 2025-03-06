import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { IArticle } from "./utils/interfaces";
import { ArticleSource } from "./utils/enums";

const sources = ["All", ArticleSource.NEWS_API, ArticleSource.NY_TIMES, ArticleSource.THE_GUARDIAN];
const categories = ["All", "Business", "Tech", "Sports"];

const demoArticles: Array<IArticle> = [
  {
    id: 1,
    title: "Tech Innovations in 2025",
    source: ArticleSource.NEWS_API,
    category: "Tech",
    imageSrc: "",
    description: ''
  },
  {
    id: 2,
    title: "Global Markets Update",
    source: ArticleSource.NY_TIMES,
    category: "Business",
    imageSrc: "",
    description: ''
  },
  {
    id: 3,
    title: "Sports Highlights This Week",
    source: ArticleSource.THE_GUARDIAN,
    category: "Sports",
    imageSrc: "",
    description: ''
  },
  {
    id: 4,
    title: "US stock market crashes",
    source: ArticleSource.THE_GUARDIAN,
    category: "Finance",
    imageSrc: "",
    description: ''
  },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")

  const filteredArticles = useMemo(() => demoArticles.filter(
    (article) =>
      (activeTab === "All" || article.source === activeTab) &&
      (selectedCategory === "All" || article.category === selectedCategory) &&
      article.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  ), [activeTab, selectedCategory, debouncedSearchQuery]);

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

          <div key={article.id} className="bg-white p-4 rounded-lg shadow">
            {
              article.imageSrc ? (
                <img
                  src={article.imageSrc}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              ) : (
                <div className="w-full h-40 bg-blue-400" />
              )
            }

            <h3 className="text-lg font-bold">{article.title}</h3>
            <p className="text-sm text-gray-500">{article.source} • {article.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
