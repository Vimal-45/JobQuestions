import React from "react";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import userImg from "../assets/ProfileImg.jpg";

const Profile = () => {
  const user = useSelector((state) => state.quesAppReducer.user);
  const navigate = useNavigate();

  return (
    <>
      <NavBar />

      <div className="max-w-7xl flex mt-20 justify-around flex-wrap sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg w-full md:w-3/4">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              My Account
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Personal details
            </p>
          </div>
          <div className="border-t border-gray-200">
            <div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <p className="text-sm font-medium text-gray-500"> User Name </p>
                <p className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {user.username}
                </p>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <p className="text-sm font-medium text-gray-500">
                  Email address
                </p>
                <p className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/4 bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <div className="bg-white rounded-lg  mb-4">
            <div className="p-4 text-center">
              <img
                src={user.imageUrl || userImg}
                alt="avatar"
                className="rounded-full mx-auto"
                style={{ width: "150px" }}
              />
            </div>

            <div className="flex justify-center mt-2">
              <Button onClick={() => navigate("/editprofile")}>
                {" "}
                Update Your Profile{" "}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
