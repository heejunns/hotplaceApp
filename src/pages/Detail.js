import React from "react";
import * as DetailStyle from "../styles/DetailStyle";
const Detail = () => {
  return (
    <DetailStyle.DetailBack>
      <DetailStyle.DetailBox>
        <DetailStyle.DetailTitleBox>
          <DetailStyle.DetailTitleText></DetailStyle.DetailTitleText>
          <DetailStyle.DetailTitleText></DetailStyle.DetailTitleText>
          <DetailStyle.DetailTitleText></DetailStyle.DetailTitleText>
        </DetailStyle.DetailTitleBox>
        <DetailStyle.DetailImgBox>
          <img />
        </DetailStyle.DetailImgBox>
        <DetailStyle.DetailMap></DetailStyle.DetailMap>
      </DetailStyle.DetailBox>
    </DetailStyle.DetailBack>
  );
};

export default Detail;
