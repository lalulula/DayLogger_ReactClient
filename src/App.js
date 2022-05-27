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
  // NOTE page header
  const [isLogDay, setIsLogDay] = useState(true);
  const [isEditQuestions, setEditQuestions] = useState(false);
  const [isViewData, setViewData] = useState(false);
  const [isProfilePage, setIsProfilePage] = useState(false);
  
  // NOTE question setters
  const [questions, setQuestions] = useState([]);

  // NOTE states for user + profile
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [profile, setProfile] = useState(undefined);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserAPI();
        setProfile(userData);
        setIsUserDataLoading(false);
      } catch (e) {
        console.log(e);
      }
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
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      </link>
      </div>

      {isUserDataLoading ? (
        <>
          <div
            style={{
              display: "flex",
              height: "80vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <h1>Loading...</h1> */}

            <div className="dot-pulse">
              <div className="dot-pulse__dot"></div>
            </div>
          </div>
        </>
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
            <h2
              className="day-logger"
              style={{ cursor: "pointer" }}
              onClick={handleLogDayClick}
            >
              Day Logger
            </h2>
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
              src={profile?.profileImage || defaultpImg}
              onClick={handleProfilePageClick}
            />
          </div>
          {isLogDay && (
            <LogDay
              handleSubmit={handleSubmit}
              user={user}
              questions={questions}
              setQuestions={setQuestions}
            />
          )} 
          {isEditQuestions && (
            <EditQuestions
              user={user}
              handleSubmit={handleSubmit}
              questions={questions}
              setQuestions={setQuestions}
            />
          )}
          {isViewData && <ViewData />}
          {isProfilePage && (
            <ProfilePage 
            setProfile={setProfile} 
            profile={profile} 
            setActiveLink={setActiveLink}
            setIsLogDay={setIsLogDay}
            setEditQuestions={setEditQuestions}
            setViewData={setViewData}
            setIsProfilePage={setIsProfilePage}/>
          )}
        </>
      )}
    </React.Fragment>
  );
}

export default App;
