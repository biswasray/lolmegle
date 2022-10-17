import React, { useEffect, useRef } from "react";
import useAuth from "../context/useAuth";

export default function UserInput() {
    const inputName = useRef();
    const nameInput = useRef();
    const {user,setUser,socket}=useAuth();
    useEffect(()=>{
        nameInput.current.style.display = "none";
        if(user) {
            socket.emit('setUser', user);
        }
        else {
            nameInput.current.style.display = "block";
        }
        socket.on('userSet', (data) => {
            console.log(data);
            setUser(data);
            nameInput.current.style.display = "none";
        });
        socket.on('userExist', (data) => {
            setUser(null);
            nameInput.current.style.display = "block";
            alert(data);
        });
    },[]);
    const handleName = (e) => {
        e.preventDefault();
        alert(inputName.current.value);
    }
  return (
    <div>
      <form ref={nameInput} onSubmit={handleName}>
        <label>
          <b>Enter your name :</b>
        </label>
        &nbsp;
        <input type="text" ref={inputName} />
        <input type="submit" value="Enter" />
      </form>
    </div>
  );
}
