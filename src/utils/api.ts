import ky from "ky";
import { ArticleSource } from "./constants";
import { mapResponseToArticles } from "./helpers";
import { INewsApiResponse } from "./interfaces";

export const getNewsApiData = async () => {
  const response = await ky
    .get<INewsApiResponse>(
      `https://newsapi.org/v2/everything?q=Apple&sortBy=popularity&apiKey=${
        import.meta.env.VITE_NEWS_API_KEY
      }`
    )
    .json();
  return mapResponseToArticles(response, ArticleSource.NEWS_API);
};
