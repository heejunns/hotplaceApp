import { useState } from "react";
import * as ReportModalStyle from "../styles/componenet/ReportModalStyle";
import { dbService } from "../reactfbase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { userAtom } from "../recoils/UserAtom";
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
  const onclickCloseBtn = () => {
    document.body.style.overflow = "";
    setIsReportModal((prev) => !prev);
  };
  return (
    <ReportModalStyle.ReportModalBack>
      <ReportModalStyle.ReportModalBox>
        <ReportModalStyle.ReportModalTitle>
          신고 글 작성
        </ReportModalStyle.ReportModalTitle>
        <ReportModalStyle.ReportModalInputTextBox>
          <ReportModalStyle.ReportModalInput
            type="text"
            onChange={onchangeReportText}
            value={inputReportText}
            placeholder="신고내용을 입력 해주세요."
          />
        </ReportModalStyle.ReportModalInputTextBox>
        <ReportModalStyle.ReportModalBtnBox>
          <ReportModalStyle.ReportModalCancelBtn onClick={onclickCloseBtn}>
            <span className="material-symbols-outlined">close</span>
          </ReportModalStyle.ReportModalCancelBtn>
          <ReportModalStyle.ReportModalReportBtn onClick={onclickReportBtn}>
            게시물 신고
          </ReportModalStyle.ReportModalReportBtn>
        </ReportModalStyle.ReportModalBtnBox>
      </ReportModalStyle.ReportModalBox>
    </ReportModalStyle.ReportModalBack>
  );
};

export default ReportModal;
