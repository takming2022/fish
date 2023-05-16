import React from 'react'
// import '../src/style.css'
import '../src/shark.css'
import { motion } from "framer-motion";

export default function Sharktt() {
  return (
    <div>
      <motion.div
        className="box"
        animate={{ opacity: 1, scaleX: window.innerWidth, scaleY: window.innerHeight, transitionEnd: { display: 'none' } }}
        initial={{ opacity: 1, scale: 0.03 }}
        transition={{
          duration: 2,
          delay: 1,
          ease: [0.9, 0, 1, 1],
        }}
      />
    </div>


  );
}