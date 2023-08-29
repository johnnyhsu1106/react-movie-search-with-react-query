import { useState, createContext, useContext, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMovieData } from '../utils/fetchMovies';

const PAGE_PER_BUCKET = 10;
const MovieSearchContext = createContext({});

const useMovieSearchContext = () => {
  return useContext(MovieSearchContext);
};


const MovieSearchProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const [query, setQuery] = useState('');
  const [currPageNum, setCurrPageNum] = useState(null);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['movies', query, currPageNum],
    queryFn: async () => { return fetchMovieData(query, currPageNum)}
  });

  const numOfPages = data?.total_pages || 0;
  const numOfResults = data?.total_results || 0;
  const movies = data?.results?.map((result) => { return result }) || [];

  const currBucket = Math.floor((currPageNum - 1) / PAGE_PER_BUCKET);
  const lastBucket = numOfPages !== 0 ? Math.floor((numOfPages - 1) / PAGE_PER_BUCKET) : 0;


  const handlePrevQueryCancel = () => {
    queryClient.cancelQueries({ queryKey: ['movies'] })
  };

  const handleSearchQuery = (query) => {
    handlePrevQueryCancel();
    setQuery(query);
    setCurrPageNum(1);
  };

  const handlePageNumClick = (pageNumber) => {
    handlePrevQueryCancel();
    setCurrPageNum(pageNumber);
  };

  const handlePrevClick = (decrement) => {
    handlePrevQueryCancel();
    setCurrPageNum((prevPageNumber) => {
      return prevPageNumber + decrement <= 0 ? 0 : prevPageNumber + decrement;
    });
  };

  const handleNextClick = (increment) => {
    handlePrevQueryCancel();
    setCurrPageNum((prevPageNumber) => {
      return prevPageNumber + increment >= numOfPages ? numOfPages : prevPageNumber + increment;
    });
  };
  

  const context = {
    query,
    movies,
    currPageNum,
    currBucket,
    lastBucket,
    numOfPages,
    numOfResults,
    isLoading,
    isError,
    handleSearchQuery,
    handlePrevClick,
    handleNextClick,
    handlePageNumClick
  };

  return (
    <MovieSearchContext.Provider value={context}>
      {children}
    </MovieSearchContext.Provider>
  )
}

export { useMovieSearchContext, MovieSearchProvider };