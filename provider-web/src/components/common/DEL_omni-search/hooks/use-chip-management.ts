import { useState, useRef, useEffect } from "react";
import { type ChipData, SearchType } from "../types";

export function useChipManagement() {
  const [chipData, setChipData] = useState<ChipData[]>([
    { key: 0, label: "Organizations", type: SearchType.ORGANIZATION },
    { key: 1, label: "Groups", type: SearchType.GROUP },
    { key: 2, label: "Sites", type: SearchType.SITE },
  ]);
  const [filters, setFilters] = useState<ChipData[]>([]);
  const nextKeyRef = useRef(chipData.length);
  const chipDataRef = useRef(chipData);
  const filtersRef = useRef(filters);

  useEffect(() => {
    chipDataRef.current = chipData;
  }, [chipData]);

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  const handleChipClick = (data: ChipData) => {
    setFilters((chips) => [
      ...chips,
      { key: nextKeyRef.current++, label: data.label, type: data.type },
    ]);
    handleChipDelete(data);
  };

  const handleChipDelete = (chipToDelete: ChipData) => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key),
    );
  };

  const handleFilterDelete = (chipToDelete: ChipData) => {
    setFilters((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key),
    );
    setChipData([...chipDataRef.current, chipToDelete]);
  };

  return {
    chipData,
    filters,
    handleChipClick,
    handleChipDelete,
    handleFilterDelete,
    setChipData,
    setFilters,
    chipDataRef,
    filtersRef,
  };
}
