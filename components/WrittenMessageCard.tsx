import { motion } from "framer-motion";
import React from "react";
import styles from "../styles/WrittenMessageCard.module.css";

interface Props {
  name: string;
  messageText: string;
  email: string;
  replied: boolean;
}

const WrittenMessageCard: React.FC<Props> = ({
  name,
  email,
  messageText,
  replied,
  children,
}) => {
  return (
    <motion.div
      className={
        replied
          ? `${styles.card} ${styles["card--replied"]}`
          : `${styles.card} `
      }
    >
      <h2> {name} </h2>
      <p> {messageText} </p>
      <div> {email} </div>
      <button className={`${styles.card__button}`}>Send Email</button>
    </motion.div>
  );
};

export default WrittenMessageCard;
