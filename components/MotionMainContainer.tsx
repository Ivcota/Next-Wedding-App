import { motion } from "framer-motion";
import React from "react";

const MotionMainContainer: React.FC = ({ children }) => {
  return (
    <motion.main
      className="container"
      initial={{ opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.main>
  );
};

export default MotionMainContainer;
