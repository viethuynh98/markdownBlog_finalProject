import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";
import { URL } from "../url";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/register", {
        username,
        email,
        password,
      });
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setError(false);
      navigate("/login");

      console.log(res);
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
        <div className="absolute inset-0 bg-black bg-opacity-30 "></div>
        <div className="flex items-center justify-center px-6 md:px-[200px]">
          <h1 className="text-lg md:text-xl font-extrabold items-center z-10 hover:text-white mt-7" style={{fontSize: 40}}>
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
            <h1 className="text-xl font-bold text-left">Create an account</h1>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black outline-0"
              type="text"
              placeholder="Enter your username"
              name=""
              id=""
            />
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
              onClick={handleRegister}
              className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black"
            >
              Register
            </button>
            {error && (
              <h3 className="text-red-500 text-sm">Something went wrong</h3>
            )}
            <div className="flex justify-center items-center space-x-3">
              <p>Already have an account?</p>
              <p className="text-gray-800 hover:text-red-700">
                <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Register;
