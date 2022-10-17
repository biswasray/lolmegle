import { useEffect, useState } from "react";
import "./App.css";
import UserInput from "./components/UserInput";
import useAuth from "./context/useAuth";

function App() {
  const { socket } = useAuth();
  const [no_client, setNo_client] = useState("");

  useEffect(() => {
    socket.on("no_client", (data) => {
      setNo_client(data.message);
    });
  }, [socket]);
  return (
    <div className="App">
      <div>{no_client}</div>
      <UserInput/>
    </div>
  );
}

export default App;
