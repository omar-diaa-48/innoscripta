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
        category: item.source.name,
        imageSrc: item.urlToImage,
        description: item.description,
        title: item.title,
        source: ArticleSource.NEWS_API,
      }));

    case ArticleSource.THE_GUARDIAN:
      return (response as ITheGuardianResponse).results.map((item, index) => ({
        id: Date.now() + index,
        category: item.sectionName,
        imageSrc: item.webUrl,
        description: item.pillarName,
        title: item.webTitle,
        source: ArticleSource.NEWS_API,
      }));

    case ArticleSource.NY_TIMES:
      return (response as INYTimesResponse).response.docs.map(
        (item, index) => ({
          id: Date.now() + index,
          category: item.section_name,
          imageSrc: item.multimedia[0].url,
          description: item.lead_paragraph,
          title: item.headline.main,
          source: ArticleSource.NEWS_API,
        })
      );

    default:
      return [];
  }
};
