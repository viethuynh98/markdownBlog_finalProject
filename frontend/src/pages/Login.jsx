import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        URL + "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url('https://thinkzone.vn/uploads/2022_01/blogging-1641375905.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="flex items-center justify-center px-6 md:px-[200px] py-4">
          <h1 className="text-lg md:text-xl font-extrabold items-center">
            {/* link to the homepage */}
            <Link to="/">VTB BLOG</Link>
          </h1>
        </div>
        <div className="w-full flex justify-center items-center h-[80vh]">
          <div
            className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%] p-8 border-2 border-gray-300 rounded-lg shadow-lg relative"
            style={{
              background: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <h1 className="text-xl font-bold text-left">
              Log in to your account
            </h1>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black outline-0"
              type="text"
              placeholder="Enter your email"
              name=""
              id=""
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black outline-0"
              type="password"
              placeholder="Enter your password"
              name=""
              id=""
            />
            <button
              onClick={handleLogin}
              className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black"
            >
              Log in
            </button>
            {error && (
              <h3 className="text-red-500 text-sm">Something went wrong</h3>
            )}
            <div className="flex justify-center items-center space-x-3">
              <p>New here?</p>
              <p className="text-gray-800 hover:text-red-700">
                <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
