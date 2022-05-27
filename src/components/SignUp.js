import { useRef, useState, useEffect } from "react";
import { registerAPI } from "../api/userAPI";
import CloseIcon from "@mui/icons-material/Close";

const SignUp = () => {
  const errRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [name, email, pwd]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const validatePassword = (password) => {
    return String(password).match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
    );
  };

  const closeSignupModal = () => {
    document.getElementById("signup-background").style.display = "none";
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log(name, email, pwd);
    if (validateEmail(email)) {
      if (validatePassword(pwd)) {
        registerAPI(name, email, pwd).then((result) => {
          alert("sucessully registered");
          window.location.reload();
        });
      } else {
        setErrMsg(
          "Password should include: at least 8 characters, 1 number, 1 lower and 1 uppercase letter"
        );
      }
    } else {
      setErrMsg("Email is invalid");
    }
  };
  return (
    <div className="signup-background" id="signup-background">
      <div className="signup">
        <div className="signup-white-box">
          <div className="signup-title">
            <div style={{ paddingTop: "25px", fontSize: "25px" }}>Sign up</div>
            <CloseIcon onClick={closeSignupModal} sx={{ cursor: "pointer" }} />
          </div>
          <hr
            style={{
              width: "80px",
            }}
          ></hr>
          <div className="signup-inputs">
            <div className="signup-input-wrap">
              <div style={{ paddingBottom: "3px" }}>Name</div>
              <input
                className="signup-name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                style={{
                  padding: "5px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                }}
              />
            </div>
            <div className="signup-input-wrap">
              <div style={{ paddingBottom: "3px" }}>Email</div>
              <input
                className="signup-email"
                type="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                style={{
                  padding: "5px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                }}
              />
            </div>
            <div className="signup-input-wrap">
              <div style={{ paddingBottom: "3px" }}>Password</div>
              <input
                className="signup-password"
                type="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                style={{
                  padding: "5px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                }}
              />
            </div>
          </div>
          <div
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </div>
          <div className="login-signup-button-wrap">
            <button className="login-signup-button2" onClick={handleFormSubmit}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
