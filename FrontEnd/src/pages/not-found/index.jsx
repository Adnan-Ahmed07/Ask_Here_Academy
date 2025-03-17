import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const NotFoundPage = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const starVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: [0, 1, 0], transition: { duration: 2, repeat: Infinity } }
  };

  const NumberBounce = ({ children }) => (
    <motion.span
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120 }}
      whileHover={{ scale: 1.2 }}
      className="number"
    >
      {children}
    </motion.span>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="not-found-container"
    >
      {/* Animated background stars */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="star"
          variants={starVariants}
          initial="hidden"
          animate={controls}
          style={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`,
            borderRadius: "50%",
            background: "white"
          }}
          transition={{ delay: Math.random() * 2, duration: Math.random() * 2 + 1 }}
        />
      ))}

      <div className="content">
        <motion.div
          className="number-container"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <NumberBounce>4</NumberBounce>
          <NumberBounce>0</NumberBounce>
          <NumberBounce>4</NumberBounce>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.h1
            animate={{ 
              textShadow: [
                "0 0 10px #fff",
                "0 0 20px #fff",
                "0 0 10px #fff"
              ] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Lost in Space
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="message"
        >
          The page you're looking for has been abducted by aliens!
        </motion.p>

        <motion.div
          className="apology"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="main-apology">Sorry for your Trouble</p>
          <p className="server-owner">Server Owner A-H</p>
        </motion.div>

        <motion.div
          className="astronaut"
          animate={{
            y: ["0%", "20%", "0%"],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity
          }}
        >
          👨🚀
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;