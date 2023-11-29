import * as PostUploadFailModalStyle from "../styles/componenet/PostUploadFailModalStyle";
const PostUploadFailModal = ({ failText, setIsPostUploadFailModal }) => {
  const onclickConfirmBtn = () => {
    setIsPostUploadFailModal((prev) => !prev);
    document.body.style.overflow = "";
  };
  return (
    <PostUploadFailModalStyle.PostUploadFailModalBack>
      <PostUploadFailModalStyle.PostUploadFailModalBox>
        <PostUploadFailModalStyle.PostUploadFailModalTextBox>
          <PostUploadFailModalStyle.PostUploadFailModalFailText>
            {failText}
          </PostUploadFailModalStyle.PostUploadFailModalFailText>
        </PostUploadFailModalStyle.PostUploadFailModalTextBox>
        <PostUploadFailModalStyle.PostUploadFailModalBtnBox>
          <PostUploadFailModalStyle.PostUploadFailModalConfirmBtn
            onClick={onclickConfirmBtn}
          >
            확인
          </PostUploadFailModalStyle.PostUploadFailModalConfirmBtn>
        </PostUploadFailModalStyle.PostUploadFailModalBtnBox>
      </PostUploadFailModalStyle.PostUploadFailModalBox>
    </PostUploadFailModalStyle.PostUploadFailModalBack>
  );
};

export default PostUploadFailModal;
