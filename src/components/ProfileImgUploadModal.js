import { useState } from "react";
import * as ProfileImgUploadModalStyle from "../styles/componenet/ProfileImgUploadStyle";
import { updateProfile } from "firebase/auth";
import { authService, dbService, storageService } from "../reactfbase";
import { useRecoilState } from "recoil";
import { userAtom } from "../recoils/UserAtom";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { PulseLoader } from "react-spinners";
import { Loading } from "../styles/componenet/LoadingStyle";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import axios from "axios";
import { useMutation } from "react-query";
const ProfileImgUploadModal = ({ setIsProfileImgUploadModal }) => {
  const [user, setUser] = useRecoilState(userAtom);
  const [profileImgUploadUrl, setProfileImgUploadUrl] = useState("");
  const onchangeImageUpload = async (e) => {
    try {
      const { files } = e.target;
      const uploadFile = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(uploadFile);
      reader.onloadend = () => {
        setProfileImgUploadUrl(reader.result);
      };

      //   setProfileImgUploadUrl(getUploadFileURL);
    } catch (e) {
      console.log(e);
    }
  };
  const onclickCancelUploadModal = () => {
    setIsProfileImgUploadModal((prev) => !prev);
  };

  const onclickUploadImgCancel = () => {
    setProfileImgUploadUrl("");
  };

  const onclickProfileImgUpload = async () => {
    try {
      const storageRef = ref(storageService, `${user.uid}/${uuidv4()}`); // 이미지 storage 에 저장
      await uploadString(storageRef, profileImgUploadUrl, "data_url");
      const getUploadFileURL = await getDownloadURL(storageRef); // 이미지 url 불러오기
      await updateProfile(authService.currentUser, {
        photoURL: getUploadFileURL,
      });
      // 게시글 데이터 중 현재 로그인 중인 유저와 같은 닉네임을 가진 데이터 모두 가지고 오기
      const q = query(
        collection(dbService, "test"),
        where("nickname", "==", user.displayName)
      );
      const querySnapshot = await getDocs(q);
      const sameNicknamePostData = [];
      querySnapshot.forEach((doc) => {
        sameNicknamePostData.push({ id: doc.id, ...doc.data() });
      });
      // 가지고 온 데이터에 현재 업로드한 프로필 이미지 업데이트
      const smaeDataFuncs = sameNicknamePostData.map((item) => {
        return updateDoc(doc(dbService, "test", item.id), {
          writerProfileImg: getUploadFileURL,
        });
      });
      await axios.all(smaeDataFuncs);

      const newUser = JSON.parse(JSON.stringify(authService.currentUser));
      setUser(newUser);
      setIsProfileImgUploadModal((prev) => !prev);
    } catch (e) {
      console.log(e);
    }
  };

  const { mutate: profileImgUpload, isLoading: profileImgUploadIsLoading } =
    useMutation(onclickProfileImgUpload);

  return (
    <>
      <ProfileImgUploadModalStyle.ProfileImgUploadModalBack>
        <ProfileImgUploadModalStyle.ProfileImgUploadModalBox>
          <ProfileImgUploadModalStyle.UploadImgBox>
            <ProfileImgUploadModalStyle.UploadImg>
              {profileImgUploadUrl ? (
                <>
                  <img src={profileImgUploadUrl} alt="uploadProfileImg" />
                  <ProfileImgUploadModalStyle.UploadImgCancelBtn
                    onClick={onclickUploadImgCancel}
                  >
                    <span className="material-symbols-outlined">close</span>
                  </ProfileImgUploadModalStyle.UploadImgCancelBtn>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">person</span>
                  <ProfileImgUploadModalStyle.SelectImgBtn htmlFor="imgUploadInput">
                    <span className="material-symbols-outlined">
                      photo_camera
                    </span>
                  </ProfileImgUploadModalStyle.SelectImgBtn>
                  <ProfileImgUploadModalStyle.ProfileImgUploadInput
                    type="file"
                    accept="image/*"
                    id="imgUploadInput"
                    onChange={onchangeImageUpload}
                  />
                </>
              )}
            </ProfileImgUploadModalStyle.UploadImg>
          </ProfileImgUploadModalStyle.UploadImgBox>
          <ProfileImgUploadModalStyle.ProfileImgUploadModalBtnBox>
            <ProfileImgUploadModalStyle.CancelBtn
              onClick={onclickCancelUploadModal}
            >
              <span className="material-symbols-outlined">close</span>
            </ProfileImgUploadModalStyle.CancelBtn>

            <ProfileImgUploadModalStyle.UploadImgBtn onClick={profileImgUpload}>
              변경
            </ProfileImgUploadModalStyle.UploadImgBtn>
          </ProfileImgUploadModalStyle.ProfileImgUploadModalBtnBox>
          {profileImgUploadIsLoading && (
            <Loading>
              <PulseLoader color="black" size={20} />
            </Loading>
          )}
        </ProfileImgUploadModalStyle.ProfileImgUploadModalBox>
      </ProfileImgUploadModalStyle.ProfileImgUploadModalBack>
    </>
  );
};

export default ProfileImgUploadModal;
