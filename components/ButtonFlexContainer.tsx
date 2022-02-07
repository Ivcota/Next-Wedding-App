import React from "react";
import styles from "../styles/ButtonFlexContainer.module.css";

const ButtonFlexContainer: React.FC = ({ children }) => {
  return <div className={styles["flex-container"]}>{children}</div>;
};

export default ButtonFlexContainer;
