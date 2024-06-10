/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { IF, URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const getRandomBrightColor = () => {
  const letters = "89ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 8)];
  }
  return color;
};

const Profile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [profile, setProfile] = useState("");

  const fetchUserCredentials = async () => {
    try {
      const res = await axios.get(URL + "/api/users/" + param, {
        withCredentials: true,
      });
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        URL + "/api/users/" + user._id,
        { username, email, password },
        { withCredentials: true }
      );
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(URL + "/api/users/" + user._id, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/user/" + param);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/userProfile/" + param);
      setProfile(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserCredentials();
  }, [param]);

  useEffect(() => {
    fetchUserPosts();
  }, [param]);

  useEffect(() => {
    fetchUserProfile();
  }, [param]);

  return (
    <div>
      <Navbar />
      <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex flex-col items-start space-y-8">
        {/* Summary and Profile Photo */}
        <div className="flex w-full">
          {/* Summary */}
          <div className="w-3/4 p-4 min-h-[300px]">
            <h1 className="ext-xl font-bold mb-4 text-center">ABOUT</h1>
            <p>{profile?.summary}</p>
          </div>
          {/* Profile Photo */}
          <div className="w-1/4">
            <img src={IF + "image1"} alt="Profile" className="w-full h-auto" />
          </div>
        </div>
        {/* Skills */}
        <div className="w-full p-4 bg-gradient-to-tr min-h-[300px]">
          <h1 className="text-xl font-bold mb-4 text-center">SKILLS</h1>
          <div className="grid grid-cols-4 gap-4">
            {profile?.skills?.map((skill, index) => (
              <p
                key={index}
                className="border p-2 shadow-md text-center rounded-md animate-bounce"
                style={{
                  backgroundColor: getRandomBrightColor(),
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {skill}
              </p>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="w-full p-4 bg-gradient-to-tr min-h-[300px]">
          <h1 className="text-xl font-bold mb-4 text-center">EDUCATION</h1>
          <div className="grid grid-cols-4 gap-4 ">
            {profile?.educations?.map((education, index) => (
              <p
                key={index}
                className="border p-2 shadow-md text-center rounded-md animate-bounce"
                style={{
                  backgroundColor: getRandomBrightColor(),
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {education}
              </p>
            ))}
          </div>
        </div>
        {/* Interests */}
        <div className="w-full p-4 bg-gradient-to-tr min-h-[300px]">
          <h1 className="text-xl font-bold mb-4 text-center">INTERESTS</h1>
          <div className="grid grid-cols-4 gap-4 ">
            {profile?.interests?.map((interest, index) => (
              <p
                key={index}
                className="border p-2 shadow-md text-center rounded-md animate-bounce"
                style={{
                  backgroundColor: getRandomBrightColor(),
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {interest}
              </p>
            ))}
          </div>
        </div>
        {/* Posts */}
        <div className="w-full p-4">
          <h1 className="text-xl font-bold mb-4 text-center">POSTS</h1>
          {posts?.map((p) => (
            <div
              className="rounded-md"
              key={p._id}
              style={{
                backgroundColor: getRandomBrightColor(),
              }}
            >
              <ProfilePosts p={p} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;

{
  /* <input onChange={(e)=>setPassword(e.target.value)} value={password} className="outline-none px-4 py-2 text-gray-500" placeholder="Your password" type="password"/> */
}
{
  /* <div className="md:sticky md:top-12  flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end ">
<div className=" flex flex-col space-y-4 items-start">
  <h1 className="text-xl font-bold mb-4">Profile</h1>
  <input
    onChange={(e) => setUsername(e.target.value)}
    value={username}
    className="outline-none px-4 py-2 text-gray-500"
    placeholder="Your username"
    type="text"
  />
  <input
    onChange={(e) => setEmail(e.target.value)}
    value={email}
    className="outline-none px-4 py-2 text-gray-500"
    placeholder="Your email"
    type="email"
  />
  <div className="flex items-center space-x-4 mt-8">
    <button
      onClick={handleUserUpdate}
      className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
    >
      Update
    </button>
    <button
      onClick={handleUserDelete}
      className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
    >
      Delete
    </button>
  </div>
  {updated && (
    <h3 className="text-green-500 text-sm text-center mt-4">
      user updated successfully!
    </h3>
  )}
</div>
</div> */
}
