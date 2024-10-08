import React, { createContext, useState, ReactNode } from 'react';
import { Repository } from '../models/Repository';

interface SearchContextProps {
  query: string;
  setQuery: (query: string) => void;
  results: Repository[];
  setResults: (results: Repository[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  selectedItems: Repository[];
  setSelectedItems: (selectedItems: Repository[]) => void;
}

export const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<Repository[]>([]);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        results,
        setResults,
        loading,
        setLoading,
        selectedItems,
        setSelectedItems,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
