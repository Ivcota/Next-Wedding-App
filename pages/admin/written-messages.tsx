import React from "react";
import AuthCheck from "../../components/AuthCheck";
import MotionMainContainer from "../../components/MotionMainContainer";
import PageTitle from "../../components/PageTitle";
import WrittenMessageCard from "../../components/WrittenMessageCard";
import Separator from "./../../components/Separator";
import styles from "../../styles/AdminWrittenMessages.module.css";
import { db } from "../../libs/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { AnimatePresence, motion } from "framer-motion";

const AdminWrittenMessages = () => {
  const writtenMessagesRef = collection(db, "guest-book-written");

  const q = query(writtenMessagesRef, orderBy("date", "desc"));

  const [snapshot, loading, error] = useCollection(q);

  return (
    <MotionMainContainer>
      <PageTitle>Written Messages</PageTitle>
      <div className="modal-content">
        <p>Here are all the written messages sent to you.</p>
      </div>
      <Separator />
      <AuthCheck>
        <motion.div className={styles["message-container"]}>
          {snapshot?.docs.map((doc) => {
            return (
              <AnimatePresence key={doc.id}>
                <WrittenMessageCard
                  key={doc.id}
                  name={doc.data().name}
                  email={doc.data().email}
                  replied={doc.data().replied}
                  messageText={doc.data().message}
                />
              </AnimatePresence>
            );
          })}
        </motion.div>
      </AuthCheck>
    </MotionMainContainer>
  );
};

export default AdminWrittenMessages;
