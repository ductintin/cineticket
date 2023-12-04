import { createSelector } from "@reduxjs/toolkit";

export const userProfileSelector = (state) => state.auth.login.currentUser;
