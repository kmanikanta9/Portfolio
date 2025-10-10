import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const skillCategories = [
    {
      title: "Languages & Core",
      skills: [
        { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "Data Structures & Algorithms", logo: "https://img.icons8.com/ios-filled/50/000000/data-configuration.png" },
        { name: "HTML/CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      ],
    },
    {
      title: "Frontend Development",
      skills: [
        { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Tailwind CSS", logo: "https://img.icons8.com/color/48/000000/tailwindcss.png" },
        { name: "Vite", logo: "https://vitejs.dev/logo.svg" },
        { name: "Responsive Design", logo: "https://img.icons8.com/ios-filled/50/monitor--v1.png" },
      ],
    },
    {
      title: "Backend & Database",
      skills: [
        { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 14 } },
  };

  return (
    <section id="skills" className="py-16 bg-white dark:bg-gray-900 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Heading */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Skills & Expertise
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-3 rounded-full"></div>
          <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            A curated set of skills I leverage to build modern web applications with efficiency, scalability, and best practices.
          </motion.p>
        </motion.div>

        {/* Horizontal Skills Grid - Centered */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center items-start gap-8"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="flex-none w-72 bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-300 dark:border-gray-600 shadow-md flex flex-col"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">{category.title}</h3>
              
              {/* Skills aligned to left */}
              <div className="flex flex-col gap-2">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.03 }}
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-300 cursor-pointer"
                    title={skill.name}
                  >
                    <img
                      src={skill.logo}
                      alt={skill.name}
                      className="w-8 h-8 object-contain rounded p-1 border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 flex-shrink-0"
                      loading="lazy"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Experience & Certifications */}
        <motion.div
          variants={itemVariants}
          className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-300 dark:border-gray-600 shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Experience & Certifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Education & Training</h4>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                <li>• B.Tech ECE - Anantha Lakshmi Institute of Technology and Sciences</li>
                <li>• Full Stack Development - Masai School</li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Achievements</h4>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                <li>• 240+ LeetCode Problems Solved</li>
                <li>• Hackathon Participant - Xto10X Edition #4</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
