
const API_ENDPOINT = 'https://api.themoviedb.org/3/search/movie';
const API_TOKEN = import.meta.env.VITE_MOVIE_API_TOKEN; // import the api token from env.local

const fetchMovieData = async (query, pageNumber) => {
  const options  = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    }
  };

  const res = await fetch(`${API_ENDPOINT}?query=${query}&page=${pageNumber}`, options);
  const data = await res.json();
  return data;
}

export { fetchMovieData };