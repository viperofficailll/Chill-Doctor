import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact: React.FC = () => {
  return (
    <>
      <Navbar />

      <main className="relative flex flex-col items-center justify-center min-h-[calc(100vh-128px)] p-8 bg-blue-50 text-blue-900">
        {/* Background logo */}
        <img
          src="./logo.jpg" // adjust path as needed
          alt="Logo background"
          className="pointer-events-none absolute inset-0 mx-auto my-auto opacity-10 max-w-xs max-h-xs"
          style={{ filter: "grayscale(100%)" }}
        />

        {/* Content wrapper */}
        <div className="relative max-w-3xl bg-white bg-opacity-90 rounded-lg p-8 shadow-lg z-10 text-center">
          <h1 className="text-3xl font-bold mb-6">Contact & About Me</h1>
          <p className="text-lg leading-relaxed mb-4">
            Hello! I am Sandesh Pokhrel, a passionate developer and machine
            learning enthusiast dedicated to creating intuitive and impactful
            applications. With a strong background in both frontend and backend
            development, I specialize in building user-friendly web applications
            with elegant designs and seamless functionality. I love leveraging
            modern technologies like React, Tailwind CSS, and AI-driven
            solutions to solve real-world problems and improve lives. Outside of
            coding, I enjoy exploring new tech trends, collaborating with
            creative minds, and continuously learning to enhance my craft.
          </p>
          <p className="text-lg">
            For contacting purposes, please visit{" "}
            <a
              href="https://pokhrelsandesh.com.np"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 underline font-semibold"
            >
              Pokhrelsandesh.com.np
            </a>
            .
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Contact;
