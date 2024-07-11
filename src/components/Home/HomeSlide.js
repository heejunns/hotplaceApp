import * as S from "../../styles/components/Home/HomeSlide.style";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { dbService } from "../../reactfbase";
import { memo, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import homeBack from "../../img/homeBack.png";

const HomeSlide = () => {
  const [currentNum, setCurrentNum] = useState(1);
  const [width, setWidth] = useState(window.innerWidth);
  const changeWidth = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", changeWidth);

    return () => window.removeEventListener("resize", changeWidth);
  }, []);

  return (
    <S.HomeSlideBack>
      <S.HomeSlideBox width={width}>
        <S.Img>
          <img src={homeBack} alt="homeBackImg" />
          <S.ImgText>모두에게 자신의 핫플레이스가 있습니다.</S.ImgText>
          <S.ImgText>우리가 만들어가는 핫플레이스 우리동네핫플</S.ImgText>
        </S.Img>
      </S.HomeSlideBox>
    </S.HomeSlideBack>
  );
};

export default memo(HomeSlide);
