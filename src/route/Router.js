import React, { Suspense, lazy, useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "../components/Header/Header";
// displayname 을 업데이트 한다고 해서 새로운 user 객체를 생성해서 displayname 을 변경하는것이 아닌 기존의 user 객체의 값을 변환한다. 그래서 닉네임을 변경해도 바로 네이게이션에 변경한 닉네임이 바로 업데이트 되지 않음.

const Home = lazy(() => import("../pages/Home"));
const Profile = lazy(() => import("../pages/Profile"));
const Signup = lazy(() => import("../pages/Signup"));
const PostUpload = lazy(() => import("../pages/PostUpload"));
const Detail = lazy(() => import("../pages/Detail"));
const Page = lazy(() => import("../pages/Page"));

const PageTopScroll = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };
  }, []);
};

const AppRouter = () => {
  return (
    <>
      <Router>
        <PageTopScroll />
        <Header />
        <Suspense
          fallback={
            // <Loading>
            //   <PulseLoader color="black" size={20} />
            // </Loading>
            <div></div>
          }
        >
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/detail" Component={Detail} />
            <Route path=":id" Component={Page} />
            <Route path="/profile" Component={Profile} />
            <Route path="/postupload" Component={PostUpload} />
            <Route path="/signup" Component={Signup} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
};

export default AppRouter;
