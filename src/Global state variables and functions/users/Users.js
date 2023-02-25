import React, { useState } from "react";
import usersContext from "./UsersContext";
import PocketBase from "pocketbase";
import { useNavigate } from "react-router-dom";

export default function Users(props) {
  const navigate = useNavigate();
  const pb = new PocketBase("http://127.0.0.1:8090");
  const [loading, setLoading] = useState(false);
  const createUser = async (username, email, password, confirmpass) => {
    const data = {
      username: username,
      email: email,
      emailVisibility: true,
      password: password,
      passwordConfirm: confirmpass,
    };
    const record = await pb.collection("users").create(data);
    const data1 = {
      main_id: `${record.id}`,
    };
    const records = await pb.collection("connections").create(data1);
  };
  const loginUser = async (email, password) => {
    setLoading(true);
    const authData = await pb
      .collection("users")
      .authWithPassword(`${email}`, `${password}`);
    setLoading(false);
    localStorage.setItem("token", authData.token);
    localStorage.setItem("logged_in_id", authData.record.id);
    localStorage.setItem("username", authData.record.username);
    navigate("/");
  };
  
  return (
    <>
      <usersContext.Provider value={{ createUser, loginUser, loading }}>
        {props.children}
      </usersContext.Provider>
    </>
  );
}
