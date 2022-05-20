import "./App.css";
import React, { useEffect, useState } from "react";
import LogDay from "./components/LogDay";
import EditQuestions from "./components/EditQuestions";
import ViewData from "./components/ViewData";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProfilePage from "./components/ProfilePage";
import defaultpImg from "./defaultpImg.jpg";
import { getUserAPI } from "./api/userAPI";

function App() {
  //NOTE:얘네는 그 위에 헤더 눌리면 보이게 하려고 state하나씩 만들어 준거긴한데
  //이거 너무 지저분해서 신경쓰임 ㅜㅜ 혹시라도 이거보다 ㄱㅊ은거 있으면 바꿔도돼ㅇㅇㅇ!!
  //아직 로그인은 기능안했으니까 그냥 일단 isLoggedIn은 true로 하고
  // isLogDay도 잠깐 true 로 설정해두꼐! (원래는 둘다 false)
  //random

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isLogDay, setIsLogDay] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLogDay, setIsLogDay] = useState(true);
  const [isEditQuestions, setEditQuestions] = useState(false);
  const [isViewData, setViewData] = useState(false);
  const [isProfilePage, setIsProfilePage] = useState(false);

  const [questions, setQuestions] = useState([]);

  const [userdata, setUserdata] = useState();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const [profile, setProfile] = useState();

  useEffect(() => {
    const fetchedUserData = getUserAPI();
    console.log(fetchedUserData);
  }, []);

  //NOTE: 얘는 link 타고 들어갈떄 current link css있길래 그거 해주려고 만든거!
  const [active, setActiveLink] = useState([true, false, false, false]);

  //NOTE: conditional rendering 해주려고 만들어둔고!
  const handleLogDayClick = () => {
    setActiveLink([true, false, false, false]);
    setIsLogDay(true);
    setEditQuestions(false);
    setViewData(false);
    setIsProfilePage(false);
  };
  const handleEditQuestionsClick = () => {
    setActiveLink([false, true, false, false]);
    setIsLogDay(false);
    setEditQuestions(true);
    setViewData(false);
    setIsProfilePage(false);
  };
  const handleViewDataClick = () => {
    setActiveLink([false, false, true, false]);
    setIsLogDay(false);
    setEditQuestions(false);
    setViewData(true);
    setIsProfilePage(false);
  };
  const handleProfilePageClick = () => {
    setActiveLink([false, false, false, true]);
    setIsLogDay(false);
    setEditQuestions(false);
    setViewData(false);
    setIsProfilePage(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <div className="head">
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </div>

      {/* NOTE push하기전에 !profile로 바꿔주셈! */}
      {profile ? (
      // {!profile ? (
        <>
          <Login
            user={user}
            setUser={setUser}
            pwd={pwd}
            setPwd={setPwd}
            setUserdata={setUserdata}
          />
          <SignUp />
        </>
      ) : (
        <>
          <div className="pageHeader">
            <h2 className="day-logger"> Day Logger </h2>
            <div className="pageMenu">
              <span
                className={active[0] ? "currentLink" : ""}
                onClick={handleLogDayClick}
              >
                Log Day
              </span>
              <span
                className={active[1] ? "currentLink" : ""}
                onClick={handleEditQuestionsClick}
              >
                Edit Questions
              </span>
              <span
                className={active[2] ? "currentLink" : ""}
                onClick={handleViewDataClick}
              >
                View Data{" "}
              </span>
            </div>
            <img
              className={`profileImage header-profileImage ${
                active[3] ? "currentLink" : ""
              }`}
              src={defaultpImg}
              onClick={handleProfilePageClick}
            />
          </div>
          {isLogDay && <LogDay handleSubmit={handleSubmit} />}
          {isEditQuestions && (
            <EditQuestions
              handleSubmit={handleSubmit}
              questions={questions}
              setQuestions={setQuestions}
            />
          )}
          {isViewData && <ViewData />}
          {isProfilePage && <ProfilePage />}
        </>
      )}
    </React.Fragment>
  );
}

export default App;
