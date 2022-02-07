import React from "react";
import styles from "../styles/InputCard.module.css";

const InputCard: React.FC = ({ children }) => {
  return <div className={styles["input-card"]}>{children}</div>;
};

export default InputCard;
