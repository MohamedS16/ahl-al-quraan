const Landing = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-landing-bg bg-center bg-cover bg-fixed">
      {/* Mobile overlay */}
      <div className="md:hidden absolute inset-0 bg-white/40" />
      
      <div className="relative min-h-screen flex items-center justify-start">
        <div className="w-full md:w-[55%] flex flex-col items-center p-4">
          <h1 className="text-4xl md:text-[70px] font-urdu pb-8 md:pb-12 text-center text-blue-500">
            وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا
          </h1>
          <button className="bg-blue-500 text-white px-6 md:px-8 py-3 md:py-4 transition-all duration-300 border-2 border-blue-500 hover:bg-white hover:text-blue-500 rounded-md text-lg font-medium">
            تصفح الموقع
          </button>
        </div>
      </div>
    </section>
  );
};

export default Landing;