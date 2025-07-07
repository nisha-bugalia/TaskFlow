import React, { useRef, useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const screenshots = [
  "/ss_home.png",
  "/ss_board_view.png",
  "/ss_task_view.png",
  "/ss_messages.png",
  "/ss_charts.png",
];

const ScreenshotsCarousel = () => {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);

  const scrollToIndex = (i) => {
    const container = containerRef.current;
    if (container) {
      const slideWidth = container.offsetWidth;
      container.scrollTo({ left: slideWidth * i, behavior: "smooth" });
    }
  };

  const nextSlide = () => {
    const newIndex = (index + 1) % screenshots.length;
    setIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (index - 1 + screenshots.length) % screenshots.length;
    setIndex(newIndex);
    scrollToIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [index]);

  useEffect(() => {
    scrollToIndex(index);
  }, [index]);

  return (
    <section className="bg-white dark:bg-zinc-900 py-16 px-4">
      {/* <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
        See ProFlow in Action
      </h2> */}

      <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
        <div
          ref={containerRef}
          className="flex transition-transform duration-500 no-scrollbar overflow-x-hidden w-full"
        >
          {screenshots.map((src, i) => (
            <div
            key={i}
            className="flex-shrink-0 w-full flex justify-center"
            style={{ flexBasis: "100%" }}
          >
            <div className="w-[70%] max-w-4xl bg-zinc-100 dark:bg-zinc-800 rounded-xl shadow-xl overflow-hidden border dark:border-zinc-700">
              {/* Fake browser bar */}
              <div className="bg-zinc-200 dark:bg-zinc-700 h-10 flex items-center px-4 space-x-2">
                <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
              </div>
              <img
                src={src}
                alt={`Screenshot ${i + 1}`}
                className="w-full h-auto max-h-[450px] object-contain"
              />
            </div>
          </div>
          
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow p-2 rounded-full hover:scale-110 transition"
        >
          <FiChevronLeft className="text-gray-700 dark:text-white" size={24} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow p-2 rounded-full hover:scale-110 transition"
        >
          <FiChevronRight className="text-gray-700 dark:text-white" size={24} />
        </button>
      </div>
    </section>
  );
};

export default ScreenshotsCarousel;
