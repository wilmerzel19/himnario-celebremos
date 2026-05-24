import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Present from "./pages/Present";
import NewHymn from "./pages/NewHymn";
import EditHymn from "./pages/EditHymn";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/present/:id"
          element={<Present />}
        />

        <Route
          path="/new"
          element={<NewHymn />}
        />
        <Route
  path="/edit/:id"
  element={<EditHymn />}
/>

      </Routes>

    </BrowserRouter>

  );

}