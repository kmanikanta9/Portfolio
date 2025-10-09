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
      className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 via-white to-indigo-50 px-4 sm:px-10 lg:px-20"
    >
      {/* Background shapes */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-[28rem] h-[28rem] bg-pink-200 rounded-full opacity-20 blur-3xl"></div>

      <div className="relative max-w-7xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16 py-10">
        
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Hi, I'm <span className="text-indigo-600">Manikanta Kondakayala</span>
          </h1>

          <h2 className="text-2xl lg:text-3xl font-semibold text-indigo-600 mb-6 h-10">
            {text}
            <Cursor cursorColor="#4f46e5" />
          </h2>

          <p className="text-gray-700 text-base lg:text-lg leading-relaxed mb-5 max-w-xl">
            I’m a developer who loves creating responsive, user-friendly web
            applications that blend functionality with elegant design. My goal
            is to build clean, efficient, and scalable code that delivers smooth
            user experiences.
          </p>

          <p className="text-gray-700 text-base lg:text-lg leading-relaxed mb-8 max-w-xl">
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
            , while solving 240+ LeetCode problems to sharpen my
            problem-solving and algorithmic thinking.
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

        {/* Right: Circular Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex justify-center md:justify-end"
        >
          <div className="relative w-64 h-80 sm:w-72 sm:h-88 md:w-80 md:h-96 lg:w-96 lg:h-[28rem] rounded-full overflow-hidden border-4 border-white shadow-2xl max-h-[32rem]">
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
