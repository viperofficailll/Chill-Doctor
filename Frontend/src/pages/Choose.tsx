import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Choose: React.FC = () => {
  const navigate = useNavigate();

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.15, type: "spring", stiffness: 100 },
    }),
    hover: { scale: 1.06, boxShadow: "0 8px 20px rgba(59, 130, 246, 0.5)" },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <Navbar />

      <main
        className="min-h-[calc(100vh-128px)] bg-blue-50 flex flex-col items-center justify-center px-6 py-20 text-center text-blue-900"
        role="main"
        aria-label="Service selection"
      >
        <motion.h1
          className="text-3xl md:text-4xl font-extrabold mb-12 select-none"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Our Services
        </motion.h1>

        <div className="flex flex-col sm:flex-row gap-8">
          {[
            { label: "Diabetes", path: "/diabetes" },
            { label: "Heart Attack", path: "/heartattack" },
          ].map(({ label, path }, i) => (
            <motion.button
              key={label}
              aria-label={`Navigate to ${label} service`}
              onClick={() => navigate(path)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
              variants={buttonVariants}
              custom={i}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              tabIndex={0}
            >
              {label}
            </motion.button>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Choose;
