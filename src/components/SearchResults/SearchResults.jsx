import { useMovieSearchContext } from '../../context/MovieSearchContext';
import MovieList from './MovieList'
import SearchResultsTitle from './SearchResultsTitle';
import Loading from '../Loading';
import Error from '../Error';

const SearchResults = () => {
  const {
    isLoading,
    isError
  } = useMovieSearchContext();

  if (isLoading) {
    return <Loading />;
  } 
  
  if (isError) {
    return <Error />
  }

  return (
    <>
      <SearchResultsTitle />
      <MovieList />
    </>
    
  )
}

export default SearchResults;