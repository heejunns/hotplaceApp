import styled from "styled-components";

export const PreviewBack = styled.div`
  width: 100%;
  padding: 100px 20px 0 20px;
`;

export const PreviewBox = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
`;

export const PreviewListItem = styled.div`
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 10px 0;
  border-radius: 5px;
  margin-bottom: 20px;
  border: 1px solid black;
  width: 100%;
`;

export const PreviewListItemTitle = styled.h1`
  font-size: 20px;
  margin-bottom: 10px;
`;

export const PreviewListItemBody = styled.div`
  min-height: 50px;
`;

export const PreviewImageBox = styled.div`
  height: 120px;
  display: flex;
`;

export const PreviewImageItem = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 10px;
  object-fit: cover;
`;

export const PreviewSubmitBtnBox = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
`;
export const PreviewSubmitBtn = styled.button`
  border-radius: 5px;
  border: none;
  width: 100%;
  height: 50px;
  background-color: black;
  color: white;
  font-size: 20px;
`;
