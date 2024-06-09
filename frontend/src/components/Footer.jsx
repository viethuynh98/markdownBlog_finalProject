const Footer = () => {
  return (
    <>
      <div className="mt-8 w-full bg-black px-8 md:px-[200px] flex flex-col md:flex-row items-start md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4 py-8 text-sm md:text-md">
        <div className="flex flex-col text-white">
          <p>Featured Blogs</p>
          <p>Most viewed</p>
          <p>Readers Choice</p>
        </div>

        <div className="flex flex-col text-white">
          <p>Forum</p>
          <p>Support</p>
          <p>Recent Posts</p>
        </div>

        <div className="flex flex-col text-white">
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
          <p>Terms of Services</p>
        </div>
      </div>
      <p className="py-2 pb-4 text-center text-white bg-black text-sm">
        All right reserved @Blog Market 2024
      </p>
    </>
  );
};

export default Footer;
