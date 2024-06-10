import axios from "axios";
import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import { URL } from "../url";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { search } = useLocation();
  // console.log(search);
  const [posts, setPosts] = useState([]);
  // (1) check if no posts match the search filter then "nothing"
  const [noResults, setNoResults] = useState(false);
  // (2) add loader animation on loading posts
  const [loader, setLoader] = useState(false);

  const { user } = useContext(UserContext);
  // console.log(user);
  // lay du lieu tu server
  const fetchPosts = async () => {
    // (2)
    setLoader(true);
    try {
      // GET POSTS route to check search filter
      const res = await axios.get(URL + "/api/posts" + search);
      // console.log(res.data);
      setPosts(res.data);

      // (1)
      if (res.data.length == 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }

      // (2)
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
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
      <div className="px-8 md:px-[300px] min-h-[80vh]">
        {loader ? ( // (2)
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? ( // (1)
          posts.map((post) => (
            <>
              <Link to={user ? `/posts/post/${post._id}` : `/login`}>
                <HomePosts key={post._id} post={post} />
              </Link>
            </>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16"> NO POSTS AVAILABLE</h3>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
