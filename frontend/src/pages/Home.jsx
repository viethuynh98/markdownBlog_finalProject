/* eslint-disable react-hooks/exhaustive-deps */
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
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts" + search);
      setPosts(res.data);
      if (res.data.length == 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      const categories = res.data.flatMap((post) => post.categories);
      const uniqueCategories = [...new Set(categories)];
      const sortedCategories = uniqueCategories.sort();
      setAllCategories(sortedCategories);
      setFilteredCategories(sortedCategories);
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
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      const allCategories = res.data.flatMap((post) => post.categories);
      const uniqueCategories = [...new Set(allCategories)];
      const sortedCategories = uniqueCategories.sort();
      setFilteredCategories(sortedCategories);
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

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <div
          className="container md:sticky md:top-12 mx-auto md:w-1/5 border-2 border-gray-300 p-4 shadow-lg shadow-gray-500/50 rounded-lg md:flex-col md:mr-4"
          style={{
            backgroundImage: `url('https://wallpapers.com/images/hd/white-hd-1920-x-1080-background-qtcofj6p2lhwo3sb.jpg')`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        >
          <div className="md:sticky md:top-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">CATEGORIES</h3>
              <button
                onClick={handleClearFilters}
                className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filteredCategories.map((category, index) => (
                <button
                  onClick={() => handleSearchByCategory(category)}
                  key={index}
                  className="bg-gray-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-gray-300 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div
          className="flex-1"
          style={{
            backgroundImage: `url('https://wallpapers.com/images/hd/white-hd-1920-x-1080-background-qtcofj6p2lhwo3sb.jpg')`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        >
          <div className="px-8 mt-4 md:mt-0 md:px-[100px] min-h-[80vh] border-2 border-gray-300 p-4 shadow-lg shadow-gray-500/50 rounded-lg">
            <h3 className="text-center font-bold py-2">ARTICLES</h3>
            {loader ? (
              <div className="h-[40vh] flex justify-center items-center">
                <Loader />
              </div>
            ) : !noResults ? (
              posts.map((post, index) => (
                <Link to={`/posts/post/${post._id}`} key={index}>
                  <HomePosts post={post} />
                </Link>
              ))
            ) : (
              <h3 className="text-center font-bold py-8">NO POSTS AVAILABLE</h3>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
