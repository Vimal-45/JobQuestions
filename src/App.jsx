import React from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Commponents/Dashboard";
import Login from "./Commponents/Login";
import Registor from "./Commponents/Registor";
import Profile from "./Commponents/Profile";
import { Store } from "./Features/Store";
import MyNotes from "./Commponents/MyNotes";
import AddNotes from "./Commponents/AddNotes";
import ResetPassword from "./Commponents/ResetPassword";
import SetNewPassword from "./Commponents/SetNewPassword";
import ProfileEdit from "./Commponents/ProfileEdit";

const App = () => {
  return (
    <Provider store={Store}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mynotes" element={<MyNotes />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/register" element={<Registor />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<ProfileEdit />} />
        <Route path="/addnotes" element={<AddNotes />} />
        <Route path="/forget-pass" element={<ResetPassword />} />
        <Route path="/reset" element={<SetNewPassword />} />
      </Routes>
    </Provider>
  );
};

export default App;
