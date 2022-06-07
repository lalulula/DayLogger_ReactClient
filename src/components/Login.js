import { useRef, useState, useEffect } from "react";
import { getUserAPI, loginAPI } from "../api/userAPI";

const Login = ({ user, setUser, pwd, setPwd, setProfile, setIsAdmin }) => {
  const userRef = useRef();
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const openSignup = () => {
    document.getElementById("signup-background").style.display = "block";
  };

  const password = document.querySelector('#id_password_login');
  const togglePassword = document.querySelector('#togglePassword');
  const handleTogglePassword = () =>{
    if(password){
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    togglePassword.classList.toggle('fa-eye-slash');
  }
 }

  const login = async () => {
    const result = await loginAPI(user, pwd);
    console.log(user);
    if (result) {
      const user = await getUserAPI();

      if (user) {
        setProfile(user);
        console.log("login successful");
      } else {
        setErrMsg("Error: There is no such user");
      }
    } else {
      setErrMsg("Error: Invalid email and/or password");
    }
  };
  return (
    <div className="login" id="login">
      <div className="login-wrap">
        <div className="title">
          <div className="title-notes">Day Logger</div>
          <hr
            style={{
              width: "150px",
            }}
          ></hr>
          <div className="title-descrition">
            Welcome back! Login to access the day logger.
          </div>
        </div>
        <div className="white-box">
          <div className="inputs">
            <div className="login-email-wrap">
              <div
                className="login-email"
                style={{
                  paddingBottom: "2px",
                }}
              >
                Email
              </div>
              <input
                type="email"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                style={{
                  padding: "4px",
                  borderRadius: "5px",
                }}
              />
            </div>
            <div>
              <div
                className="login-password"
                style={{
                  paddingBottom: "2px",
                }}
              >
                Password
              </div>
              <input
                type="password"
                id="id_password_login"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                style={{
                  padding: "4px",
                  borderRadius: "5px",
                }}
              />
             <i className="far fa-eye" id="togglePassword"  onClick={handleTogglePassword}></i>
            </div>
          </div>
          <div
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </div>
          <div className="login-button-wrap">
            <button className="login-button" onClick={login}>
              Log in
            </button>
          </div>

          <div className="login-signup-button-wrap">
            <button className="login-signup-button" onClick={openSignup}>
              Create New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
