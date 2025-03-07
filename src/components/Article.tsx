import React from "react";
import { IArticle } from "../utils/interfaces";

interface Props {
    article: IArticle;
}

const Article: React.FC<Props> = ({ article }) => {
    return (
        <div className="flex flex-col bg-white p-4 rounded-lg shadow relative">
            {/* Source Tag */}
            <span className="absolute top-8 left-8 bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
                {article.source}
            </span>

            {/* Article Image */}
            {article.imageSrc ? (
                <img
                    src={article.imageSrc}
                    alt={article.title}
                    className="w-full h-40 object-cover text-center rounded-md mb-4"
                />
            ) : (
                <div className="w-full h-40 bg-blue-400 rounded-md mb-4" />
            )}

            {/* Title and Meta Info */}
            <h3 className="text-lg font-bold mb-1 grow">{article.title}</h3>
            <p className="text-sm text-gray-500">{article.category}</p>

            {/* Article Date */}
            <p className="text-xs text-gray-400 mt-2">
                Published: {new Date(article.date).toLocaleDateString()}
            </p>
        </div>
    );
};

export default Article;
