import { atom } from "jotai";

interface UserState {
  profilePicture: string;
}

const initialUserState: UserState = {
  profilePicture:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy4Vvlzhz_mY0fDFrSllG43WpRRoi6JUKNZg&usqp=CAU",
};

export const userAtom = atom(initialUserState);

export const setProfilePictureAtom = atom(
  null,
  (get, set, newProfilePicture: string) => {
    set(userAtom, { ...get(userAtom), profilePicture: newProfilePicture });
  }
);
