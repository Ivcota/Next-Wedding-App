import { motion } from "framer-motion";
import React, { useState } from "react";
import styles from "../styles/WrittenMessageCard.module.css";
import Modal from "react-modal";
import { customStyles } from "../libs/customStyles";

interface Props {
  name: string;
  messageText: string;
  email: string;
  replied: boolean;
}

Modal.setAppElement("#__next");

const WrittenMessageCard: React.FC<Props> = ({
  name,
  email,
  messageText,
  replied,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={
        replied
          ? `${styles.card} ${styles["card--replied"]}`
          : `${styles.card} `
      }
    >
      <h2> {name} </h2>
      <p> {messageText} </p>
      <div> {email} </div>
      <button
        onClick={(e) => setIsOpen(true)}
        className={`${styles.card__button}`}
      >
        Send Email
      </button>

      <Modal style={customStyles} isOpen={isOpen}>
        <div className="modal-content">
          <h1>Send Reply</h1>
          <p>Send a custom reply to {name}!</p>
          <button className="button button--spaced">Open Email</button>

          <button className="button button--spaced">Mark as Sent</button>
        </div>
      </Modal>
    </motion.div>
  );
};

export default WrittenMessageCard;
