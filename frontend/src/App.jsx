import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import { UserContextProvider } from "./context/UserContext";
import MyBlogs from "./components/MyBlogs";

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/write" element={<CreatePost />} />
        <Route path="/posts/post/:id" element={<PostDetails />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/myBlogs/:id" element={<MyBlogs />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </UserContextProvider>
  );
};

export default App;
