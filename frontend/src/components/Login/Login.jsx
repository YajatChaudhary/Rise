import TextField from "@mui/material/TextField";
import "./Login.scss";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";

const Login = ({ setToken, setUserId, setUsername }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      console.log(response);
      const { token } = response.data;
      setToken(token);
      localStorage.setItem("token", token);
      if ((response.status = 201)) {
        setUserId(response.data.userId);
        setUsername(response.data.userName);
        localStorage.setItem("username", response.data.userName);
        navigate("/todos");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>
        <div className="input-group">
          {/* <label htmlFor="email">Email</label> */}
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          {/* <label htmlFor="password">Password</label> */}
          <TextField
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </form>
      <p>
        Don't have an account ?<Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
