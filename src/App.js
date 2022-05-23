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
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLogDay, setIsLogDay] = useState(true);
  const [isEditQuestions, setEditQuestions] = useState(false);
  const [isViewData, setViewData] = useState(false);
  const [isProfilePage, setIsProfilePage] = useState(false);

  const [questions, setQuestions] = useState([]);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const [profile, setProfile] = useState(undefined);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserAPI();
      setProfile(userData);
      setIsUserDataLoading(false);
    };
    fetchUserData();
  }, []);

  //NOTE: for current clicked link CSS
  const [active, setActiveLink] = useState([true, false, false, false]);

  //NOTE: for conditional rendering
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
      {/* {profile ? ( */}
      {isUserDataLoading ? (
        <h1>Loading...</h1>
      ) : !profile ? (
        <>
          <Login
            user={user}
            setUser={setUser}
            pwd={pwd}
            setPwd={setPwd}
            setProfile={setProfile}
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
          {isLogDay && (
            <LogDay
              handleSubmit={handleSubmit}
              questions={questions}
              setQuestions={setQuestions}
            />
          )}
          {isEditQuestions && (
            <EditQuestions
              handleSubmit={handleSubmit}
              questions={questions}
              setQuestions={setQuestions}
            />
          )}
          {isViewData && <ViewData />}
          {isProfilePage && <ProfilePage setProfile={setProfile} />}
        </>
      )}
    </React.Fragment>
  );
}

export default App;
