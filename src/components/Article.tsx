import React from 'react'
import { IArticle } from '../utils/interfaces'

interface Props {
    article: IArticle
}

const Article: React.FC<Props> = ({ article }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
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
    )
}

export default Article