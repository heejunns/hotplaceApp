import React from "react";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userAtom = atom({
  key: "userAtom",
  default: null,
});

export const hamburgerBtnClick = atom({
  key: "hamburgerButtonClick",
  default: null,
});

export const clickPostItemData = atom({
  key: "clickPostItemData",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
