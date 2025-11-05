const LoadingScreen = ({ text = "Loading..." }) => {
  return (
    <section className="py-20 flex flex-col justify-center items-center opacity-90">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin mb-4"></div>
      <h2 className="text-lg text-gray-700 tracking-wide">{text}</h2>
    </section>
  );
};

export default LoadingScreen;
