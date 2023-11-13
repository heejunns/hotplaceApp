import React, { Suspense, useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "../pages/Home";
import LoginForm from "../pages/LoginForm";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
import Header from "../components/Header";
import PostUpload from "../pages/PostUpload";
import Detail from "../pages/Detail";
import Certification from "../pages/Certification";
import Page from "../pages/Page";
import { Loading } from "../styles/componenet/LoadingStyle";
// displayname 을 업데이트 한다고 해서 새로운 user 객체를 생성해서 displayname 을 변경하는것이 아닌 기존의 user 객체의 값을 변환한다. 그래서 닉네임을 변경해도 바로 네이게이션에 변경한 닉네임이 바로 업데이트 되지 않음.

const PageTopScroll = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// const Header = React.lazy(() => import("../components/Header"));

// const Home = React.lazy(() => import("../pages/Home"));
const AppRouter = ({ userLocation, firebaseInitialize }) => {
  console.log("응?", userLocation);
  return (
    <>
      <Router>
        <PageTopScroll />
        <Header userLocation={userLocation} />
        {/* <Suspense fallback={<Loading />}> */}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                userLocation={userLocation}
                firebaseInitialize={firebaseInitialize}
              />
            }
          />
          <Route path="/detail" element={<Detail />} />
          <Route path=":id" element={<Page useLocation={userLocation} />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/postupload"
            element={<PostUpload userLocation={userLocation} />}
          />
          <Route path="/certification" element={<Certification />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>{" "}
        {/* </Suspense> */}
      </Router>
    </>
  );
};

export default AppRouter;
