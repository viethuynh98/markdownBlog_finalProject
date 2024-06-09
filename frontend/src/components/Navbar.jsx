import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa6";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  console.log(prompt);

  const ShowMenu = () => {
    setMenu(!menu);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(prompt ? `?search=${prompt}` : "/");
    }
  };

  const { user } = useContext(UserContext);
  // console.log(user);
  return (
    // div for all
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg md:text-xl font-extrabold">
        {/* link to the homepage */}
        <Link to="/">Blog Market</Link>
      </h1>

      {/* div for search */}
      <div className="flex justify-center items-center space-x-0">
        <p
          onClick={() => navigate(prompt ? `?search=${prompt}` : "/")}
          className="cursor-pointer"
        >
          <BsSearch />
        </p>
        <input
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          className="outline-none px-3"
          placeholder="Search a post"
          type="text"
        />
      </div>

      {/* div for login and register */}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <h3>
            <Link to="/write">Write</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}
        {user ? (
          <div onClick={ShowMenu}>
            <p className="cursor-pointer relative">
              <FaBars />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>
      <div onClick={ShowMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative">
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
