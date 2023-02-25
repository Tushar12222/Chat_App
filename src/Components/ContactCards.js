import React, { useContext, useEffect, useState } from "react";
import chatsContext from "../Global state variables and functions/chats/ChatsContext";
import ContactCard from "./ContactCard";

export default function ContactCards(props) {
  const context = useContext(chatsContext);
  const { connections } = context;

  const [condata, setconData] = useState(null);
  const fetch_con_data = async () => {
    const response = await fetch(
      `http://127.0.0.1:8090/api/collections/users/records?filter=id="${props.ele}"`
    );
    const json = await response.json();

    setconData(json.items[0]);
  };
  useEffect(() => {
    fetch_con_data();
  }, []);

  return <>{condata && <ContactCard key={props.ele.id} ele={condata} />}</>;
}
