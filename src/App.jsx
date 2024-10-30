import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Root from "./pages/root";
import Home from "./pages/home";
import Movie from "./pages/movie";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="" element={<Home />} />
          <Route path="/movies/:id" element={<Movie />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
