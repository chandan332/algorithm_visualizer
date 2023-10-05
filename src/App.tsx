import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sudoku from "./pages/Sudoku";

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="sudoku" element={<Sudoku />} />
      </Route>
    </Routes>
  );
};

export default App;
