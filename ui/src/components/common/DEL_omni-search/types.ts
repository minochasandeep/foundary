export type ChipData = {
  key: number;
  label: string;
  type: string;
};

export enum SearchType {
  ORGANIZATION = "organization",
  GROUP = "group",
  SITE = "site",
  ALL = "all",
}

export type SearchParams = {
  query: string;
  filters?: ChipData[];
};

export type SearchResult = {
  id: number;
  name: string;
  type: SearchType;
};

export type RecentSearch = {
  id: number;
  result: SearchResult;
};

export type SearchResponse = {
  results: SearchResult[];
  limit: number;
  offset: number;
  total_results: number;
};
