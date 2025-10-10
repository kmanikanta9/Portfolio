import React from "react";
import { motion } from "framer-motion";
import profileImg from "../assets/profile_photo.jpg";
import { HiDownload } from "react-icons/hi";

export default function Header() {
  const resumeUrl = "/Manikanta-Kondakayala-Resume.pdf";

  const handleResumeClick = () => {
    const newTab = window.open(resumeUrl, "_blank", "noopener,noreferrer");

    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Manikanta-Kondakayala-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (newTab) newTab.focus();
  };

  return (
    <section
      id="home"
      className="w-full max-w-screen-lg mx-auto min-h-screen flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 overflow-hidden pt-20 md:pt-24"
      // Added pt-20 to offset the fixed navbar height
    >
      {/* Profile Image */}
      <motion.img
        src={profileImg}
        alt="Manikanta Kondakayala"
        className="rounded-full border-[0.5px] border-transparent bg-gradient-to-r from-cyan-300 to-blue-300 p-1 w-28 sm:w-32 md:w-36 lg:w-40 shadow-lg shadow-blue-100 dark:shadow-blue-400"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Heading */}
      <motion.h1
        className="flex flex-wrap items-center justify-center gap-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 dark:text-white text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Hi! I'm{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
          Manikanta Kondakayala
        </span>
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
          alt="wave"
          className="w-5 sm:w-6 md:w-7 mb-1"
          animate={{ rotate: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 2, ease: "easeInOut" }}
        />
      </motion.h1>

      {/* Description */}
      <motion.p
        className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        I’m a passionate web developer skilled in{" "}
        <span className="font-semibold text-cyan-600 dark:text-blue-400">
          JavaScript, React, Node.js, and MongoDB
        </span>
        . I build scalable, real-world applications and love solving problems that make an impact.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row items-center gap-4 mt-6 sm:mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {/* Contact Me Button */}
        <a
          href="#contact"
          className="px-8 sm:px-10 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center gap-2 shadow-md hover:scale-105 transition-transform text-sm sm:text-base"
        >
          Contact Me
          <img
            src="https://cdn-icons-png.flaticon.com/512/545/545682.png"
            alt="right arrow"
            className="w-4 sm:w-5"
          />
        </a>

        {/* Resume Button */}
        <motion.button
          onClick={handleResumeClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center gap-2 shadow-md text-sm sm:text-base"
        >
          <HiDownload className="w-5 h-5" />
          Resume
        </motion.button>
      </motion.div>
    </section>
  );
}
