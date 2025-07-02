import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 🧠 add this
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const headlines = [
  "AI‑Powered Heart Monitoring: Precision Meets Prevention",
  "Next‑Gen ML Predicts Early Signs of Heart Trouble",
  "Your Heart in 7 Seconds: Real‑Time ML Diagnosis",
];

const First: React.FC = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate(); // 🧠 initialize it

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      <main className="bg-blue-50 text-blue-900 min-h-[calc(100vh-128px)] px-6 py-20 flex flex-col items-center justify-center text-center">
        <motion.h1
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome to Chill‑Doctor
        </motion.h1>

        <div className="h-20 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              className="text-lg font-medium text-blue-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {headlines[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.button
          className="mt-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/home")} // 🚀 navigate on click
        >
          Get Started
        </motion.button>
      </main>

      <Footer />
    </>
  );
};

export default First;
