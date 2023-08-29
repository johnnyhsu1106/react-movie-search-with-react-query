import { useMovieSearchContext } from '../../context/MovieSearchContext';
import MovieList from './MovieList'
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
    <MovieList />
  )
}

export default SearchResults;