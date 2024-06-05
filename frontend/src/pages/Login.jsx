const Login = () => {
  return (
    <div className="w-full flex justify-center items-center h-[700px]">
      <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
        <h1>Log in to your account</h1>
        <input className="" type="text" placeholder="Enter your email" name="" id="" />
        <input className="" type="text" placeholder="Enter your password" name="" id="" />
        <button className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black">Log in</button>
      </div>
    </div>
  );
};

export default Login;
