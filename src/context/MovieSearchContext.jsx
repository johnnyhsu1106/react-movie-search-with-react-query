import { useState, createContext, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMovieData } from '../utils/fetchMovies';


const MovieSearchContext = createContext({});

const useMovieSearchContext = () => {
  return useContext(MovieSearchContext);
};


const MovieSearchProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const { 
    data, 
    isLoading, 
    isError 
  } = useQuery({
    queryKey: ['movies', query, pageNumber],
    queryFn: async () => { return fetchMovieData(query, pageNumber)}
  });

  const handlePrevQueryCancel = () => {
    queryClient.cancelQueries({ queryKey: ['movies'] })
  };

  const handleSearchQuery = (query) => {
    handlePrevQueryCancel();
    setQuery(query);
    setPageNumber(1);
  };

  const handlePageNumClick = (pageNumber) => {
    handlePrevQueryCancel();
    setPageNumber(pageNumber);
  };

  const handleButtonClick = (increment, lastPageNumber) => {
    handlePrevQueryCancel();
    setPageNumber((prevPageNumber) => {
      return prevPageNumber + increment === lastPageNumber ? lastPageNumber : prevPageNumber + increment;
    });
  };

  const context = {
    query,
    movies: data?.results.map((result) => { return result }) || [],
    pageNumber,
    numOfPages: data?.total_pages,
    numOfResults: data?.total_results,
    isLoading,
    isError,
    handleSearchQuery,
    handleButtonClick,
    handlePageNumClick
  };

  return (
    <MovieSearchContext.Provider value={context}>
      {children}
    </MovieSearchContext.Provider>
  )
}

export { useMovieSearchContext, MovieSearchProvider };