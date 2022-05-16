import "./App.css";
import React, { useState } from "react";
import LogDay from "./components/logDay";
import EditQuestions from "./components/editQuestions";
import ViewData from "./components/viewData";
import Login from "./components/login";
import ProfilePage from "./components/profilePage";
import defaultpImg from "./defaultpImg.jpg";

//NOTE:너무 처음부터 내스타일 대로 해서 커멘트 남기는거니까 일단 함 보고 지워바바바바바밥!!!!!!!!

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

  //NOTE: 얘는 link 타고 들어갈떄 current link css있길래 그거 해주려고 만든거!
  const [active, setActiveLink] = useState([true, false, false]);

  //NOTE: conditional rendering 해주려고 만들어둔고!
  const handleLogDayClick = () => {
    setActiveLink([true, false, false]);
    setIsLogDay(true);
    setEditQuestions(false);
    setViewData(false);
    setIsProfilePage(false);
  };
  const handleEditQuestionsClick = () => {
    setActiveLink([false, true, false]);
    setIsLogDay(false);
    setEditQuestions(true);
    setViewData(false);
    setIsProfilePage(false);
  };
  const handleViewDataClick = () => {
    setActiveLink([false, false, true]);
    setIsLogDay(false);
    setEditQuestions(false);
    setViewData(true);
    setIsProfilePage(false);
  };
  const handleProfilePageClick = () => {
    setIsLogDay(false);
    setEditQuestions(false);
    setViewData(false);
    setIsProfilePage(true);
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
      {/* NOTE: 여기가 모든페이지 위에 뜨는 헤더부분 
                아 그리고 내 로그인 페이지 너무 복잡하긴해서 
                너가 하던걸로 바꾸고 싶으면 바꿔도댐 ㅜ,ㅜ */}
      {!isLoggedIn && <Login setIsLoggedIn={setIsLoggedIn} />}
      {isLoggedIn && (
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
            className="profileImage header-profileImage"
            src={defaultpImg}
            onClick={handleProfilePageClick}
          />
        </div>
      )}

      {/*NOTE: conditional rendering 부분!온클릭하면 state바꿔주고 그 컴포넌트로 이동하게 만들어놓은교!  */}
      {/* NOTE: 이제 밑에 있는 컴포넌트들 안에 form형식인 애들은 
      크게 container로 한번 감싸주고 그안에 form content로 감싸주는 식으로 디자인했댱!
      그리고 div를 좀 많이 쓰긴했는데 내가 생각했을땐 그게 최선이라 일단 그런식으로 해두긴 했우 ㅜ,ㅜ
      div className 은 그냥 이름 복잡하게 주는거보다 그냥 div1,div2..약간 이런식으로 했고
      힝구힝구 일단 한번봐봐!!!!!!!!!!!!!!!!!
       */}
      {isLogDay && <LogDay />}
      {isEditQuestions && <EditQuestions />}
      {isViewData && <ViewData />}
      {isProfilePage && <ProfilePage />}
    </React.Fragment>
  );
}

export default App;
