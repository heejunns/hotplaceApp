import { collection, limit, orderBy, query } from "firebase/firestore";
import React from "react";
import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { dbService } from "../reactfbase";

const { persistAtom } = recoilPersist();

export const userAtom = atom({
  key: "userAtom",
  default: null,
});

export const clickPostItemData = atom({
  key: "clickPostItemData",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const currentSortMethod = atom({
  key: "currentSortMethod",
  default: null,
});
