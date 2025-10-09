import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { HiMail, HiPhone, HiLocationMarker, HiDownload } from "react-icons/hi";
import { SiLinkedin, SiGithub } from "react-icons/si";
import { portfolioData } from "../data/portfolioData";

const Contact = () => {
  const { personal, social } = portfolioData;
  const [statusmsg, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const resumeUrl = "/Manikanta_Kondakayala_Resume.pdf"; // ensure correct file path

  const handleResumeClick = (e) => {
    e.preventDefault();
    window.open(resumeUrl, "_blank", "noopener,noreferrer");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use your backend URL (can change easily for local/dev)
      const API_URL = "http://localhost:5000/contact/add"; // change to production URL in deployment
      const res = await axios.post(API_URL, formData);

      if (res.data.success) {
        setIsError(false);
        setStatusMessage("✅ Message sent successfully!");
        setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
      } else {
        setIsError(true);
        setStatusMessage("❌ Failed to send message.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setIsError(true);
      setStatusMessage("❌ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMessage(""), 5000);
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
    <section id="contact" className="py-16 px-4 md:px-8 lg:px-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, i) => (
                  <motion.a
                    key={i}
                    href={info.href}
                    className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{info.label}</p>
                      <p className="text-gray-900 dark:text-white font-medium">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Follow Me</h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 ${social.color} bg-gray-100 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Resume Download */}
            <motion.div
              className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h4 className="text-xl font-semibold mb-2">Resume</h4>
              <p className="mb-4 opacity-90">
                Get a copy of my detailed resume with all my experience and projects.
              </p>
              <motion.a
                download
                href={resumeUrl}
                onClick={handleResumeClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 text-sm px-3 py-2 rounded font-medium hover:bg-gray-100 transition-colors duration-300 inline-flex items-center gap-2"
              >
                <HiDownload className="w-5 h-5" />
                Download Resume
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-50 dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-300"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-300"
                />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-300"
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-300"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                required
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-300 resize-none"
              />
              <div className="flex flex-col md:flex-row items-center gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
                {statusmsg && (
                  <span
                    className={`text-sm px-4 py-2 rounded ${
                      isError
                        ? "text-red-700 bg-red-100 dark:bg-red-800 dark:text-red-200"
                        : "text-green-700 bg-green-100 dark:bg-green-800 dark:text-green-200"
                    }`}
                  >
                    {statusmsg}
                  </span>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
