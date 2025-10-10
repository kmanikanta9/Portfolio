import React from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = ["About", "Projects", "Skills", "Contact"];
  const contactInfo = [
    "manimanikanta41150@gmail.com",
    "6366908441",
    "Andhra Pradesh, India",
  ];

  return (
    <footer className="bg-gray-900 text-white py-12 w-full overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Brand */}
          <div className="md:col-span-2">
            <motion.h2
              whileHover={{
                scale: 1.08,
                textShadow: "0 4px 32px rgba(99,102,241,0.18)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-4"
            >
              Manikanta Kondakayala
            </motion.h2>
            <p className="text-gray-400 mb-4 text-sm sm:text-base max-w-full md:max-w-md">
              Full Stack Developer and B.Tech ECE graduate passionate about building scalable web applications using the MERN stack and modern development practices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm sm:text-base">Quick Links</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              {quickLinks.map((link, idx) => (
                <li key={link}>
                  <motion.a
                    href={`#${link.toLowerCase()}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: idx * 0.08,
                      type: "spring",
                      stiffness: 120,
                      damping: 16,
                    }}
                    whileHover={{ x: 6, color: "#fff" }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-sm sm:text-base">Get in Touch</h3>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              {contactInfo.map((info, idx) => (
                <li key={idx}>{info}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">

            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left w-full sm:w-auto">
              © 2025 Manikanta Kondakayala. All rights reserved.
            </p>

            <motion.button
              onClick={scrollToTop}
              whileHover={{
                scale: 1.13,
                y: -3,
                boxShadow: "0 8px 32px rgba(59,130,246,0.10)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
            >
              <ArrowUp size={16} />
              <span>Back to Top</span>
            </motion.button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
