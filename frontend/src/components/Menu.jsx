import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Menu = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="bg-black w-[150px] flex flex-col items-start absolute top-10 md:top-11 right-6 md:right-16 rounded-md p-3 space-y-4">
      {!user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          Login
        </h3>
      )}
      {!user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          Register
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          Profile
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          Write
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          My Blog
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          Logout
        </h3>
      )}
    </div>
  );
};

export default Menu;
