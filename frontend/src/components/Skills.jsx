import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  // Skill logos (replace with your own logo URLs or import SVGs as needed)
  const skillCategories = [
    {
      title: "Languages & Core",
      skills: [
        { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Data Structures & Algorithms", logo: "https://img.icons8.com/ios-filled/50/000000/data-configuration.png" },
        { name: "HTML/CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" }
      ]
    },
    {
      title: "Frontend Development",
      skills: [
        { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Tailwind CSS", logo: "https://img.icons8.com/color/48/000000/tailwindcss.png" },
        { name: "Vite", logo: "https://vitejs.dev/logo.svg" },
        { name: "Responsive Design", logo: "https://img.icons8.com/ios-filled/50/monitor--v1.png" }
      ]
    },
    {
      title: "Backend & Database",
      skills: [
        { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" }
      ]
    }
  ];

  // Enhanced container and item variants for professional animation
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 18,
        staggerChildren: 0.16,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 16,
        mass: 0.7,
      },
    },
  };

  const skillBarVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
        delay: 0.25,
      },
    }),
  };

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Skills & Expertise
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A comprehensive toolkit for building modern web applications. 
              I focus on mastering tools that enable rapid, high-quality development.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                whileHover={{ scale: 1.025, boxShadow: "0 8px 32px rgba(59,130,246,0.08)" }}
                transition={{ type: "spring", stiffness: 180, damping: 16 }}
                className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-8"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-1">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="flex items-center space-x-4">
                      <img
                        src={skill.logo}
                        alt={skill.name + ' logo'}
                        className="w-10 h-10 object-contain rounded shadow-sm bg-white dark:bg-gray-800 p-1 border border-gray-200 dark:border-gray-700"
                        loading="lazy"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Technical Philosophy */}
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Experience & Certifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Education & Training</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• B.Tech ECE - Anantha Lakshmi Institute of Technology and Sciences</li>
                  <li>• Full Stack Development - Masai School</li>
                </ul>
              </div>
              <div>
                <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Achievements</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• 240+ LeetCode Problems Solved</li>
                  <li>• Hackathon Participant - Xto10X Edition #4</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;