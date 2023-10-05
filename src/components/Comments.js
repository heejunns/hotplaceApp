import React, { useCallback, useState } from "react";
import styled from "styled-components";
import CommentPost from "./CommentPost";
import { doc, updateDoc } from "firebase/firestore";
import { dbService } from "../reactfbase";
import { v4 as uuidv4 } from "uuid";
import { useRecoilValue } from "recoil";
import { userAtom } from "../recoils/UserAtom";

// 댓글 기능의 뒷배경 스타일 태그
const CommentBack = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.2), 0 3px 3px 0 rgba(0, 0, 0, 0.19);
  padding: 10px;
`;
const CommentTitle = styled.h3`
  font-size: 30px;
  margin-bottom: 20px;
`;
// 댓글을 입력하는 form 의 스타일 태그
const CommentForm = styled.form`
  display: flex;
  justify-content: center;
`;
// 댓글을 입력하는 input 의 스타일 태그
const CommentInput = styled.textarea`
  border: 3px solid mediumorchid;
  width: 100%;
  height: 100px;
  border-radius: 10px;
  font-size: 20px;
  resize: none;
  padding: 10px;
`;
// 댓글을 입력하고 댓글을 게시하는 버튼의 스타일 태그
const CommentSubmitButton = styled.button`
  border: 3px solid mediumorchid;
  margin-left: 1rem;
  border-radius: 10px;
  height: 100px;
  background: white;
  font-size: 20px;
  white-space: nowrap;
`;

// 아무 댓글이 없다면 보여질 스타일 태그
const NoComment = styled.div`
  margin: 1rem 0 0 1rem;
  font-size: 1rem;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  overflow: auto;
`;

const Comments = ({ data, dataId, setIsChangeData }) => {
  const user = useRecoilValue(userAtom);
  const [commentInput, setCommentInput] = useState(""); // 댓글 입력 state

  const onchangeCommentInput = (event) => {
    // input 태그에 댓글을 입력할면 onchange 이벤트 발생
    const {
      target: { value },
    } = event;
    setCommentInput(value);
  };

  // 댓글을 입력하고 댓글 게시 버튼을 클릭하면 호출
  const onclickCommentSubmit = async (e) => {
    e.preventDefault();
    console.log(typeof dataId, "뭐요");
    console.log("data id??????", dataId);
    if (commentInput.length === 0) {
      alert("댓글을 입력하세요!");
      return;
    }
    setCommentInput("");
    await updateDoc(doc(dbService, "test", dataId), {
      comments: [
        ...data.comments,
        {
          commentWriter: user.displayName, // 댓글 게시자
          commentValue: commentInput, // 댓글 글
          comment_id: uuidv4(), // 댓글 아이디 무작위로 숫자 생성해서 만들기
          commentCreateTime: Date.now(), // 댓글 게시 시간
          commentLikeMember: [], // 댓글 좋아요 누른 사람 명단 관리
        },
      ],
    });
    setIsChangeData((prev) => !prev);
  };

  return (
    <CommentBack>
      <CommentTitle>댓글</CommentTitle>
      <CommentForm onSubmit={onclickCommentSubmit}>
        <CommentInput
          type="text"
          placeholder="댓글을 입력하세요."
          value={commentInput}
          onChange={onchangeCommentInput}
        />
        <CommentSubmitButton>댓글 게시</CommentSubmitButton>
      </CommentForm>
      <CommentBox>
        {data.comments.length === 0 ? (
          <NoComment>댓글없음...</NoComment>
        ) : (
          data.comments.map((commentInfo) => {
            return (
              <CommentPost
                commentInfo={commentInfo}
                data={data}
                dataId={dataId}
                setIsChangeData={setIsChangeData}
              />
            );
          })
        )}
      </CommentBox>
    </CommentBack>
  );
};

export default Comments;
