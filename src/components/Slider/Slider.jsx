import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    title: "Find Your Dream Home",
    description:
      "Discover apartments, houses, and villas that fit your lifestyle.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=1200&q=80",
    title: "Buy or Rent with Ease",
    description: "Thousands of verified properties ready for you to explore.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    title: "Post Your Property",
    description: "Easily list your home for sale or rent in just a few clicks.",
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden rounded-xl shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {slides[current].title}
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
              {slides[current].description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
