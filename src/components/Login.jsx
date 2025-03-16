import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Import custom styles

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://taskify-backend-nm7p.onrender.com/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      toast.success(data.message || "Login successful");
      localStorage.setItem("jwt", data.token);
      navigateTo("/");

      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors || "Login failed");
    }
  };

  return (
    <div className="login-container">
      {/* Logo Section */}
      <div className="logo-container">
        <h1 className="logo">
          <span className="logo-task">{"<"}TASK</span>
          <span className="logo-ify">ify{"/>"}</span>
        </h1>
        <p className="logo-tagline">
          A fun, casual way of saying &quot;it&apos;s done!&quot;
        </p>
      </div>

      {/* Login Form */}
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type Email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type Password"
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="signup-link">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="signup-text">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
