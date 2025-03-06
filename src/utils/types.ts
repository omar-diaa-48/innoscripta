import { ArticleSource } from "./constants";

export type ArticleSourceType = (typeof ArticleSource)[keyof typeof ArticleSource];
