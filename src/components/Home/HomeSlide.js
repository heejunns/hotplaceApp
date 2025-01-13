import * as S from "../../styles/components/Home/HomeSlide.style";
import { memo } from "react";
import homeBack from "../../img/homeBack.png";

const HomeSlide = () => {
  return (
    <S.HomeSlideBack homeBack={homeBack}>
      <S.TextBox>
        <S.Text>모두에게 자신의 핫플레이스가 있습니다.</S.Text>
        <S.Text>우리가 만들어가는 핫플레이스 우리동네핫플</S.Text>
      </S.TextBox>
    </S.HomeSlideBack>
  );
};

export default memo(HomeSlide);
