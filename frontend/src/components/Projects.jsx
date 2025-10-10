import React from "react";
import { motion } from "framer-motion";
import luxuryhotel from "../assets/Luxuryhotel_image.png";
import styleden from "../assets/Styleden_image.png";
import gardenpro from "../assets/Gardenpro_image.png";
const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "LUXURYHOTEL - Hotel Booking Platform",
      description:
        "A full-featured hotel booking app with secure authentication, hotel search & filtering, booking management, and an admin panel. Optimized for all devices with a smooth and responsive UI.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      liveLink: "https://luxuryhotel-eosin.vercel.app/",
      codeLink: "https://github.com/kmanikanta9/Hotel_Booking",
      accentColor: "violet",
      image: luxuryhotel,
    },
    {
      id: 2,
      title: "StyleDen – E-Commerce Website",
      description:
        "An e-commerce platform with role-based authentication. Customers can browse, add to cart, and checkout. Vendors manage products and inventory using Firebase and Firestore.",
      tech: ["HTML", "CSS", "JavaScript", "Firebase", "Firestore"],
      liveLink: "https://styleden.netlify.app/",
      codeLink: "https://github.com/kmanikanta9/Ecommerce",
      accentColor: "blue",
      image: styleden,
    },
    {
      id: 3,
      title: "GardenPro – Gardening Services Platform",
      description:
        "A comprehensive gardening management platform that allows users to track watering schedules, monitor plant health, and manage garden tasks efficiently. Designed with a user-friendly interface and seamless navigation for an optimal experience across devices.",
      tech: ["HTML", "CSS", "JavaScript", "React", "Netlify"],
      liveLink: "https://gardenproo.netlify.app/",
      codeLink: "https://github.com/kmanikanta9/home-garden/tree/main",
      accentColor: "emerald",
      image: gardenpro,
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      emerald: {
        border: "border-t-emerald-500",
        text: "text-emerald-600",
        button: "bg-emerald-500 hover:bg-emerald-600",
      },
      blue: {
        border: "border-t-blue-500",
        text: "text-blue-600",
        button: "bg-blue-500 hover:bg-blue-600",
      },
      violet: {
        border: "border-t-violet-500",
        text: "text-violet-600",
        button: "bg-violet-500 hover:bg-violet-600",
      },
    };
    return colors[color] || colors.blue;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Featured Projects
          </h1>
          <div className="w-16 h-1 bg-gray-300 mx-auto mb-5"></div>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            A selection of projects demonstrating my expertise in building
            intuitive, responsive, and scalable web applications across both
            front-end and full-stack development.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
        >
          {projects.map((project) => {
            const color = getColorClasses(project.accentColor);
            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-t-4 ${color.border} flex flex-col max-w-sm w-full`}
              >
                {/* Image */}
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-44 object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Details */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className={`text-xl font-semibold mb-2 ${color.text}`}>
                    {project.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-auto">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href={project.codeLink}
                      className={`px-4 py-1.5 ${color.button} text-white text-sm rounded-md font-medium shadow-sm`}
                    >
                      GitHub
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 bg-gray-800 text-white text-sm rounded-md font-medium hover:bg-gray-700 shadow-sm"
                    >
                      Live Demo
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 border-t border-gray-200 pt-6"
        >
          <p className="text-gray-600 text-sm md:text-base">
            Interested in collaborating?{" "}
            <motion.a
              href="#contact"
              whileHover={{ color: "#4F46E5", x: 2 }}
              className="text-gray-900 font-medium underline hover:text-indigo-600"
            >
              Let’s connect
            </motion.a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
