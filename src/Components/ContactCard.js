import React from "react";
import { Link } from "react-router-dom";

export default function ContactCard(props) {
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={
            props.ele.avatar
              ? `http://127.0.0.1:8090/api/files/users/${props.ele.id}/${props.ele.avatar}`
              : "https://cdn-icons-png.flaticon.com/512/147/147144.png"
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.ele.username}</h5>
          <p className="card-text">
            
          </p>
          <Link to="/messages" onClick={()=>{localStorage.setItem('id',props.ele.id);localStorage.setItem("name",props.ele.username)}} className="btn btn-primary">
            Check messages
          </Link>
        </div>
      </div>
    </>
  );
}
