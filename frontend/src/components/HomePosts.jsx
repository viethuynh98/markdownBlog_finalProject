const HomePosts = () => {
  return (
    <div className="w-full flex mt-8 space-x-4">
      {/* left */}
      {/* h-full w-full: height full width full */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img
          src="https://www.google.com/imgres?q=artificial%20intelligence%20images&imgurl=https%3A%2F%2Fincubator.ucf.edu%2Fwp-content%2Fuploads%2F2023%2F07%2Fartificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1-1500x1000.jpg&imgrefurl=https%3A%2F%2Fincubator.ucf.edu%2Fwhat-is-artificial-intelligence-ai-and-why-people-should-learn-about-it%2F&docid=4jEnd_yUBiw-_M&tbnid=1ATi8GjkqFf3RM&vet=12ahUKEwi21b2k-cSGAxUenq8BHWwdDhIQM3oECHAQAA..i&w=1500&h=1000&hcb=2&ved=2ahUKEwi21b2k-cSGAxUenq8BHWwdDhIQM3oECHAQAA"
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
