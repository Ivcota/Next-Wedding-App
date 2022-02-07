import React from "react";
import styles from "../styles/CenteredText.module.css";

const CenteredText: React.FC = ({ children }) => {
  return <p className={styles["center-text"]}> {children} </p>;
};

export default CenteredText;
