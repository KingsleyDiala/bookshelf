import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAllContext } from "../context/context";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, logOut } = useAllContext();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await login(email, password);
    if (response === null) setError(true);
    if (response) {
      navigate('/manage-book');
    }
  };



  return (
    <>
      <div className=" login">
        <form onSubmit={handleLogin} action="">
          <input
            type="email"
            placeholder="E-Mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Passwort"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button button__primary" type="submit">
            <span>Einloggen</span>
          </button>
          {error && (
            <span className="error">
              Falsche E-Mail oder falsches Passwort!
            </span>
          )}
        </form>
      </div>
    </>
  );
};

export default Login;
