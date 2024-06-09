import axios from "axios";
import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import { URL } from "../url";
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  // lay du lieu tu server
  const fetchPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts");
      console.log(res.data);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // call
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    // md for medium screen
    <>
      <Navbar />
      <div className="px-8 md:px-[200px]">
        <HomePosts />
        <HomePosts />
        <HomePosts />
        <HomePosts />
        <HomePosts />
      </div>
      <Footer />
    </>
  );
};

export default Home;
