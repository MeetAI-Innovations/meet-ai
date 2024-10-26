import {
  jwtSecret,
  smtpHost,
  smtpPass,
  smtpPort,
  smtpUser,
} from "../config/envConfig";
import { IUser, User } from "../models/user.model";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import uploadOnCloudinary from "../utils/cloudinary";
import Meeting from "../models/meeting.model";
import mongoose from "mongoose";
import sendMail from "../utils/sendMail";

const options: any = {
  httpOnly: false,
  secure: true,
  sameSite: "Strict",
  path: "/",
};

const { ObjectId } = mongoose.Types;

const generateAccessAndRefreshToken = async (userId: any) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(
        401,
        "user does not exist so tokens can not be created!"
      );
    }
    const accessToken = user?.generateAccessToken();
    const refreshToken = user?.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(401, "Something went wrong while creating the tokens!");
  }
};

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { userName, fullName, email, password } = req.body;

  if (
    [userName, fullName, email, password].some((value) => value?.trim() === "")
  ) {
    throw new ApiError(401, "All fields are necessary!");
  }

  const userExists = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (userExists) {
    throw new ApiError(401, "Username or email already exists!");
  }

  const user = {
    fullName,
    userName,
    email,
    password,
  };

  console.log(process.env.NEXT_PUBLIC_ACTIVATION_SECRET!);

  const otp = Math.floor(Math.random() * 1000000);

  const activationToken = jwt.sign(
    {
      user,
      otp,
    },
    process.env.NEXT_PUBLIC_ACTIVATION_SECRET!,
    {
      expiresIn: "5m",
    }
  );

  const data = {
    userName,
    otp,
  };

  await sendMail(email, "Meet AI", data);

  return res
    .status(200)
    .json(new ApiResponse(201, activationToken, "Otp send to your mail"));
});

const verifyUser = asyncHandler(async (req, res) => {
  const { otp, activationToken } = req.body;
  console.log(otp, activationToken);

  const verify: any = jwt.verify(
    activationToken,
    process.env.NEXT_PUBLIC_ACTIVATION_SECRET!
  );
  console.log(verify);

  if (!verify)
    return res.status(400).json({
      message: "Otp Expired",
    });

  console.log(verify.otp === Number(otp));

  if (!(verify.otp === Number(otp)))
    return res.status(400).json({
      message: "Wrong Otp",
    });

  await User.create({
    userName: verify.user.userName,
    email: verify.user.email,
    fullName: verify.user.fullName,
    password: verify.user.password,
  });

  res.json(new ApiResponse(200, null, "User register successfully"));
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { userName, password } = req.body;

  if ([userName, password].some((value) => value.trim() === "")) {
    throw new ApiError(401, "All fields are necessary!");
  }

  const user = await User.findOne({ userName: userName });

  if (!user) {
    throw new ApiError(401, "user does not exist!");
  }

  const checkPassword = await user.isPasswordCorrect(password);

  if (!checkPassword) {
    throw new ApiError(400, "Incorrect Password!");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user?._id
  );

  const loggedUser = await User.findById(user?._id).select(
    "-password -refreshToken"
  );

  console.log("Credential login: ", loggedUser);

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedUser, accessToken, refreshToken },
        "user logged in successfully!"
      )
    );
});

const logoutUser = asyncHandler(async (req: any, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(400, "user should be logged in first!");
  }
  await User.findByIdAndUpdate(
    user?._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user loggedout successfully"));
});

const getSystemUsers = asyncHandler(async (req: any, res: Response) => {
  const userId = req?.user?.id;

  if (!mongoose.isValidObjectId(userId)) {
    return res.status(400).json(new ApiResponse(400, null, "Invalid user ID"));
  }

  const users = await User.find({ _id: { $ne: userId } }).select("-password -refreshToken -OauthId -fullName -createdAt -updatedAt -__v");

  return res
    .status(200)
    .json(new ApiResponse(201, users, "Users fetched successfully"));
});

const refreshAccessToken = asyncHandler(async (req: any, res: Response) => {
  const incomingRefreshToken: any =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  const decodedToken: any = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET as string
  );

  const user = await User.findById(decodedToken?._id);

  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

  if (incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(401, "Refresh token is expired or used");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  const {
    accessToken,
    refreshToken: newRefreshToken,
  } = await generateAccessAndRefreshToken(user._id);

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken: newRefreshToken },
        "Access token refreshed"
      )
    );
});

const getUser = asyncHandler(async (req: any, res: Response) => {
  const user = req.user;

  return res
    .status(200)
    .json(
      new ApiResponse(200, { FetchedUser: user }, "user fetched successfully!")
    );
});

const updatePassword = asyncHandler(async (req: any, res: Response) => {
  const { oldPassword, newPassword } = req.body;

  const user: any = await User.findById(req?.user._id);
  const isPasswordCorrect: Boolean = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid Password");
  }

  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(201, {}, "Password Updated successfully"));
});

