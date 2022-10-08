import { useEffect, useState } from "react";
import "./App.css";
import useAuth from "./context/useAuth";

function App() {
  const { socket } = useAuth();
  const [no_client,setNo_client] = useState(0);

  useEffect(() => {
    socket.on("no_client", (data) => {
      setNo_client(parseInt(data.message));
    });
  }, [socket]);
  return <div className="App">{no_client}</div>;
}

export default App;
