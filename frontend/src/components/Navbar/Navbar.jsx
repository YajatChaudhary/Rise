import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
// import MenuIcon from '@mui/icons-material/Menu';

export const Navbar = ({ setToken, setUserId, username }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear token and userId from local storage
    localStorage.removeItem("token");
    setToken(null);
    setUserId(null);

    // Optionally, call the backend logout endpoint
    fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data); // Handle any response if needed
        if (data) {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div style={{ width: "100vw" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My-To-Do
          </Typography>
          <Button variant="outlined" color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
