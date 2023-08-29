import Container from './components/Container/Container';
import SearchBar from './components/SearchBar/SearchBar';
import Title from './components/Title';
import SearchResults from './components/SearchResults/SearchResults';
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
          <SearchResults />
        </Container>
      </MovieSearchProvider>
    </QueryClientProvider>
  );
}
export default App;