const sendEmail = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(402, "Email Required");
  }

  const user = await User.find({ email });

  if (!user) {
    throw new ApiError(404, "User with given email doesn't exist");
  }

  const token = jwt.sign({ _id: user[0]._id }, jwtSecret as string, {
    expiresIn: "1h",
  });

  const transporter = nodemailer.createTransport({
    host: smtpHost as string,
    port: Number(smtpPort),
    auth: {
      user: smtpUser as string,
      pass: smtpPass as string,
    },
  });

  const mailOptions = {
    from: "project9960@gmail.com",
    to: email,
    subject: "Password Reset Link",
    html: `<h4>You requested for password reset</h4>
                  <p>Click <a href="http://localhost:5173/reset-password/${token}">here</a> to reset your password</p>`,
  };

  await transporter.sendMail(mailOptions);

  return res
    .status(200)
    .json(new ApiResponse(201, { token }, "Email sended successfully"));
});

const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  console.log(token);
  const decoded: any = jwt.verify(token, jwtSecret as string);
  const user = await User.findById(decoded?._id);

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(201, {}, "Password reset Successfully"));
});

const uploadAvatar = asyncHandler(async (req: Request | any, res: Response) => {
  let avatarLocalPath: string | undefined;
  const user: IUser | any = req?.user;

  console.log(req?.file);

  if (req?.file) {
    avatarLocalPath = req?.file?.path;
    console.log(avatarLocalPath);
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Upload avatar to Cloudinary
  const avatarImg = await uploadOnCloudinary(avatarLocalPath);
  if (!avatarImg) {
    throw new ApiError(500, "Something went wrong while uploading avatar");
  }

  // Update user with the new avatar URL
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { avatar: avatarImg?.secure_url },
    { new: true } // Return the updated document
  ).select("-password -refreshToken");

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  // Respond to the client with the updated user data
  return res
    .status(201)
    .json(new ApiResponse(200, updatedUser, "Avatar updated successfully"));
});

const updateAccountDetails = asyncHandler(async (req: any, res: Response) => {
  const { userName, email, fullName } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        userName: userName ? userName : req.user.userName,
        email: email ? email : req.user.email,
        fullName: fullName ? fullName : req.user.fullName,
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { UpdatedUser: user },
        "Account details updated successfully"
      )
    );
});

const getMeetingHistory = asyncHandler(async (req: any, res: Response) => {
  const userId = req?.user?._id;

  const meetingHistory = await Meeting.aggregate([
    {
      $match: {
        host: new ObjectId(userId),
      },
    },
    {
      $addFields: {
        guestDetails: {
          $filter: {
            input: "$participants",
            as: "participant",
            cond: { $eq: ["$$participant.role", "guest"] },
          },
        },
        userDetails: {
          $filter: {
            input: "$participants",
            as: "participant",
            cond: {
              $or: [
                { $eq: ["$$participant.role", "participant"] },
                { $eq: ["$$participant.role", "host"] },
              ],
            },
          },
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userDetails.userId",
        foreignField: "_id",
        as: "userDetailsInfo",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "host",
        foreignField: "_id",
        as: "hostDetails",
      },
    },
    {
      $unwind: {
        path: "$hostDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        userDetails: {
          $map: {
            input: "$userDetails",
            as: "user",
            in: {
              $mergeObjects: [
                "$$user",
                {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$userDetailsInfo",
                        as: "userInfo",
                        cond: { $eq: ["$$userInfo._id", "$$user.userId"] },
                      },
                    },
                    0,
                  ],
                },
              ],
            },
          },
        },
      },
    },
    {
      $project: {
        "userDetails._id": 1,
        "userDetails.userName": 1,
        "userDetails.fullName": 1,
        "userDetails.email": 1,
        "userDetails.avatar": 1,
        "userDetails.role": 1,
        "hostDetails._id": 1,
        "hostDetails.userName": 1,
        "hostDetails.fullName": 1,
        "hostDetails.email": 1,
        guestDetails: 1,
        title: 1,
        description: 1,
        status: 1,
        roomId: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);

  res
    .status(200)
    .json(
      new ApiResponse(201, meetingHistory, "Meeting data fetched successfully")
    );
});

const getScheduleMeetings = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user._id;

  console.log(userId);

  const userObjectId = new ObjectId(userId);

  console.log(userObjectId);

  const meetings = await Meeting.aggregate([
    {
      $match: {
        $and: [
          {
            $or: [
              { createdBy: userObjectId },
              { participants: { $in: [userObjectId] } },
            ],
          },
          {
            status: "scheduled",
          },
        ],
      },
    },
  ]);

  console.log(meetings);

  return res
    .status(200)
    .json(new ApiResponse(201, meetings, "Scheduled meetings fetched"));
});

const setOauthCookies = asyncHandler(async (req: any, res: Response) => {
  // console.log("auth: ", req.auth);
  res
    .cookie("accessToken", req.auth, options)
    .redirect("http://localhost:3000/auth/setaccesstoken");
});

const setAccessToken = asyncHandler(async (req: any, res: Response) => {
  let token = req.cookies.accessToken;

  // console.log("Token: ", token);

  res
    .status(201)
    .json(new ApiResponse(201, token, "AccessToken fetched successfully!"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getSystemUsers,
  getUser,
  refreshAccessToken,
  updatePassword,
  sendEmail,
  resetPassword,
  updateAccountDetails,
  generateAccessAndRefreshToken,
  setOauthCookies,
  setAccessToken,
  getMeetingHistory,
  uploadAvatar,
  verifyUser,
  getScheduleMeetings,
};
