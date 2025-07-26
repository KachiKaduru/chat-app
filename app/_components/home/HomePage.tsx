"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiMessageSquare, FiUsers, FiLock, FiSmartphone } from "react-icons/fi";
import { AnimatedBackground } from "./AnimatedBackground";

export default function HomePage() {
  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-[#1f1c2c] to-[#3a3646] overflow-hidden">
      {/* Animated background elements */}
      <AnimatedBackground />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-center p-6 pt-20 lg:p-12 text-white max-w-7xl mx-auto">
        {/* Left side - App showcase */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 lg:pr-12 text-center lg:text-left"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#928dab] to-[#c9c5e8]"
          >
            Your conversations, simplified and safeguarded.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-[#d1d1d1] mb-10 max-w-lg mx-auto lg:mx-0"
          >
            With ChatSphere, you&apos;ll get fast, simple, secure messaging for free*, available on
            all devices.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12"
          >
            {[
              { icon: <FiMessageSquare size={24} />, text: "End-to-end encrypted messages" },
              { icon: <FiUsers size={24} />, text: "Groups to keep in touch" },
              { icon: <FiLock size={24} />, text: "Privacy by default" },
              { icon: <FiSmartphone size={24} />, text: "Available on all devices" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="flex items-center space-x-3 bg-[#2d2a3a]/50 backdrop-blur-sm p-4 rounded-lg border border-[#928dab]/10"
              >
                <div className="text-[#928dab]">{item.icon}</div>
                <p className="text-white">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link
              href="/login"
              className="bg-[#928dab] hover:bg-[#a7a2c1] text-[#1f1c2c] font-medium py-4 px-8 rounded-lg transition-all text-center shadow-lg hover:shadow-[#928dab]/30"
            >
              Get Started
            </Link>
            <Link
              href="/messages"
              className="border-2 border-[#928dab] text-[#928dab] hover:bg-[#928dab]/10 font-medium py-4 px-8 rounded-lg transition-all text-center shadow-lg hover:shadow-[#928dab]/10"
            >
              Try Demo
            </Link>
          </motion.div>
        </motion.div>

        {/* Right side - Content */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-0"
        >
          <div className="relative mt-20 lg:mt-0">
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10 w-full max-w-md mx-auto"
            >
              <div className="bg-[#2d2a3a] rounded-3xl shadow-2xl overflow-hidden border border-[#928dab]/20">
                <div className="bg-[#1f1c2c] p-4 flex items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-center flex-grow text-sm font-medium">ChatSphere</div>
                </div>
                <div className="p-4 h-96 bg-gradient-to-b from-[#2d2a3a] to-[#3a3646]">
                  {/* Mock chat messages */}
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-start space-x-2"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#928dab]"></div>
                      <div className="bg-[#1f1c2c] rounded-lg p-3 max-w-xs">
                        <p className="text-sm">Hey there! 👋</p>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 }}
                      className="flex items-start space-x-2"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#928dab]"></div>
                      <div className="bg-[#1f1c2c] rounded-lg p-3 max-w-xs">
                        <p className="text-sm">Welcome to ChatSphere!</p>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 }}
                      className="flex items-start justify-end space-x-2"
                    >
                      <div className="bg-[#928dab] text-[#1f1c2c] rounded-lg p-3 max-w-xs">
                        <p className="text-sm">Thanks! This looks amazing!</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#928dab]"></div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating phone mockups */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-20 -left-0 w-40 h-80 bg-[#2d2a3a] rounded-3xl border-2 border-[#928dab]/30 shadow-xl hidden lg:block"
            ></motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -top-20 -right-0 w-40 h-80 bg-[#2d2a3a] rounded-3xl border-2 border-[#928dab]/30 shadow-xl hidden lg:block"
            ></motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 py-8 text-center text-[#d1d1d1] text-sm"
      >
        <p>© {new Date().getFullYear()} ChatSphere. All rights reserved.</p>
        <p className="mt-2">* Data charges may apply. Contact your provider for details.</p>
      </motion.footer>
    </div>
  );
}
