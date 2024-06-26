import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";

const CreatePost = () => {
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);

  const addCategory = () => {
    if (cat.trim() === "") return; // Không thêm nếu input trống
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1); // Xóa phần tử tại index i
    setCats(updatedCats);
  };

  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl">Create a post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <input
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 outline-1"
          />
          <input type="file" className="px-4" />

          {/* category */}
          <div className="flex flex-col">
            {/* input */}
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                type="text"
                placeholder="Enter post category"
                className="px-4 py-2 outline-1"
              />
              <div
                onClick={addCategory}
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
              >
                Add
              </div>
            </div>

            {/* categories display */}
            <div className="flex flex-wrap px-4 mt-3 space-y-2">
              {cats?.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p>{c}</p>
                  <p
                    // *** NOTE
                    // nếu không sử dụng arrow function (gọi trực tiếp), hàm deleteCategory sẽ được gọi ngay lập tức khi component được render
                    // nếu dùng arrow function, ta truyền 1 callback function vào hàm onClick, chỉ gọi khi sự kiện onClick diễn ra
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
            name=""
            id=""
            rows={15}
            cols={30}
            placeholder="Enter post description"
            className="px-4 py-2 outline-none"
          />
          <button className="bg-black w-4/12 md:w-1/5 mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg">
            Create
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;