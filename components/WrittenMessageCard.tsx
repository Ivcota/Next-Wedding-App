import { doc, updateDoc } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Modal from "react-modal";
import { customStyles } from "../libs/customStyles";
import { db } from "../libs/firebase";
import styles from "../styles/WrittenMessageCard.module.css";
import ButtonFlexContainer from "./ButtonFlexContainer";

interface Props {
  id: string;
  name: string;
  messageText: string;
  email: string;
  replied: boolean;
}

Modal.setAppElement("#__next");

const WrittenMessageCard: React.FC<Props> = ({
  id,
  name,
  email,
  messageText,
  replied,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const messageRef = doc(db, "guest-book-written", id);

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

      <AnimatePresence>
        <Modal style={customStyles} isOpen={isOpen}>
          <div className="modal-content">
            <div
              onClick={() => setIsOpen(false)}
              className={styles["close-icon"]}
            >
              X
            </div>
            <h1>Send Reply</h1>
            <p>Send a custom reply to {name}!</p>
            <ButtonFlexContainer>
              <a href={`mailto:${email}`} className="button button--spaced">
                Open Email
              </a>
            </ButtonFlexContainer>

            {replied ? (
              <button
                className="button button--spaced"
                onClick={async () => {
                  await updateDoc(messageRef, {
                    replied: false,
                  });
                }}
              >
                Undo Mark as Sent
              </button>
            ) : (
              <button
                onClick={async () => {
                  await updateDoc(messageRef, {
                    replied: true,
                  });
                }}
                className="button button--spaced"
              >
                Mark as Sent
              </button>
            )}
          </div>
        </Modal>
      </AnimatePresence>
    </motion.div>
  );
};

export default WrittenMessageCard;
