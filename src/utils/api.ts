import ky from "ky";
import { ArticleSource } from "./constants";
import { mapResponseToArticles } from "./helpers";
import { INewsApiResponse, ITheGuardianResponse } from "./interfaces";

export const getNewsApiData = async () => {
  const response = await ky
    .get<INewsApiResponse>(
      `https://newsapi.org/v2/everything?q=Apple&apiKey=${
        import.meta.env.VITE_NEWS_API_KEY
      }`
    )
    .json();
  return mapResponseToArticles(response, ArticleSource.NEWS_API);
};

export const getTheGuardianData = async () => {
  const response = await ky
    .get<ITheGuardianResponse>(`https://content.guardianapis.com/search`, {
      headers: {
        "api-key": import.meta.env.VITE_THEGUARDIAN_API_KEY,
      },
      mode: "no-cors",
    })
    .json();

  return mapResponseToArticles(response, ArticleSource.THE_GUARDIAN);
};

export const getNyTimesData = async () => {
  const response = await ky
    .get<ITheGuardianResponse>(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${
        import.meta.env.VITE_NEWYORKTIMES_API_KEY
      }`
    )
    .json();

  return mapResponseToArticles(response, ArticleSource.NY_TIMES);
};
