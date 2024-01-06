import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Nav from "../Nav";
import Users from "./Users";
import Login from "./Login";

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();

  // Conditionally rendering the layout with Nav
  if (location.pathname !== "/login") {
    return (
      <div className="flex flex-row">
        <Nav />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    );
  }

  // Layout for the login page without Nav
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
