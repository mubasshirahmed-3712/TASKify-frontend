import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signup.css"; // Import custom styles
axios.defaults.withCredentials = true;

function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://taskify-backend-nm7p.onrender.com/user/signup",
        {
          username,
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
      // console.log(data);
      toast.success(data.message || "User registered successfully");
      localStorage.setItem("jwt", data.token);
      navigateTo("/login");
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors || "User registration failed");
    }
  };

  return (
    <div className="signup-container">
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

      {/* Signup Form */}
      <div className="signup-box">
        <h2 className="signup-title">Signup</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Type Username"
              required
            />
          </div>
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

          <button type="submit" className="signup-button">
            Signup
          </button>
        </form>
        <p className="login-link">
          Already have an account?{" "}
          <Link to="/login" className="login-text">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
