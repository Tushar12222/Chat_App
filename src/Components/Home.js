import React, { useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";


import chatsContext from "../Global state variables and functions/chats/ChatsContext";

import ContactCards from "./ContactCards";

export default function Home() {
  
  const context = useContext(chatsContext);
  const { connections, getConnections } = context;
  const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("logged_in_id")){
      navigate("/login");
    }
    getConnections();
    
    
  }, []);

  return (
    <>
    
      {<div className="container">
        <div className="row">
          {connections && 
            connections.map((ele) => {
              return (
                <div key={ele} className="col-md-3">
                  <div className="p-2">
                    <ContactCards key={ele} ele={ele} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>}
    </>
  );
}
