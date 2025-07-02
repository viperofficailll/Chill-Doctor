import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const teamMembers = [
  { name: "Sandesh Pokhrel", url: "https://pokhrelsandesh.com.np/" },
  { name: "Samip Sangroula", url: "https://www.facebook.com/samip.sangroula" },
  { name: "Swopnil Regmi", url: "https://www.facebook.com/swopnil.regmi.9" },
  {
    name: "Samundra Subedi",
    url: "https://www.facebook.com/sammuundra.subedi",
  },
];

const About: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-xl mx-auto p-6 min-h-[calc(100vh-128px)] flex flex-col justify-center text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-900">About Us</h1>
        <p className="mb-6 text-gray-700">
          This project is proudly made by the team{" "}
          <span className="font-semibold text-blue-700">ChillMaCoding</span>.
        </p>
        <h2 className="text-xl font-semibold mb-3 text-blue-800">Our Team</h2>
        <ul className="space-y-4">
          {teamMembers.map(({ name, url }) => (
            <li key={name}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 underline cursor-pointer transition text-xl font-bold"
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
};

export default About;
