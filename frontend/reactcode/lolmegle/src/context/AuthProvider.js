import React, { useState } from 'react'
import AuthContext from './AuthContext'
import io from 'socket.io-client'
function AuthProvider(props) {
    const [auth,setAuth]=useState(localStorage.getItem("meUser")?JSON.parse(localStorage.getItem("meUser")):null);
    const [socket]=useState(io('http://localhost:5656/chat'));
  return (
    <AuthContext.Provider value={{auth,setAuth,socket}}>
        {props.children}
    </AuthContext.Provider>
  )
}
export default AuthProvider;