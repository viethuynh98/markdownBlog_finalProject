import axios from "axios";
import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import { URL } from "../url";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";

const Home = () => {
  const { search } = useLocation();
  // console.log(search);
  const [posts, setPosts] = useState([]);
  // (1) check if no posts match the search filter then "nothing"
  const [noResults, setNoResults] = useState(false);
  // (2) add loader animation on loading posts
  const [loader, setLoader] = useState(false);
  const [categories, setCategories] = useState([]);

  // lay du lieu tu server
  const fetchPosts = async () => {
    // (2)
    setLoader(true);
    try {
      // GET POSTS route to check search filter
      const res = await axios.get(URL + "/api/posts" + search);
      setPosts(res.data);

      // (1)
      if (res.data.length == 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      const allCategories = res.data.flatMap((post) => post.categories);
      const uniqueCategories = [...new Set(allCategories)];
      setCategories(uniqueCategories);
      console.log(allCategories);
      // (2)
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  };

  const handleSearchByCategory = async (category) => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/search/" + category);
      setPosts(res.data);
      console.log(res.data);

      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
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
              <Link to={`/posts/post/${post._id}`}>
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
