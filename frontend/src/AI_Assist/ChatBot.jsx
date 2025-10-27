
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

// --- IMPORTANT ---
// 1. Get your Gemini API key from Google AI Studio: https://aistudio.google.com/app/apikey
// 2. Create a.env.local file in your project's root directory.
// 3. Add your API key to the.env.local file like this:
//    VITE_GEMINI_API_KEY="YOUR_API_KEY_HERE"
// Note: For Vite projects, environment variables must start with VITE_

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // This ref will hold the full conversation history for the API
  const chatHistory = useRef([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize the chatbot with a welcome message when it opens for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: 1,
        type: "bot",
        content:
          "Hi! I'm Manikanta's AI assistant. I can help you learn more about his projects, skills, and experience. What would you like to know?",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);

      // Initialize the API chat history
      chatHistory.current = [
        {
          role: "user",
          parts: [{ text: getSystemPrompt() }],
        },
        {
          role: "model",
          parts: [{ text: welcomeMessage.content }],
        },
      ];
    }
  }, [isOpen]);

  const getSystemPrompt = () => {
    // This detailed prompt grounds the AI, giving it context and a persona.
    return `You are Manikanta Kondakayala's friendly and professional AI assistant embedded on his portfolio website. Your goal is to answer questions about his skills, experience, and projects based ONLY on the information provided below. Keep your answers concise, helpful, and speak from a first-person perspective as if you are Manikanta's assistant (e.g., "Manikanta's experience includes..."). Do not make up information. If a question is outside the context, politely state that you can only answer questions about Manikanta's portfolio. give response beautifully without stars and point wise.

---

**Manikanta's Portfolio Information:**

**Projects:**
- **LuxuryHotel Platform:**  Online hotel booking and management system built with React, Node.js, Express, and MongoDB. Includes user authentication, room booking with real-time availability, secure payment integration, and an intuitive admin dashboard for managing bookings, users, and hotel data. Designed with responsive UI using Tailwind CSS for a seamless user experience across all devices.
- **StyleDen:**  Fashion e-commerce platform developed with React, Redux, and Firebase. Features product listing with filters and sorting, user authentication via Firebase, cart management, order tracking, and secure checkout. The application uses modern UI components with Tailwind CSS and ensures smooth navigation and real-time updates for an engaging shopping experience.
- **MemeHub:** Real-time meme sharing platform from a 48-hour hackathon using JavaScript, HTML5, CSS, Firebase, and Netlify. Features real-time interactions, user leaderboards, Firestore integration, and lazy loading.

**Skills & Technologies:**
- **Languages:** JavaScript (90%), Python (85%), HTML/CSS (90%)
- **Frontend:** React.js (90%), Tailwind CSS (85%), Vite (80%), Responsive Design (90%)
- **Backend:** Node.js (85%), Express.js (80%), MongoDB (85%), Firebase (80%)
- **Core CS:** Data Structures & Algorithms (80%) — 150+ LeetCode problems solved
- **Tools:** Git, GitHub, VS Code, Netlify, Vercel

**Experience & Philosophy:**
- B.Tech graduate in Electronics and Communication Engineering from Anantha Lakshmi Institute of Technology and Sciences
- Full Stack Web Development program at Masai School (hands-on experience with MERN stack)
- Frontend Development Intern at IIDT (May–July 2024) — • Gained hands-on experience building web applications using Python, HTML, CSS, and JavaScript.
  • Developed interactive and responsive user interfaces, strengthening frontend development skills.
- Strong problem-solving foundation with 200+ LeetCode problems solved and solid understanding of data structures and algorithms
- Xto10X Hackathon Edition #4 participant at Masai School


**Contact Information:**
- **Email:** manimanikanta41150@gmail.com
- **Phone:** 6366908441
- **Location:** Andhra Pradesh, India
- **Availability:** Currently seeking entry-level opportunities to contribute to innovative projects and grow as a developer.

**Soft Skills & Interests:**
- Problem Solving, Collaboration & Communication, Fast Learner
`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Update chat history for the API
    const updatedHistory = [
      ...chatHistory.current,
      { role: "user", parts: [{ text: userMessage.content }] },
    ];
    chatHistory.current = updatedHistory;

    try {
      const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      if (!GEMINI_API_KEY) {
        throw new Error(
          "API key is missing. Please add it to your.env.local file."
        );
      }

      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contents: updatedHistory }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data)
      const botResponseContent =
        data.candidates[0]?.content?.parts[0]?.text ||
        "Sorry, I couldn't get a response. Please try again.";

      const botMessage = {
        id: messages.length + 2,
        type: "bot",
        content: botResponseContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      // Add the bot's response to the history
      chatHistory.current = [
        ...chatHistory.current,
        { role: "model", parts: [{ text: botResponseContent }] },
      ];
    } catch (error) {
      console.error("Failed to fetch Gemini response:", error);
      const errorMessage = {
        id: messages.length + 2,
        type: "bot",
        content:
          "Sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Tell me about his projects",
    "What are his skills?",
    "How can I contact him?",
    "What's his development philosophy?",
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
          isOpen ? "hidden" : "flex"
        }`}
      >
        <MessageCircle size={24} />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"
        />
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-48px)] max-w-sm h-[600px] max-h-[calc(100vh-48px)] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Assistant</h3>
                    <p className="text-xs opacity-90">Ask me about Manikanta</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.type === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      }`}
                    >
                      {message.type === "user" ? (
                        <User size={16} />
                      ) : (
                        <Bot size={16} />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-2xl ${
                        message.type === "user"
                          ? "bg-blue-600 text-white rounded-br-md"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl rounded-bl-md">
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 1 && !isTyping && (
              <div className="px-4 pb-2 flex-shrink-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Quick questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputValue(question);
                        // Focus the input after setting the value
                        setTimeout(
                          () => document.getElementById("chat-input")?.focus(),
                          0
                        );
                      }}
                      className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="flex space-x-2">
                <input
                  id="chat-input"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about Kireeti..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
                <motion.button
                  onClick={handleSendMessage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!inputValue.trim() || isTyping}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
