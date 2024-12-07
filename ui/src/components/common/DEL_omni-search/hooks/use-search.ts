import { useState, useEffect, useCallback } from "react";
import type {
  SearchResponse,
  SearchResult,
  RecentSearch,
  ChipData,
} from "../types";
import useSWRInfinite from "swr/infinite";
import { debounce } from "@mui/material";

export function useSearch(filters: ChipData[]) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResponse[] | null>(
    null,
  );
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { data, size, setSize, isLoading } = useSWRInfinite<SearchResponse>(
    (pageIdx: number, previousPageData: SearchResponse) => {
      if (previousPageData && !previousPageData.results.length) return null;
      const searchFilters = filters.map((filter: ChipData) => filter.type);
      const searchType = searchFilters.length
        ? `&type=${searchFilters.join(",")}`
        : "";
      if (pageIdx === 0)
        return `/searchinator?query=${query}${searchType}&offset=0&limit=5`;
      const offset =
        previousPageData.total_results < previousPageData.offset + 5
          ? previousPageData.total_results
          : previousPageData.offset + 5;
      if (offset >= previousPageData.total_results) setHasMore(false);
      return searchValue
        ? `/searchinator?query=${query}${searchType}&offset=${offset}&limit=5`
        : null;
    },
    {
      revalidateFirstPage: false,
    },
  );

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue]);

  const debouncedSearch = useCallback(
    debounce((criteria: string) => {
      setQuery(criteria);
    }, 200),
    [],
  );

  useEffect(() => {
    setSearchResults(data ?? []);
  }, [data, isLoading]);

  useEffect(() => {
    if (!searchResults || searchResults.length === 0) {
      return;
    }
    const res = searchResults?.flatMap((result) => result.results ?? []) ?? [];

    setRecentSearches((searches) => {
      const existingIds = new Set(searches.map((search) => search.id));
      const startId = searches.at(-1)?.id ?? 0;
      const newSearches = res
        .map((result, idx) => ({
          id: startId + idx + 1,
          result,
        }))
        .filter((search) => !existingIds.has(search.id));

      return [...searches, ...newSearches];
    });
  }, [searchResults]);

  useEffect(() => {
    if (recentSearches.length > 0) {
      localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    }
  }, [recentSearches]);

  const filterRecentSearches = (
    recent: RecentSearch[],
    results: SearchResult[],
  ) => {
    const resultIds = new Set(results.map((result) => result.name));
    return recent.filter((search) => !resultIds.has(search.result.name));
  };

  useEffect(() => {
    const recentSearches = JSON.parse(
      localStorage.getItem("recentSearches") ?? "[]",
    ) as RecentSearch[];
    const uniqueRecentSearches = Array.from(new Set(recentSearches));
    setRecentSearches(uniqueRecentSearches);
  }, []);

  const getFilteredRecentSearches = () => {
    if (searchResults && searchResults.length > 0) {
      const res = searchResults.flatMap((result) => result.results ?? []);
      return filterRecentSearches(recentSearches, res);
    }
    return recentSearches;
  };

  return {
    searchValue,
    setSearchValue,
    searchResults,
    recentSearches,
    size,
    setSize,
    hasMore,
    getFilteredRecentSearches,
    setSearchResults,
    setRecentSearches,
  };
}
