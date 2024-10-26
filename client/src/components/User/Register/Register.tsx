"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axios";
import Link from 'next/link'

export default function Register() {
  const USER_REGEX = useMemo(() => /^[A-z][A-z0-9-_]{3,23}$/, []);
  const PWD_REGEX = useMemo(
    () => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
    []
  );
  const EMAIL_REGEX = useMemo(
    () => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    []
  );

  const [userName, setUserName] = useState<string>("");
  const [validUserName, setValidUserName] = useState<Boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [codeError, setCodeError] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [PWD_REGEX, password]);

  useEffect(() => {
    setValidUserName(USER_REGEX.test(userName));
  }, [USER_REGEX, userName]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [EMAIL_REGEX, email]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      userName,
      fullName: `${firstName} ${lastName}`,
      password,
      email,
    };

    try {
      const response = await axiosInstance.post(`/user/register`, data);
      console.log("Registration successful:", response.data);
      setToken(response.data.data);
      setModalContent("Enter the verification code sent to your email.");
      setShowModal(true);
    } catch (err:any) {
      console.log(
        "Error during registration:",
        err.response?.data || err.message
      );
    }
  };

  const verifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/user/verify`, {
        activationToken: token,
        otp: verificationCode,
      });
      console.log("Verification successful:", response.data);
      router.push("/auth/login"); 
    } catch (err:any) {
      setCodeError("Invalid verification code. Please try again.");
      console.log(
        "Error during verification:",
        err.response?.data || err.message
      );
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="max-w-md w-full mx-auto p-4 md:p-8 bg-white dark:bg-black">
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              type="text"
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              type="text"
              required
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">
            Username
            <FontAwesomeIcon
              icon={faCheck}
              className={validUserName ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validUserName || !userName ? "hide" : "invalid"}
            />
          </Label>
          <Input
            id="username"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            required
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">
            Email Address
            <FontAwesomeIcon
              icon={faCheck}
              className={validEmail ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validEmail || !email ? "hide" : "invalid"}
            />
          </Label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            type="email"
            required
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">
            Password
            <FontAwesomeIcon
              icon={faCheck}
              className={validPassword ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPassword || !password ? "hide" : "invalid"}
            />
          </Label>
          <Input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            type="password"
            required
          />
        </LabelInputContainer>

        <button
          className="bg-blue-700 text-white w-full h-10 rounded-md"
          type="submit"
        >
          Sign Up
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-black p-6 rounded-md shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Verify Your Email</h2>
            <p>{modalContent}</p>
            <form onSubmit={verifyCode}>
              <Input
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter verification code"
                type="text"
                required
              />
              {codeError && <p className="text-red-500">{codeError}</p>}
              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full"
                type="submit"
              >
                Verify
              </button>
            </form>
            <button className="mt-2 text-blue-500" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-between text-sm">
        <span>Already have an account?</span>
        <a href="/auth/login" className="text-sky-500">
          Log in
        </a>
      </div>

      <div className="mt-6 flex flex-col space-y-2">
      <Link href="http://localhost:5000/api/v1/user/oauth/github">
        <button
          className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900"
          type="button"
        >
          <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            GitHub
          </span>
          <BottomGradient />
        </button>
        </Link>
        <Link href="http://localhost:5000/api/v1/user/oauth/google">
        <button
          className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900"
          type="button"
        >
          <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Google
          </span>
          <BottomGradient />
        </button>
        </Link>
      </div>
    </div>
  );
}

const LabelInputContainer = ({ children, className }: any) => (
  <div className={cn("w-full", className)}>{children}</div>
);

const BottomGradient = () => (
  <span
    aria-hidden="true"
    className="bg-gradient-to-tl pointer-events-none absolute top-0 left-0 w-full h-full opacity-0 group-hover/btn:opacity-100 from-white/20 dark:from-black/20 to-transparent rounded-md"
  />
);
