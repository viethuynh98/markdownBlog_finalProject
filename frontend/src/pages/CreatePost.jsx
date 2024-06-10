/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();

  const addCategory = () => {
    if (cat.trim() === "") return;
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      try {
        const imgUpload = await axios.post(URL + "/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.post(URL + "/api/posts/create", post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        background: "rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        style={{
          background: "rgba(0, 0, 0, 0.2)",
        }}
      >
        <Navbar />
      </div>

      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl mb-4 text-center">
          Create a post
        </h1>
        <form
          className="w-full flex flex-col space-y-4 md:space-y-8 mt-4 border border-gray-300 rounded-lg shadow-lg p-6"
          style={{
            background: "rgba(0, 0, 0, 0.7)",
          }}
        >
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 outline-none border border-gray-300 rounded-md focus:border-black"
          />
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="px-4 py-2 outline-none border rounded-md border-white text-white"
          />

          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                type="text"
                placeholder="Enter post category"
                className="px-4 py-2 outline-none border border-gray-300 rounded-md focus:border-black"
              />
              <div
                onClick={addCategory}
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer rounded-md hover:bg-gray-800"
              >
                Add
              </div>
            </div>

            <div className="flex flex-wrap px-4 mt-3 space-y-2">
              {cats?.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p>{c}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>

          <textarea
            onChange={(e) => setDesc(e.target.value)}
            name=""
            id=""
            rows={15}
            cols={30}
            placeholder="Enter post description"
            className="px-4 py-2 outline-none border border-gray-300 rounded-md focus:border-black"
          />
          <button
            onClick={handleCreate}
            className="bg-black w-full md:w-1/2 mx-auto text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Create
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;
