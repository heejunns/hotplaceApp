import { useRecoilValue } from "recoil";
import * as PreviewStyle from "../styles/pages/PreviewStyle";
import { PreviewData } from "../recoils/UserAtom";

const Preview = () => {
  const data = useRecoilValue(PreviewData);
  console.log("data", data);
  return (
    <PreviewStyle.PreviewBack>
      <PreviewStyle.PreviewBox>
        <PreviewStyle.PreviewListItem>
          <PreviewStyle.PreviewListItemTitle>
            회사 이름
          </PreviewStyle.PreviewListItemTitle>
          <PreviewStyle.PreviewListItemBody>
            {data.companyName}
          </PreviewStyle.PreviewListItemBody>
        </PreviewStyle.PreviewListItem>
        <PreviewStyle.PreviewListItem>
          <PreviewStyle.PreviewListItemTitle>
            대표 이름
          </PreviewStyle.PreviewListItemTitle>
          <PreviewStyle.PreviewListItemBody>
            {data.name}
          </PreviewStyle.PreviewListItemBody>
        </PreviewStyle.PreviewListItem>
        <PreviewStyle.PreviewListItem>
          <PreviewStyle.PreviewListItemTitle>
            회사 이메일
          </PreviewStyle.PreviewListItemTitle>
          <PreviewStyle.PreviewListItemBody>
            {data.email}
          </PreviewStyle.PreviewListItemBody>
        </PreviewStyle.PreviewListItem>
        <PreviewStyle.PreviewListItem>
          <PreviewStyle.PreviewListItemTitle>
            대표 휴대폰번호
          </PreviewStyle.PreviewListItemTitle>
          <PreviewStyle.PreviewListItemBody>
            {data.phoneNumber}
          </PreviewStyle.PreviewListItemBody>
        </PreviewStyle.PreviewListItem>
        <PreviewStyle.PreviewListItem>
          <PreviewStyle.PreviewListItemTitle>
            회사 설명
          </PreviewStyle.PreviewListItemTitle>
          <PreviewStyle.PreviewListItemBody>
            {data.introduce}
          </PreviewStyle.PreviewListItemBody>
        </PreviewStyle.PreviewListItem>
        <PreviewStyle.PreviewListItem>
          <PreviewStyle.PreviewListItemTitle>
            회사 사진
          </PreviewStyle.PreviewListItemTitle>
          <PreviewStyle.PreviewImageBox>
            {data.companyImage.map((item) => {
              return <PreviewStyle.PreviewImageItem src={item} />;
            })}
          </PreviewStyle.PreviewImageBox>
        </PreviewStyle.PreviewListItem>
        <PreviewStyle.PreviewSubmitBtnBox>
          <PreviewStyle.PreviewSubmitBtn>등록</PreviewStyle.PreviewSubmitBtn>
        </PreviewStyle.PreviewSubmitBtnBox>
      </PreviewStyle.PreviewBox>
    </PreviewStyle.PreviewBack>
  );
};

export default Preview;
