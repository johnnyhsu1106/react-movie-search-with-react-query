import { useState } from 'react';
import { useMovieSearchContext } from '../context/MovieSearchContext';


const Title = () => {
  const { 
    query,
    numOfResults, 
  } = useMovieSearchContext();

  if (query.trim() === '' && numOfResults === 0) {
    return null;
  }

  return (
    <>
      <h2>{query}</h2>
      <p>{ numOfResults > 0 ? `${numOfResults} result(s)` : 'no result' }</p>
    </>
  )
}

export default Title;
