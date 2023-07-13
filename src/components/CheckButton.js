import React from "react";
import styles from '../styles/modules/todoItem.module.scss'
import { motion, useMotionValue, useTransform } from "framer-motion";

const checkVariants = {
    initial: {
      color: '#fff',
    },
    checked: { pathLength: 1 },
    unchecked: { pathLength: 0 },
  };
  
  const boxVariants = {
    checked: {
      background: 'var(--primaryPurple)',
      transition: { duration: 0.1 },
    },
    unchecked: { 
        background: 'var(--gray-2)', 
        transition: { duration: 0.1 } 
    },
  };

const CheckButton = ({checked,  handleCheck}) => {
    const pathLength = useMotionValue(0)
    const opacity = useTransform(pathLength, [.05, .15], [0, 1])
    return(
        <motion.div className={styles.svgBox}
        variants={boxVariants}
        animate={checked ? 'checked' : 'unchecked'}
        onClick={handleCheck}
        >
            <motion.svg
                className={styles.svg}
                viewBox='0 0 53 38'
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <motion.path
                    variants={checkVariants}
                    animate={checked ? 'checked' : 'unchecked'}
                    style={{pathLength, opacity}}
                    fill="none"
                    strokeMiterlimit="10"
                    strokeWidth='6'
                    d='M1.5 22L16 36.5L51.5 1'
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />
            </motion.svg>
        </motion.div>
    )
}

export default CheckButton