import { useRecoilState, useRecoilValue } from "recoil";
import {
  LoginModalDataAtom,
  clickPostItemData,
  userAtom,
} from "../../recoils/UserAtom";
import { useNavigate } from "react-router-dom";
import * as S from "../../styles/components/Home/PostItem.style";
import {
  Ranking,
  TopPostItemContainer,
} from "../../styles/components/Home/TopPostItem.style";
const TopPostItem = ({ data, ranking }) => {
  const [loginModal, setLoginModal] = useRecoilState(LoginModalDataAtom);
  const user = useRecoilValue(userAtom);
  const [clickPostItem, setClickPostItem] = useRecoilState(clickPostItemData);
  const navigator = useNavigate();
  // 게시글을 클릭하면 해당 게시글의 디테일 페이지로 이동
  const onClickTopPostItem = (data) => {
    if (user === null) {
      setLoginModal((prev) => !prev);
      document.body.style.overflow = "hidden";
      return;
    }
    setClickPostItem(data);
    navigator("/detail");
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
