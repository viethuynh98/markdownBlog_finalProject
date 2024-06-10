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
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

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
      const categories = res.data.flatMap((post) => post.categories);
      const uniqueCategories = [...new Set(categories)];
      setAllCategories(uniqueCategories);
      setFilteredCategories(uniqueCategories);
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

      const allCategories = res.data.flatMap((post) => post.categories);
      const uniqueCategories = [...new Set(allCategories)];
      setFilteredCategories(uniqueCategories);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  const handleClearFilters = () => {
    setFilteredCategories(allCategories);
    fetchPosts();
  };

  // call
  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    // md for medium screen
    <>
      <Navbar />
      {/* Categories */}
      <div className="container mx-auto md:w-2/3 border-2 border-gray-300 p-2 shadow-lg shadow-gray-500/50 rounded-lg px-4">
        <div className="flex items-center">
          <h3 className="font-bold mr-1">CATEGORIES</h3>
          <button
            onClick={handleClearFilters}
            className="bg-red-500 text-white px-2 rounded-lg shadow-lg hover:bg-red-600"
          >
            Clear
          </button>
        </div>
        <div className="relative mt-1">
          <div className="overflow-x-auto whitespace-nowrap">
            <div className="flex flex-row gap-2">
              {filteredCategories.map((category, index) => (
                <p
                  onClick={() => handleSearchByCategory(category)}
                  key={index}
                  className="border-2 border-gray-300 p-2 shadow-lg shadow-gray-500/50 rounded-lg cursor-pointer"
                >
                  {category}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <hr className="my-8 border-gray-300" /> {/* Đường ngang ngăn cách */}
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        <h3 className="text-center font-bold mb-4">ARTICLES</h3>
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <Link to={`/posts/post/${post._id}`} key={post._id}>
              <HomePosts post={post} />
            </Link>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">NO POSTS AVAILABLE</h3>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
