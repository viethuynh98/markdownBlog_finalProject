import axios from "axios";
import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import { URL } from "../url";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { search } = useLocation();
  // console.log(search);
  const [posts, setPosts] = useState([]);
  // check if no posts match the search filter then "nothing"
  const [noResults, setNoResults] = useState(false);


  // lay du lieu tu server
  const fetchPosts = async () => {
    try {
      // GET POSTS route to check search filter
      const res = await axios.get(URL + "/api/posts" + search);
      // console.log(res.data);
      setPosts(res.data);

      if (res.data.length == 0) {
        setNoResults(true);
        } else {
          setNoResults(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // call
  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    // md for medium screen
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {!noResults ? (
          posts.map((post) => <HomePosts key={post._id} post={post} />)
        ) : (
          <h3 className="text-center font-bold mt-16"> NO POSTS AVAILABLE</h3>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
