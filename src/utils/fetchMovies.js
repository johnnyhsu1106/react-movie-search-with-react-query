
const API_ENDPOINT = 'https://api.themoviedb.org/3/search/movie';
const API_TOKEN = import.meta.env.VITE_MOVIE_API_TOKEN; // import the api token from env.local
const OPTIONS  = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`
  }
};

const fetchMovieData = async (query, currPageNum) => {
  if (query === '' || currPageNum === null) {
    return {};
  }
  try {
    const res = await fetch(`${API_ENDPOINT}?query=${query}&page=${currPageNum}`, OPTIONS);
    if (!res.ok) {
      throw new Error('Invalid HTTP Request');
    }
    return res.json();
    
  } catch (error) {
    console.error(error);
  }
  

}

export default fetchMovieData;