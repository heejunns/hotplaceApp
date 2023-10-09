import React, { useState } from "react";
import * as ProfileImgUploadModalStyle from "../styles/ProfileImgUploadStyle";
import { updateProfile } from "firebase/auth";
import { authService, storageService } from "../reactfbase";
import { useRecoilState } from "recoil";
import { userAtom } from "../recoils/UserAtom";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
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
      //   console.log("res", res);
      console.log("url", getUploadFileURL);
      const res = await updateProfile(authService.currentUser, {
        photoURL: getUploadFileURL,
      });
      const newUser = JSON.parse(JSON.stringify(authService.currentUser));
      setUser(newUser);
      setIsProfileImgUploadModal((prev) => !prev);
    } catch (e) {
      console.log(e);
    }
  };

  return (
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
                  <span class="material-symbols-outlined">close</span>
                </ProfileImgUploadModalStyle.UploadImgCancelBtn>
              </>
            ) : (
              <>
                <span class="material-symbols-outlined">person</span>
                <ProfileImgUploadModalStyle.SelectImgBtn htmlFor="imgUploadInput">
                  <span class="material-symbols-outlined">photo_camera</span>
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
            cancel
          </ProfileImgUploadModalStyle.CancelBtn>

          <ProfileImgUploadModalStyle.UploadImgBtn
            onClick={onclickProfileImgUpload}
          >
            upload
          </ProfileImgUploadModalStyle.UploadImgBtn>
        </ProfileImgUploadModalStyle.ProfileImgUploadModalBtnBox>
      </ProfileImgUploadModalStyle.ProfileImgUploadModalBox>
    </ProfileImgUploadModalStyle.ProfileImgUploadModalBack>
  );
};

export default ProfileImgUploadModal;
