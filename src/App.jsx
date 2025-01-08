import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Root from './pages/root';
import Home from './pages/home';
import Movie from './pages/movie';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route path="" element={<Home />} />
            <Route path="/movies/:id" element={<Movie />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
