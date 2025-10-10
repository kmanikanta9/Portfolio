import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { HiMail, HiPhone, HiLocationMarker, HiDownload } from "react-icons/hi";
import { SiLinkedin, SiGithub } from "react-icons/si";
import { portfolioData } from "../data/portfolioData";

const Contact = () => {
  const { personal, social } = portfolioData;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [statusMsg, setStatusMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const resumeUrl = "/Manikanta_Kondakayala_Resume.pdf";

  // Resume download handler
  const handleResumeClick = () => {
    const newTab = window.open(resumeUrl, "_blank", "noopener,noreferrer");
    
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Manikanta_Kondakayala_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Form change handler
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API_URL = "https://portfolio-backend-kappa-two.vercel.app/contact/add";
      const res = await axios.post(API_URL, formData);

      if (res.data.success) {
        setIsError(false);
        setStatusMsg("✅ Message sent successfully!");
        setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
      } else {
        setIsError(true);
        setStatusMsg("❌ Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setIsError(true);
      setStatusMsg("❌ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMsg(""), 5000);
    }
  };

  const contactInfo = [
    { icon: HiMail, label: "Email", value: personal.email, href: `mailto:${personal.email}` },
    { icon: HiPhone, label: "Phone", value: personal.phone, href: `tel:${personal.phone}` },
    { icon: HiLocationMarker, label: "Location", value: personal.location, href: "#" },
  ];

  const socialLinks = [
    { icon: SiLinkedin, label: "LinkedIn", href: social.linkedin, color: "text-blue-600" },
    { icon: SiGithub, label: "GitHub", href: social.github, color: "text-gray-900 dark:text-white" },
    { icon: HiMail, label: "Email", href: `mailto:${social.email}`, color: "text-red-600" },
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12">

        {/* Left: Contact Info & Resume */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col gap-8"
        >
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h3>
            <div className="flex flex-col gap-4">
              {contactInfo.map((info, i) => (
                <motion.a
                  key={i}
                  href={info.href}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-shadow duration-300 shadow-sm"
                >
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white">
                    <info.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{info.label}</p>
                    <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Follow Me</h4>
            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 sm:w-12 sm:h-12 ${social.color} bg-gray-100 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 rounded-full flex items-center justify-center hover:shadow-lg transition-transform duration-300 hover:-translate-y-1`}
                >
                  <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Resume */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 p-5 sm:p-6 rounded-xl shadow-md text-white"
          >
            <h4 className="text-lg sm:text-xl font-semibold mb-2">Resume</h4>
            <p className="text-sm sm:text-base mb-4 opacity-90">
              Get a copy of my detailed resume with all my experience and projects.
            </p>
            <motion.button
              onClick={handleResumeClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded bg-white text-blue-600 font-medium hover:bg-gray-100 transition-colors duration-300"
            >
              <HiDownload className="w-4 sm:w-5 h-4 sm:h-5" />
              Download Resume
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gray-50 dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm sm:text-base"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm sm:text-base"
              />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm sm:text-base"
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm sm:text-base"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              required
              rows="5"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm sm:text-base resize-none"
            />
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 px-6 py-2 sm:py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 w-full sm:w-auto text-sm sm:text-base"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
              {statusMsg && (
                <span
                  className={`text-xs sm:text-sm px-3 py-2 rounded w-full sm:w-auto text-center ${
                    isError
                      ? "text-red-700 bg-red-100 dark:bg-red-800 dark:text-red-200"
                      : "text-green-700 bg-green-100 dark:bg-green-800 dark:text-green-200"
                  }`}
                >
                  {statusMsg}
                </span>
              )}
            </div>
          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
