import React, { useState } from 'react'
import AuthContext from './AuthContext'
import io from 'socket.io-client'
function AuthProvider(props) {
    const [user,setAuth]=useState(localStorage.getItem("meUser")?JSON.parse(localStorage.getItem("meUser")):null);
    const [socket]=useState(io('http://localhost:5656/chat'));
    const setUser = (data) => {
      localStorage.setItem('meUser', data);
      setAuth((a)=>data);
    }
  return (
    <AuthContext.Provider value={{user,setUser,socket}}>
        {props.children}
    </AuthContext.Provider>
  )
}
export default AuthProvider;