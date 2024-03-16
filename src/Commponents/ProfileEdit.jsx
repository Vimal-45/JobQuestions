import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "flowbite-react";
import axios from "axios";
import { updateProfile } from "../Features/ApiActions";
import userImg from "../assets/ProfileImg.jpg";

const ProfileEdit = () => {
  const user = useSelector((state) => state.quesAppReducer.user);
  const [imageUrl, setImageUrl] = useState(user.imageUrl);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const uploadedfile = event.target.files[0];
    setFile(uploadedfile);

    if (uploadedfile) {
      setLoading(true);
      const data = new FormData();
      data.append("file", uploadedfile);
      data.append("upload_preset", "stvzpsmo");
      data.append("cloud_name", "dwo49uopx");

      axios
        .post("https://api.cloudinary.com/v1_1/dwo49uopx/image/upload", data)
        .then((response) => {
          setImageUrl(response.data.secure_url);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  };

  const handleSave = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const payload = { email, username, imageUrl, headers };
    updateProfile(payload, dispatch);
  };

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
              Update your Personal details
            </p>
          </div>
          <div className="border-t border-gray-200">
            <div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <p className="text-sm font-medium text-gray-500"> User Name </p>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder={user.username}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <p className="text-sm font-medium text-gray-500">
                  Email address
                </p>

                <input
                  type="text"
                  name="email"
                  id="eamil"
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder={user.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/4 bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <div className="bg-white rounded-lg  mb-4">
            <div className="p-4 text-center">
              {loading ? (
                <div className="flex justify-center items-center h-36">
                  <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
                </div>
              ) : (
                <img
                  src={imageUrl || userImg}
                  alt="avatar"
                  className="rounded-full mx-auto"
                  style={{ width: "150px" }}
                  disabled={loading}
                />
              )}
              <div className="flex justify-center mt-2">
                <input type="file" onChange={handleFileChange} />{" "}
                {/* Changed from Button to input */}
              </div>
            </div>
          </div>
        </div>
        <Button onClick={handleSave}> Save Changes </Button>
      </div>
    </>
  );
};

export default ProfileEdit;
