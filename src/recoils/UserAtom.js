import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({ storage: sessionStorage });

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

export const currentPageAtom = atom({
  key: "currentPage",
  default: 0,
  // effects_UNSTABLE: [persistAtom],
});

export const currentSelectSortAtom = atom({
  key: "CurrentSelectSort",
  default: "최신글 순으로 보기",
  // effects_UNSTABLE: [persistAtom],
});

export const userLocation = atom({
  key: "userLocation",
  default: "서울",
});

export const firebaseInitialize = atom({
  key: "firebaseInitialize",
  default: null,
});

export const PreviewData = atom({
  key: "previewData",
  default: {},
});
