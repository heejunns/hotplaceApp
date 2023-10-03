import React from "react";
import { atom } from "recoil";

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
});
