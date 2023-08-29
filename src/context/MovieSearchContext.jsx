import { useState, createContext, useContext, useMemo } from 'react';
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
  const currBucket = currPageNum !== null ? Math.floor((currPageNum - 1) / PAGE_PER_BUCKET) : null;
  const lastBucket = numOfPages !== 0 ? Math.floor((numOfPages - 1) / PAGE_PER_BUCKET) : null;


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

  const handlePrevBtnClick = () => {
    handlePrevQueryCancel();
    setCurrPageNum((prevPageNum) => {
      return prevPageNum -1 <= 0 ? 0 : prevPageNum - 1;
    });
  };

  const handleNextBtnClick = () => {
    handlePrevQueryCancel();
    setCurrPageNum((prevpageNum) => {
      return prevpageNum + 1 >= numOfPages ? numOfPages : prevpageNum + 1;
    });
  };


  const context = {
    query,
    movies,
    currPageNum,
    currBucket,
    lastBucket,
    PAGE_PER_BUCKET,
    numOfPages,
    numOfResults,
    isLoading,
    isError,
    handleSearchQuery,
    handlePrevBtnClick,
    handleNextBtnClick,
    handlePageNumClick
  };

  return (
    <MovieSearchContext.Provider value={context}>
      {children}
    </MovieSearchContext.Provider>
  )
}

export { useMovieSearchContext, MovieSearchProvider };