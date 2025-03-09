import ky from "ky";
import { ArticleSource } from "./constants";
import { mapResponseToArticles } from "./helpers";
import { INewsApiResponse, ITheGuardianResponse } from "./interfaces";

export const api = ky.create({
  cache: "default",
  timeout: 3000,
  retry: 2,
});

export const getNewsApiData = async () => {
  try {
    const response = await api
      .get<INewsApiResponse>(
        `https://newsapi.org/v2/everything?q=General&apiKey=${
          import.meta.env.VITE_NEWS_API_KEY
        }`
      )
      .json();
    return mapResponseToArticles(response, ArticleSource.NEWS_API);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTheGuardianData = async () => {
  try {
    const response = await api
      .get<ITheGuardianResponse>(`https://content.guardianapis.com/search`, {
        headers: {
          "api-key": import.meta.env.VITE_THEGUARDIAN_API_KEY,
        },
        mode: "no-cors",
      })
      .json();

    return mapResponseToArticles(response, ArticleSource.THE_GUARDIAN);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getNyTimesData = async () => {
  try {
    const response = await api
      .get<ITheGuardianResponse>(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${
          import.meta.env.VITE_NEWYORKTIMES_API_KEY
        }`
      )
      .json();

    return mapResponseToArticles(response, ArticleSource.NY_TIMES);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getNewsDataData = async () => {
  try {
    const response = await api
      .get<ITheGuardianResponse>(
        `https://newsdata.io/api/1/latest?language=en&apiKey=${
          import.meta.env.VITE_NEWS_DATA_API_KEY
        }`
      )
      .json();

    return mapResponseToArticles(response, ArticleSource.NEWS_DATA);
  } catch (error) {
    console.error(error);
    return [];
  }
};
