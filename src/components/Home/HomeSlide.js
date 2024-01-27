import * as HomeSlideStyle from "../../styles/componenet/Home/HomeSlideStyle";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { dbService } from "../../reactfbase";
import { memo, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

const HomeSlide = () => {
  const [currentNum, setCurrentNum] = useState(1);
  const [width, setWidth] = useState(window.innerWidth);

  const homeSlideBoxRef = useRef();

  const getHomeSlideData = async () => {
    try {
      const q = query(
        collection(dbService, "test"),
        limit(3),
        orderBy("likeNumber", "desc")
      );
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return data;
    } catch (e) {}
  };
  const { data: homeSlideData } = useQuery(["homeSlideData"], getHomeSlideData);

  let imgArr = homeSlideData && [
    homeSlideData[homeSlideData.length - 1],
    ...homeSlideData,
    homeSlideData[0],
  ];
  useEffect(() => {
    let timeKey;
    if (currentNum === 5) {
      if (homeSlideBoxRef.current) {
        homeSlideBoxRef.current.style.transition = "";
      }
      setCurrentNum(1);
    }
    if (currentNum === 1) {
      timeKey = setTimeout(() => {
        homeSlideBoxRef.current.style.transition = "all 2s ease-in-out";
      }, 1000);
    }

    return () => clearTimeout(timeKey);
  }, [currentNum]);
  useEffect(() => {
    homeSlideBoxRef.current.style.transition = "all 2s ease-in-out";
    const key = setInterval(() => {
      setCurrentNum((prev) => prev + 1);
    }, 7000);
    return () => clearInterval(key);
  }, []);
  const changeWidth = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", changeWidth);

    return () => window.removeEventListener("resize", changeWidth);
  }, []);

  return (
    <HomeSlideStyle.HomeSlideBack>
      <HomeSlideStyle.HomeSlideBox
        ref={homeSlideBoxRef}
        currentNum={currentNum}
        width={width}
      >
        {imgArr &&
          imgArr.map((item, index) => (
            <HomeSlideStyle.HomeSlideItem key={index}>
              <img src={item.uploadImgUrl} alt="homeslide" />
              <HomeSlideStyle.HomeSlideText>
                모두에게 자신의 핫플레이스가 있습니다.
              </HomeSlideStyle.HomeSlideText>
              <HomeSlideStyle.HomeSlideText>
                우리가 만들어가는 핫플레이스 우리동네핫플
              </HomeSlideStyle.HomeSlideText>
            </HomeSlideStyle.HomeSlideItem>
          ))}
      </HomeSlideStyle.HomeSlideBox>
    </HomeSlideStyle.HomeSlideBack>
  );
};

export default memo(HomeSlide);
