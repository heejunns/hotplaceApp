import { useRecoilValue } from "recoil";
import * as S from "../styles/pages/Preview.style";
import { PreviewData } from "../recoils/UserAtom";

const Preview = () => {
  const data = useRecoilValue(PreviewData);
  console.log("data", data);
  return (
    <S.PreviewBack>
      <S.PreviewBox>
        <S.PreviewListItem>
          <S.PreviewListItemTitle>회사 이름</S.PreviewListItemTitle>
          <S.PreviewListItemBody>{data.companyName}</S.PreviewListItemBody>
        </S.PreviewListItem>
        <S.PreviewListItem>
          <S.PreviewListItemTitle>대표 이름</S.PreviewListItemTitle>
          <S.PreviewListItemBody>{data.name}</S.PreviewListItemBody>
        </S.PreviewListItem>
        <S.PreviewListItem>
          <S.PreviewListItemTitle>회사 이메일</S.PreviewListItemTitle>
          <S.PreviewListItemBody>{data.email}</S.PreviewListItemBody>
        </S.PreviewListItem>
        <S.PreviewListItem>
          <S.PreviewListItemTitle>대표 휴대폰번호</S.PreviewListItemTitle>
          <S.PreviewListItemBody>{data.phoneNumber}</S.PreviewListItemBody>
        </S.PreviewListItem>
        <S.PreviewListItem>
          <S.PreviewListItemTitle>회사 설명</S.PreviewListItemTitle>
          <S.PreviewListItemBody>{data.introduce}</S.PreviewListItemBody>
        </S.PreviewListItem>
        <S.PreviewListItem>
          <S.PreviewListItemTitle>회사 사진</S.PreviewListItemTitle>
          <S.PreviewImageBox>
            {data.companyImage.map((item) => {
              return <S.PreviewImageItem src={item} />;
            })}
          </S.PreviewImageBox>
        </S.PreviewListItem>
        <S.PreviewSubmitBtnBox>
          <S.PreviewSubmitBtn>등록</S.PreviewSubmitBtn>
        </S.PreviewSubmitBtnBox>
      </S.PreviewBox>
    </S.PreviewBack>
  );
};

export default Preview;
