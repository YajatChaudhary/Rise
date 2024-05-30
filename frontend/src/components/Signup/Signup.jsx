import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./Signup.scss";
import {useState} from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'

const Signup = ({setUserId}) => {
  const [userName,setUserName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmpassword,setConfirmpassword]=useState("")

const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const response=await axios.post('http://localhost:5000/api/auth/signup', { userName, email, password });
            console.log(response);
            setUserId(response.data.userId);
            if(response.statusText=201){
              toast.success('User has been created successfully');
              resetForm();
            }

            // history.push('/login');
        } catch (error) {
            console.error('Error signing up:', error);
            toast.error('Error signing up');
        }
    };

  return (
    <div className="signup-container">
      <form className="signup-form">
        <h2>Sign Up</h2>
        <div className="input-group">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            name="name"
            onChange={(e)=>setUserName(e.target.value)}
            required

          />
        </div>
        <div className="input-group">
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
             onChange={(e)=>setEmail(e.target.value)}
             required
          />
        </div>
        <div className="input-group">
          <TextField
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
            name="password"
             onChange={(e)=>setPassword(e.target.value)}
             required
          />
        </div>
        <div className="input-group">
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            type="password"
            variant="outlined"
            name="password"
             onChange={(e)=>setConfirmpassword(e.target.value)}
             required
          />
        </div>
        <Button type="submit" variant="contained" onClick={handleSignUp}>
          Sign Up
        </Button>
      </form>
      <p>
        Already have an account ? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
