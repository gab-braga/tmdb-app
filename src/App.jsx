import { ThemeProvider } from './context/ThemeContext';
import { MoviesProvider } from './context/MoviesContext';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Root from './pages/Root/Root';
import Home from './pages/Home/Home';
import Movie from './pages/Movie/Movie';

function App() {
  return (
    <ThemeProvider>
      <MoviesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />}>
              <Route path="" element={<Home />} />
              <Route path="/movies/:id" element={<Movie />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </MoviesProvider>
    </ThemeProvider>
  );
}

export default App;
