import React, { useContext, useState } from "react";
import swal from "sweetalert";
import chatsContext from "../Global state variables and functions/chats/ChatsContext";

export default function Addfriend() {
  const context = useContext(chatsContext);
  const { addConnections } = context;
  const [id, setId] = useState("");
  const handleChange = (e) => {
    setId(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addConnections(id);
    swal("Success", "Added a Friend!", "success");
    setId("");
  };
  return (
    <>
    
      <div className="dropdown">
        <button
          className="btn btn-success dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Add Friend
        </button>
        <ul className="dropdown-menu">
          <li>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 container">
                <label htmlFor="id" className="form-label">
                  Enter id
                </label>
                <input
                  name="id"
                  type="text"
                  className="form-control"
                  id="id"
                  aria-describedby="emailHelp"
                  value={id}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary mx-3">
                Add
              </button>
            </form>
          </li>
        </ul>
      </div>
    </>
  );
}
