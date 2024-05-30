import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import TodoList from "./components/TodoList/TodoList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./components/Home/Home";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(null); // manage the logged-in user's ID
  const [username, setUsername] = useState("");
  console.log(token);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/signup" element=<Signup setUserId={setUserId} /> />
        <Route
          path="/login"
          element={
            <Login
              setToken={setToken}
              setUserId={setUserId}
              setUsername={setUsername}
            />
          }
        />
        {token && (
          <Route
            path="/todos"
            element={
              <TodoList
                token={token}
                userId={userId}
                setToken={setToken}
                setUserId={setUserId}
                username={username}
              />
            }
          />
        )}
        <Route path="/" element=<HomePage />></Route>
      </Routes>
    </>
  );
};

export default App;
