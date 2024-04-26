import { createSlice } from "@reduxjs/toolkit";

interface UserProfileState {
  profilePicture: string;
}

const initialState: UserProfileState = {
  profilePicture:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy4Vvlzhz_mY0fDFrSllG43WpRRoi6JUKNZg&usqp=CAU",
};

export const profileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
  },
});

export const { setProfilePicture } = profileSlice.actions;
export default profileSlice.reducer;
