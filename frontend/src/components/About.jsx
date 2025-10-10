import React from "react";
import profilePic from "../assets/profile_photo.jpg";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const About = () => {
  const [text] = useTypewriter({
    words: ["Full Stack Developer", "Frontend Developer", "Backend Developer"],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <section
      id="about"
      className="relative pt-24 w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 via-white to-indigo-50 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background Shapes */}
      <div className="absolute -top-20 -left-20 w-64 sm:w-72 md:w-80 h-64 sm:h-72 md:h-80 bg-indigo-200 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-64 sm:w-72 md:w-80 h-64 sm:h-72 md:h-80 bg-pink-200 rounded-full opacity-20 blur-3xl pointer-events-none"></div>

      <div className="relative w-full max-w-6xl flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-8 md:gap-16 py-10">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            Hi, I'm <span className="text-indigo-600">Manikanta Kondakayala</span>
          </h1>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-indigo-600 mb-4 sm:mb-6 min-h-[2.5rem] sm:min-h-[3rem]">
            {text}
            <Cursor cursorColor="#4f46e5" />
          </h2>

          <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-5 max-w-md md:max-w-lg">
            I’m a developer passionate about creating responsive, user-friendly web applications that blend functionality with elegant design. My goal is to write clean, efficient, and scalable code for smooth user experiences.
          </p>

          <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 max-w-md md:max-w-lg">
            Skilled in{" "}
            <span className="font-semibold">
              JavaScript, React.js, Node.js, Express.js, MongoDB, and TypeScript
            </span>
            . I’ve built projects like{" "}
            <a
              href="https://styleden.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              StyleDen
            </a>{" "}
            and{" "}
            <a
              href="https://silly-melba-9a3820.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              Meme Hub
            </a>
            , while solving 240+ LeetCode problems to strengthen problem-solving and algorithmic skills.
          </p>

          <a
            href="https://www.linkedin.com/in/manikantak9/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-indigo-700 shadow-md transition-all"
          >
            Let’s Connect
          </a>
        </motion.div>

        {/* Right: Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex justify-center md:justify-end"
        >
          <div className="relative w-48 h-48 sm:w-56 sm:h-64 md:w-72 md:h-80 lg:w-80 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl flex-shrink-0">
            <img
              src={profilePic}
              alt="Manikanta Kondakayala"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
