import React, { useCallback, useState } from "react";
import CommentPost from "./CommentPost";
import { doc, updateDoc } from "firebase/firestore";
import { dbService } from "../reactfbase";
import { v4 as uuidv4 } from "uuid";
import { useRecoilValue } from "recoil";
import { userAtom } from "../recoils/UserAtom";
import * as CommentStyle from "../styles/componenet/CommentStyle";

const Comment = ({ data, dataId, setIsChangeData }) => {
  const user = useRecoilValue(userAtom);
  const [commentInput, setCommentInput] = useState(""); // 댓글 입력 state

  const onchangeCommentInput = ({ target: { value } }) => {
    // input 태그에 댓글을 입력할면 onchange 이벤트 발생
    if (value.length < 101) setCommentInput(value);
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
        {
          commentWriter: user.displayName, // 댓글 게시자
          commentValue: commentInput, // 댓글 글
          comment_id: uuidv4(), // 댓글 아이디 무작위로 숫자 생성해서 만들기
          commentCreateTime: Date.now(), // 댓글 게시 시간
          commentLikeMember: [], // 댓글 좋아요 누른 사람 명단 관리
        },
        ...data.comments,
      ],
    });
    setIsChangeData((prev) => !prev);
  };

  return (
    <CommentStyle.CommentBack>
      <CommentStyle.CommentTitleBox>
        <CommentStyle.CommentTitle>댓글</CommentStyle.CommentTitle>
        <CommentStyle.CommentInputLimit>
          <CommentStyle.CommentInputLen>
            {commentInput.length}
          </CommentStyle.CommentInputLen>
          / 100
        </CommentStyle.CommentInputLimit>
      </CommentStyle.CommentTitleBox>
      <CommentStyle.CommentForm onSubmit={onclickCommentSubmit}>
        <CommentStyle.CommentInput
          type="text"
          placeholder="댓글을 입력하세요."
          value={commentInput}
          onChange={onchangeCommentInput}
        />
        <CommentStyle.CommentSubmitButton>
          댓글 게시
        </CommentStyle.CommentSubmitButton>
      </CommentStyle.CommentForm>
      <CommentStyle.CommentBox>
        {data.comments.length === 0 ? (
          <CommentStyle.NoComment>댓글없음</CommentStyle.NoComment>
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
      </CommentStyle.CommentBox>
    </CommentStyle.CommentBack>
  );
};

export default Comment;
