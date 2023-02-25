import React, { useContext, useEffect, useState } from "react";

import chatsContext from "../Global state variables and functions/chats/ChatsContext";

export default function Messages() {
  const [message, setMessage] = useState("");
  const context = useContext(chatsContext);
  const { chats, getChats, addChats } = context;

  useEffect(() => {
    getChats(localStorage.getItem("id"));
  }, []);
  const handleChange = (e) => {
    let m = e.target.value;
    setMessage(m);
  };
  const handleMessageSend = (e) => {
    e.preventDefault();
    addChats(message);

    setMessage("");
  };
  return (
    <>
      <div
        id="scroll"
        className="scroll"
        style={{ height: "700px", overflowY: "scroll" }}
      >
        {chats &&
          chats.map((ele) => {
            return (
              <div
                key={ele.id}
                className={`d-flex justify-content-${
                  ele.sent_by === localStorage.getItem("logged_in_id")
                    ? "end"
                    : "start"
                } mx-2 my-2`}
              >
                <span
                  className={`badge text-bg-${
                    ele.sent_by === localStorage.getItem("logged_in_id")
                      ? "success"
                      : "primary"
                  }`}
                >
                  {ele.message}
                </span>
              </div>
            );
          })}
      </div>

      <div className="fixed-bottom position-absolute bottom-0 start-50 translate-middle-x">
        {" "}
        <form onSubmit={handleMessageSend}>
          <div className="input-group mb-3">
            <textarea
              type="text"
              className="form-control"
              placeholder={`Text ${localStorage.getItem("name")}`}
              aria-label="Recipient's username"
              value={message}
              onChange={handleChange}
              aria-describedby="button-addon2"
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              id="button-addon2"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
