const HomePosts = () => {
  return (
    <div className="w-full flex mt-8 space-x-4">
      {/* left */}
      {/* h-full w-full: height full width full */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCOQ4hMuGG1yUZ643COTv_FHyo9HZSaa7Zmg&s"
          alt="Loading"
          className="h-full w-full object-cover"
        />
      </div>
      {/* right */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          10 Uses of Artificial Intelligence in Day to Day Life
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@VietHuynh</p>
          <div className="flex space-x-2">
            <p>16/06/2023</p>
            <p>16:45</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          Prominent examples of AI software used in everyday life include voice
          assistant, image...
        </p>
      </div>
    </div>
  );
};

export default HomePosts;
