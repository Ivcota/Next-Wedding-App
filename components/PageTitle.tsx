import React from "react";
import styles from "../styles/PageTitle.module.css";
import Separator from "./Separator";

interface Props {}

const PageTitle: React.FC<Props> = ({ children }) => {
  return <h1 className={styles.title}> {children} </h1>;
};

export default PageTitle;
