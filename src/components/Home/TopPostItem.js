import { useRecoilState, useRecoilValue } from "recoil";
import { clickPostItemData, userAtom } from "../../recoils/UserAtom";
import { useNavigate } from "react-router-dom";
import * as S from "../../styles/components/Home/PostItem.style";
import {
  Ranking,
  TopPostItemContainer,
} from "../../styles/components/Home/TopPostItem.style";
const TopPostItem = ({ data, ranking }) => {
  const user = useRecoilValue(userAtom);
  const [clickPostItem, setClickPostItem] = useRecoilState(clickPostItemData);
  const navigator = useNavigate();
  // 게시글을 클릭하면 해당 게시글의 디테일 페이지로 이동
  const onClickTopPostItem = (data) => {
    if (user === null) {
      navigator("/login");
      return;
    }
    setClickPostItem(data);
    navigator("/detail");
  };
  const calculateTime = (data) => {
    // 게시글을 올린지 얼마나 지났는지 시간을 계산하는 함수
    const minute = (Date.now() - data.createTime) / 1000 / 60;
    if (Math.round(minute) < 60) {
      return Math.round(minute) === 0 ? "지금" : `${Math.round(minute)} 분 전`;
    } else if (Math.round(minute) > 59 && Math.round(minute / 60) < 24) {
      return `${Math.round(minute / 60)} 시간 전`;
    } else if (
      Math.round(minute / 60) > 23 &&
      Math.round(minute / 60 / 24) < 31
    ) {
      return `${Math.round(minute / 60 / 24)} 일 전`;
    } else if (Math.round(minute / 60 / 24) > 30) {
      return "한달 전";
    }
  };
  return (
    <>
      <TopPostItemContainer
        image={data.getUploadFileURL}
        onClick={() => onClickTopPostItem(data)}
      >
        <Ranking>{ranking}위</Ranking>
        {data.uploadImgUrl && (
          <S.PostItemImg>
            <img src={data.uploadImgUrl} alt="사진 업로드" />
          </S.PostItemImg>
        )}
        {/* <S.PostItemName>{data.postName}</S.PostItemName> */}
        {/* <S.PostItemInfoBox>
          <S.PostItemLike>
            <span className="material-symbols-outlined">favorite</span>
            <span>{data.likeMember.length}</span>
          </S.PostItemLike>
          <div>
            <S.PostItemTime>{calculateTime(data)}</S.PostItemTime>
          </div>
        </S.PostItemInfoBox> */}
      </TopPostItemContainer>
    </>
  );
};

export default TopPostItem;
