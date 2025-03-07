import React from "react";
import { IArticle } from "../utils/interfaces";
import ExternalLink from "./icons/ExternalLink";

interface Props {
    article: IArticle;
}

const Article: React.FC<Props> = ({ article }) => {
    return (
        <div className="flex flex-col bg-white p-2 lg:p-4 rounded-lg shadow relative">
            {/* Source Tag */}
            <span className="absolute top-4 left-4 lg:top-8 lg:left-8 bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
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

            <div className="flex justify-between text-xs text-gray-400">
                {/* Article Date */}
                <p>
                    Published: {new Date(article.date).toLocaleDateString()}
                </p>

                {
                    article.articleUrl && (
                        <a
                            target="_blank"
                            href={article.articleUrl}
                        >
                            <span aria-label="Read more">
                                <ExternalLink />
                            </span>
                        </a>
                    )
                }
            </div>
        </div>
    );
};

export default Article;
