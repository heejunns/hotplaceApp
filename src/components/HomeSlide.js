import * as HomeSlideStyle from "../styles/componenet/HomeSlideStyle";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { dbService } from "../reactfbase";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

const HomeSlide = () => {
  const [currentNum, setCurrentNum] = useState(1);

  const homeSlideBoxRef = useRef();

  const getHomeSlideData = async () => {
    try {
      const q = query(
        collection(dbService, "test"),
        orderBy("likeNumber", "desc")
      );
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      return data.slice(0, 3);
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
    }, 5000);
    return () => clearInterval(key);
  }, []);

  console.log("current", currentNum);
  return (
    <HomeSlideStyle.HomeSlideBack>
      <HomeSlideStyle.HomeSlideBox
        ref={homeSlideBoxRef}
        currentNum={currentNum}
      >
        {imgArr &&
          imgArr.map((item) => (
            <HomeSlideStyle.HomeSlideItem>
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

export default HomeSlide;
