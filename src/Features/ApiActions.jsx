import axios from "axios";

import { setAllNotes, setRespons, setUser, setUserNotes } from "./Slice";

export const userRegistration = async (payload, dispatch) => {
  try {
    const res = await axios.post(
      "https://jobquest-kok5.onrender.com/api/registration",
      payload
    );
    // console.log(res.data);
    dispatch(setRespons(res.data.message));
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.Error;
      console.log(errorMessage);
      dispatch(setRespons(errorMessage));
    }
    console.error(error);
  }
};

export const userLogin = async (payload, dispatch) => {
  try {
    const res = await axios.post(
      "https://jobquest-kok5.onrender.com/api/login",
      payload
    );

    localStorage.setItem("token", res.data.token);
    dispatch(setRespons(res.data.message));
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.error;
      dispatch(setRespons(errorMessage));
    }
    console.error(error);
  }
};

export const getAllNotes = async (headers, dispatch) => {
  try {
    const res = await axios.get(
      "https://jobquest-kok5.onrender.com/api/notes",
      { headers }
    );
    dispatch(setAllNotes(res.data));
    // console.log(res.data.user);
    dispatch(setUser(res.data.user));
  } catch (error) {
    console.log(error);
  }
};

export const getUserNotes = async (headers, dispatch) => {
  try {
    const res = await axios.get(
      "https://jobquest-kok5.onrender.com/api/user/notes",
      {
        headers,
      }
    );
    dispatch(setUserNotes(res.data));
    // console.log(res.data);
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data;
      dispatch(setRespons(errorMessage));
    }
  }
};

export const userAddNotes = async (payload, dispatch) => {
  try {
    const res = await axios.post(
      "https://jobquest-kok5.onrender.com/api/add/notes",
      payload
    );
    dispatch(setRespons(res.data.message));
    // console.log(res);
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data;
      dispatch(setRespons(errorMessage));
    }
  }
};

export const updateNotes = async (payload, dispatch) => {
  try {
    const { headers, id, ...newNotes } = payload;
    // console.log(newNotes);
    const res = await fetch(
      `https://jobquest-kok5.onrender.com/api/update/notes/${payload.id}`,
      {
        method: "PUT",
        headers: payload.headers,
        body: JSON.stringify(newNotes),
      }
    );
    const data = await res.json();
    // console.log(data);

    if (res.ok) {
      dispatch(setRespons(data.message));
      dispatch(setUserNotes({ data: data.data }));
    } else {
      dispatch(setRespons(data.error));
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data;
      dispatch(setRespons(errorMessage));
    }
  }
};

export const deleteNotes = async (id, payload) => {
  try {
    const res = await axios.delete(
      `https://jobquest-kok5.onrender.com/api/delete/notes/${id}`,
      { headers: payload.headers }
    );
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async (email, dispatch) => {
  try {
    const res = await axios.post(
      "https://jobquest-kok5.onrender.com/api/forgot-password",
      {
        email,
      }
    );
    localStorage.setItem("STRING", res.data.randomString);

    dispatch(setRespons(res.data));
  } catch (error) {
    console.log(error);
    const errorMessage = error.response.data;
    dispatch(setRespons(errorMessage));
  }
};
export const setNewPassword = async (payload, dispatch) => {
  try {
    const res = await axios.post(
      "https://jobquest-kok5.onrender.com/api/reset-password",
      {
        email: payload.email,
        password: payload.password,
      }
    );
    console.log(res.data);
    dispatch(setRespons(res.data));
  } catch (error) {
    console.log(error);
    const errorMessage = error.response.data;
    dispatch(setRespons(errorMessage));
  }
};
export const updateProfile = async (payload, dispatch) => {
  try {
    const { headers, ...newData } = payload;
    // console.log(newNotes);
    const res = await fetch(
      "https://jobquest-kok5.onrender.com/api/update/user",
      {
        method: "PUT",
        headers: payload.headers,
        body: JSON.stringify(newData),
      }
    );
    const data = await res.json();
    // console.log(data);

    if (res.ok) {
      dispatch(setRespons(data.message));

      dispatch(setUser(data.data));

      console.log(data.data);
    } else {
      dispatch(setRespons(data.error));
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data;
      dispatch(setRespons(errorMessage));
    }
  }
};

export default {
  userRegistration,
  userLogin,
  getAllNotes,
  getUserNotes,
  userAddNotes,
  updateNotes,
  deleteNotes,
  resetPassword,
  updateProfile,
};
