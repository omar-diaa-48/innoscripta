import { ArticleSource } from "./constants";
import {
  IArticle,
  INewsApiResponse,
  INYTimesResponse,
  ITheGuardianResponse,
} from "./interfaces";
import { ArticleSourceType } from "./types";

export const mapResponseToArticles = (
  response: INewsApiResponse | ITheGuardianResponse | INYTimesResponse,
  type: ArticleSourceType
): Array<IArticle> => {
  switch (type) {
    case ArticleSource.NEWS_API:
      return (response as INewsApiResponse).articles.map((item, index) => ({
        id: Date.now() + index,
        // NEWS API source does not categorize articles, so we use "News" to be a general category
        category: "News",
        imageSrc: item.urlToImage,
        description: item.description,
        title: item.title,
        date: new Date(item.publishedAt),
        articleUrl: item.url,
        source: ArticleSource.NEWS_API,
        authors: [item.author],
      }));

    case ArticleSource.THE_GUARDIAN:
      return (response as ITheGuardianResponse).results.map((item, index) => ({
        id: Date.now() + index,
        category: item.sectionName,
        imageSrc: item.webUrl,
        description: item.pillarName,
        title: item.webTitle,
        date: new Date(item.webPublicationDate),
        articleUrl: item.webUrl,
        source: ArticleSource.THE_GUARDIAN,
        authors: [],
      }));

    case ArticleSource.NY_TIMES:
      return (response as INYTimesResponse).response.docs.map((item, index) => {
        const authors = item?.byline?.person?.map(
          (author) => `${author.firstname} ${author.lastname}`
        );

        return {
          id: Date.now() + index,
          category: item.section_name,
          imageSrc: "https://www.nytimes.com/" + item.multimedia[0]?.url,
          description: item.lead_paragraph,
          title: item.headline.main,
          date: new Date(item.pub_date),
          articleUrl: item.web_url,
          source: ArticleSource.NY_TIMES,
          authors,
        };
      });

    default:
      return [];
  }
};

export const shuffleArray = (array: any[]) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};
