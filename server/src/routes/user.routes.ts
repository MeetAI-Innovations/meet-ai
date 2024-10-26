import { query, Router } from "express";
import {
  getMeetingHistory,
  getScheduleMeetings,
  getSystemUsers,
  getUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resetPassword,
  sendEmail,
  setAccessToken,
  setOauthCookies,
  updateAccountDetails,
  updatePassword,
  uploadAvatar,
  verifyUser,
} from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import passport from "passport";
import { upload } from "../middlewares/multer.middleware";
import { getSystemErrorMap } from "util";

const userRouter = Router();

/* Register route */
userRouter.route("/register").post(registerUser);
userRouter.post("/verify", verifyUser);

/* Login route */
userRouter.route("/login").post(loginUser);
userRouter.route("/forgot-password").post(sendEmail);
userRouter.route("/reset-password").put(resetPassword);

/* Oauth routes */
userRouter.route("/oauth/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
  setOauthCookies
);
userRouter.route("/oauth/github").get(
  passport.authenticate("github", {
    scope: ["profile", "email"],
    session: false,
  }),
  setOauthCookies
);


userRouter.route("/set-access-token").get(setAccessToken);

/* Auth Middleware to check if person is authenticated or not */
userRouter.use(verifyJWT);  

/* Protected routes */
userRouter.route("/get-user").get(getUser);
userRouter.route("/logout").get(logoutUser);
userRouter.route("/get-all-users").get(getSystemUsers)
userRouter.route("/update-password").put(updatePassword);
userRouter
  .route("/upload-avatar")
  .put(upload.single("avatar"), uploadAvatar);
userRouter.route("/refresh-token").post(refreshAccessToken)
userRouter.route("/update-profile").put(updateAccountDetails);
userRouter.route("/get-meeting-history").get(getMeetingHistory)
userRouter.route("/get-scheduled-meetings").get(getScheduleMeetings)

export default userRouter;
