import { useState, createContext, useContext, useMemo, useEffect } from 'react';
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

  const numOfPages = data?.total_pages;
  const numOfResults = data?.total_results;
  const movies = data?.results?.map((result) => { return result }) || [];
  const currBucket = currPageNum !== null ? Math.floor((currPageNum - 1) / PAGE_PER_BUCKET) : null;
  const lastBucket = numOfPages !== 0 ? Math.floor((numOfPages - 1) / PAGE_PER_BUCKET) : null;

  useEffect(() => {
    console.log(query);
  }, [query])

  const handlePrevQueryCancel = () => {
    queryClient.cancelQueries({ queryKey: ['movies'] })
  };

  const handleSearchQuery = (query) => {
    handlePrevQueryCancel();
    setQuery(query);
    setCurrPageNum(1);
  };

  const handlePageNumClick = (pageNum) => {
    handlePrevQueryCancel();
    setCurrPageNum(pageNum);
  };

  const handleNavButtonClick = (increment, lastpageNum) => {
    setCurrPageNum((prevpageNum) => {
      return prevpageNum + increment === lastpageNum ? lastpageNum : prevpageNum + increment;
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
    PAGE_PER_BUCKET,
    handleSearchQuery,
    handleNavButtonClick,
    handlePageNumClick
  };

  return (
    <MovieSearchContext.Provider value={context}>
      {children}
    </MovieSearchContext.Provider>
  )
}

export { useMovieSearchContext, MovieSearchProvider };