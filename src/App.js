import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import NavBar from "./Components/NavBar/NavBar";
import Home from "./pages/home/Home";
import LogIn from "./pages/login/LogIn";
import SignUp from "./pages/signup/SignUp";
import Settings from "./pages/settings/Settings";

import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <Router>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={!user ? <Navigate to="/login" /> : <Home />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <LogIn />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <SignUp />}
            />
            <Route
              path="/settings"
              element={user ? <Settings /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
