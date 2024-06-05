import HomePosts from "../components/HomePosts";

const Home = () => {
  return (
    // md for medium screen
    <div className="px-8 md:px-[200px]">
      <HomePosts />
      <HomePosts />
      <HomePosts />
      <HomePosts />
      <HomePosts />
    </div>
  );
};

export default Home;
