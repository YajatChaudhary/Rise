import { Link } from 'react-router-dom';
import "./Home.scss"
const HomePage = () => {
  return (
    <div>
      <h1>My Todo App</h1>
      <p>This app helps you organize your tasks and stay productive.</p>
      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;