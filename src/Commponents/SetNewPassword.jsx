import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setNewPassword } from "../Features/ApiActions";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.jpeg";

const SetNewPassword = () => {
  const response = useSelector((state) => state.quesAppReducer.resposne);
  const navigate = useNavigate();
  const [mailString] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConPassword] = useState("");
  const localString = localStorage.getItem("STRING");
  const dispatch = useDispatch();

  const myRef = useRef();

  useEffect(() => {
    if (mailString.get("string") !== localString) {
      alert("The Password Reset Link has Expired");
      navigate("/forget-pass");
    }

    setTimeout(() => {
      localStorage.clear();
    }, 120000);

    myRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!localString) {
      alert("The Password Reset Link has Expired");
      navigate("/forget-pass");
    } else {
      if (password !== confirmPassword) {
        alert("password not match");
      } else if (password.length < 5) {
        return alert("Password should have minimum FIVE charactor");
      } else {
        const payload = {
          email: localStorage.getItem("EMAIL"),
          password: confirmPassword,
        };
        setNewPassword(payload, dispatch);
        setConPassword("");
        setPassword("");
      }
    }
  };

  return (
    <div>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="max-w-screen-l m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <img src={logo} className="w-32 mx-auto" alt="Logo" />
            </div>
            <div className="mt-4 flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col items-center">
                    {/* <h1 className=" text-blue-700"> Forget Password </h1> */}
                    <input
                      ref={myRef}
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      placeholder="Enter the new password"
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type="password"
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      placeholder="Re-Enter the password"
                      required
                      value={confirmPassword}
                      onChange={(e) => {
                        setConPassword(e.target.value);
                      }}
                      type="password"
                    />

                    <button
                      className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      type="submit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                        />
                      </svg>

                      <span className="ml-3"> Reset Password</span>
                    </button>
                    {response && (
                      <p className="text-green-500 text-sm mt-1">
                        {response.message}
                      </p>
                    )}
                    <a
                      className="font-medium text-sm text-blue-600 hover:underline dark:text-blue-500"
                      href="/signin"
                    >
                      SIGN IN
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;
