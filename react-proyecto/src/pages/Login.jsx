import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Header from "../Components/Header";
import "./Pages.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("entre");

    axios
      .post(
        "http://localhost:3000/api/auth/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);

        localStorage.setItem("token", res.data.token);
        console.log("Login exitoso:", res.data);
        setLoading(false);
        redirectHome();
      })
      .catch((error) => {
        setError(error.message || "Error al iniciar sesión");
        setLoading(false);
        console.error(error);
      });
  };

  const redirectRegister = () => {
    navigate("/Register");
  };

  const redirectHome = () => {
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="box">
          <div className="icon-container">
            <div className="icon-bg">
              <div className="icon-content"></div>
            </div>
          </div>

          <div className="title">fakestagram</div>
          <div className="login-button-container">
            <div className="login-button-text"></div>
            <form className="login-form" onSubmit={handleLogin}>
              <div className="login_field">
                <input
                  type="email"
                  className="login_input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="login_field">
                <input
                  type="password"
                  className="login_input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button className="login_submit" type="submit" disabled={loading}>
                {loading ? "Cargando..." : "Login"}
              </button>
            </form>
            <div className="text-box">
              <span className="text-light">Create account</span>
              <span
                className="text-bold"
                style={{ textDecoration: "bold", cursor: "pointer" }}
                onClick={redirectRegister}
              >
                {" "}
                here
              </span>
              {error && (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
