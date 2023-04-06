import { useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  const login = async () => {
    try {
      let res = await fetch("http://localhost:3001/authors/login", {
        method: "POST",
        body: JSON.stringify({ email: username, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        let { accessToken } = await res.json();
        localStorage.setItem("token", accessToken);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h1 className="mt-5">Login</h1>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <br />
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
      <br />

      <a href="http://localhost:3001/authors/googleLogin">
        <button> Login with Google </button>
      </a>
    </Container>
  );
};

export default LoginPage;
