/* eslint-disable react/prop-types */
import { IF } from "../url";

const HomePosts = ({ post }) => {
  return (
    <div className="w-full flex mt-8 space-x-4 border-2 border-gray-300 p-4 shadow-lg shadow-gray-500/50 rounded-lg">
      {/* left */}
      {/* h-full w-full: height full width full */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img
          src={IF + post.photo}
          alt="Loading"
          className="h-full w-full object-cover"
        />
      </div>
      {/* right */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          {post.desc.slice(0, 200) + "..."}{" "}
          <span className="text-red-500 hover:text-red-700 cursor-pointer">
            Read more
          </span>
        </p>
      </div>
    </div>
  );
};

export default HomePosts;
