import Container from './components/Container/Container';
import SearchBar from './components/SearchBar/SearchBar';
import Title from './components/Title';
import Movies from './components/Movies/Movies';
import Pagination from './components/Pagination/Pagination';
import { MovieSearchProvider } from './context/MovieSearchContext.jsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import './App.css'

const queryClient = new QueryClient();

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <MovieSearchProvider>
        <Container>
          <SearchBar />
          <Title />
          <Pagination />
          <Movies />
        </Container>
      </MovieSearchProvider>
    </QueryClientProvider>
  );
}
export default App;
