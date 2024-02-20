import { useState } from "react";
import * as S from "../styles/components/ReportModal.style";
import { dbService } from "../reactfbase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { userAtom } from "../recoils/UserAtom";
import { Loading } from "../styles/components/Loading.style";
import { PulseLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";
const ReportModal = ({ setIsReportModal, postWriter, postName }) => {
  const user = useRecoilValue(userAtom);
  const [inputReportText, setInputReportText] = useState("");

  const onchangeReportText = ({ target: { value } }) => {
    setInputReportText(value);
  };

  const onclickReportBtn = async () => {
    try {
      const reportdbRef = doc(dbService, "reportdata", "reportdb");
      const docSnap = await getDoc(reportdbRef);
      const newReportData = [
        ...docSnap.data().data,
        {
          reportPersonName: user.displayName,
          postWriter,
          postName,
          reportText: inputReportText,
        },
      ];
      await setDoc(reportdbRef, {
        data: newReportData,
      });
      setIsReportModal((prev) => !prev);
    } catch (e) {
      console.log(e);
    }
  };

  const { mutate: reportBtnClick, isLoading: reportIsLoading } = useMutation({
    onclickReportBtn,
  });
  const onclickCloseBtn = () => {
    document.body.style.overflow = "";
    setIsReportModal((prev) => !prev);
  };
  return (
    <>
      <S.ReportModalBack>
        <S.ReportModalBox>
          <S.ReportModalTitle>신고 글 작성</S.ReportModalTitle>
          <S.ReportModalInputTextBox>
            <S.ReportModalInput
              type="text"
              onChange={onchangeReportText}
              value={inputReportText}
              placeholder="신고내용을 입력 해주세요."
            />
          </S.ReportModalInputTextBox>
          <S.ReportModalBtnBox>
            <S.ReportModalCancelBtn onClick={onclickCloseBtn}>
              <span className="material-symbols-outlined">close</span>
            </S.ReportModalCancelBtn>
            <S.ReportModalReportBtn onClick={reportBtnClick}>
              게시물 신고
            </S.ReportModalReportBtn>
          </S.ReportModalBtnBox>
        </S.ReportModalBox>
      </S.ReportModalBack>
      {reportIsLoading && (
        <Loading>
          <PulseLoader color="black" size={20} />
        </Loading>
      )}
    </>
  );
};

export default ReportModal;
