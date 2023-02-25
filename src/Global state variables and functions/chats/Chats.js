import React, { useState } from "react";
import chatsContext from "./ChatsContext";
import PocketBase from "pocketbase";

export default function Chats(props) {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const [chats, setChats] = useState(null);
  pb.autoCancellation(false);
  const scroll_to_bottom = document.getElementById("scroll");
  const scrollBottom = (element) => {
    element.scroll({ top: element.scrollHeight, behavior: "smooth" });
  };
  const [connections, setConnections] = useState(null);
  const subscribe = async () => {
    try {
      await pb
        .collection("chats")
        .subscribe("*", async ({ action, record }) => {
          if (action === "create") {
            getChats(localStorage.getItem("id"));
          }
        });
      scrollBottom(scroll_to_bottom);
    } catch (error) {
      ;
    }
  };
  const getChats = async (id) => {
    try {
      const logged_in = localStorage.getItem("logged_in_id");
      const response = await pb.collection("chats").getFullList(1000000, {
        '$autoCancel': false,
        filter: `sent_by='${logged_in}' && sent_to='${id}' || sent_by='${id}' && sent_to='${logged_in}'`,
      });

      setChats(response);
      subscribe();
    } catch (error) {
      
    }
  };
  const addChats = async (message) => {
    const sent_to = localStorage.getItem("id");
    const id = localStorage.getItem("logged_in_id");
    const data = {
      message: message,
      sent_by: id, 
      sent_to: sent_to,
    };
    const record = await pb.collection("chats").create(data);
    getChats(sent_to);
  };
  const getConnections = async () => {
    try {
      const id = localStorage.getItem("logged_in_id");
      const response = await fetch(
        `http://127.0.0.1:8090/api/collections/connections/records?filter=main_id='${id}'`
      );
      const json = await response.json();
      localStorage.setItem("connection_collection_id",json.items[0].id)
      
      setConnections(json.items[0].connected_to);
      
    } catch (error) {
      
    }
  };
  const addConnections = async (id) => {
    const logged_in = localStorage.getItem("logged_in_id");
    connections.push(id);
    
    const data = {
      main_id: `${logged_in}`,
      connected_to: connections
    };
    
    const collection_id = localStorage.getItem("connection_collection_id");
    const record = await pb.collection('connections').update(`${collection_id}`, data);
    getConnections();
  };
  return (
    <>
      <chatsContext.Provider
        value={{
          chats,
          getChats,
          connections,
          getConnections,
          addChats,
          addConnections,
        }}
      >
        {props.children}
      </chatsContext.Provider>
    </>
  );
}
