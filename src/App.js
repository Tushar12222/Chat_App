import "./App.css";
import Home from "./Components/Home";
import Chats from "./Global state variables and functions/chats/Chats";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Messages from "./Components/Messages";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Users from "./Global state variables and functions/users/Users";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <Router>
        <Chats>
          <Users>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/messages" element={<Messages />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </Users>
        </Chats>
      </Router>
    </>
  );
}

export default App;
