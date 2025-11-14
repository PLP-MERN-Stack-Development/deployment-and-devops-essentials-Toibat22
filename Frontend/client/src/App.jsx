import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

// Pages
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CreatePost from "./Pages/CreatePost";
import SinglePost from "./Pages/SinglePost";
import EditPost from "./Pages/EditPost";
import DeletePost from "./Pages/DeletePost";

function App() {
  const { user } = useContext(UserContext); // <-- use context

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id" element={user ? <SinglePost /> : <Login />} />
        <Route path="/create-post" element={user ? <CreatePost /> : <Login />} />
        <Route path="/post/:id/edit" element={user ? <EditPost /> : <Login />} />
        <Route path="/post/delete/:id" element={<DeletePost />} />
      </Routes>
    </>
  );
}

export default App;
