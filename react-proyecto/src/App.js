import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import Register from "./pages/Register";
import ProfilePage from "./pages/Profile";
import NoPage from "./pages/NoPage";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <div className="Routes">
      <BrowserRouter>
        <Routes>
          {/* Ruta pública */}
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<Register />} />

          {/* Rutas privadas */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/Profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          {/* Ruta para manejar 404 */}
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
