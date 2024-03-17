/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import "../style/login.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginButton = async (event) => {
    event.preventDefault();

    try {
      let response = await fetch(
        "https://erphomeapi.azurewebsites.net/CompanyLogin?loginId",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ loginId: userid, loginPassword: password }),
        }
      );
      console.log(response, "jjj");
      let data = await response.json();
      localStorage.setItem("token", data.result.token);
      localStorage.setItem("loginId", data.result.loginId);

      if (data.result.message === "Login successful") {
        navigate("/deshboard");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="formMainConatainer">
        <h1 className="mainHeading">Welcome to ERP</h1>

        <form className="form" onSubmit={handleLoginButton}>
          <div className="userId">
            <label>user id</label>
            <input
              className="userIdExample"
              type="text"
              placeholder="example@mail.com"
              value={userid}
              onChange={(event) => setUserId(event.target.value)}
            />
          </div>

          <div className="passwordCont">
            <label>Password</label>
            <input
              className="passwordInput"
              type="text"
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="forLogButton">
            <div className="loginButton">
              <button className="loginmain" type="submit">
                LOGIN
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
