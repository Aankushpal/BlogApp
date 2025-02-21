import React from "react";
import { motion } from "framer-motion";

const Logo = () => {
    return (
        <div className="flex justify-center items-center w-full h-[6vw] p-4 bg-[#dadada]">
            <motion.svg
                width="150"
                height="150"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="max-w-[50vw] max-h-[30vh]"
            >
                <motion.text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontSize="36"
                    fontWeight="bold"
                    fill="#333"
                    initial={{ letterSpacing: -2 }}
                    animate={{ letterSpacing: 1 }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                >
                    BlogX
                </motion.text>
            </motion.svg>
        </div>
    );
};

export default Logo;
