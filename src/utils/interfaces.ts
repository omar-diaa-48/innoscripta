import { ArticleSource } from "./enums";

export interface INewsApiResponse {
  status: string;
  totalResults: 41651;
  articles: Array<INewsApiArticle>;
}

export interface INewsApiArticle {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface ITheGuardianResponse {
  status: string;
  userTier: string;
  total: number;
  startIndex: number;
  pageSize: number;
  currentPage: number;
  pages: number;
  orderBy: string;
  results: Array<ITheGuardianArticle>;
}

export interface ITheGuardianArticle {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
}

export interface INYTimesResponse {
  status: string;
  copyright: string;
  response: {
    docs: Array<INYTimesArticle>;
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}

export interface INYTimesArticle {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  multimedia: Array<{
    rank: number;
    subtype: string;
    caption: string | null;
    credit: string | null;
    type: string;
    url: string;
    height: number;
    width: number;
    legacy: {
      xlarge: string;
      xlargewidth: number;
      xlargeheight: number;
    };
    subType: string;
    crop_name: string;
  }>;
  headline: {
    main: string;
    kicker: string | null;
    content_kicker: string | null;
    print_headline: string | null;
    name: string | null;
    seo: string | null;
    sub: string | null;
  };
  keywords: Array<{
    name: string;
    value: string;
    rank: number;
    major: string;
  }>;
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  subsection_name?: string;
  byline: {
    original: string;
    person: Array<{
      firstname: string;
      middlename: string | null;
      lastname: string;
      qualifier: string | null;
      title: string | null;
      role: string;
      organization: string;
      rank: number;
    }>;
    organization: string | null;
  };
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
}

export interface IArticle {
  source: keyof typeof ArticleSource;

  title: string;
  description: string;
  category: string;
  imageSrc: string;
}
