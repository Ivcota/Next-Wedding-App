import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import Modal from "react-modal";
import InputCard from "../../components/InputCard";
import MotionMainContainer from "../../components/MotionMainContainer";
import PageTitle from "../../components/PageTitle";
import Separator from "../../components/Separator";
import { customStyles } from "../../libs/customStyles";
import { db } from "../../libs/firebase";
import styles from "../../styles/WrittenMessagePage.module.css";
import ButtonFlexContainer from "./../../components/ButtonFlexContainer";

Modal.setAppElement("#__next");

const WrittenMessagePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    onSubmit: async ({ name, message, email }, { resetForm }) => {
      await setDoc(
        doc(db, "guest-book-written", `${name}-${email}-${Date.now()}`),
        {
          name,
          email,
          message,
          replied: false,
          date: Date.now(),
        }
      );
      resetForm();
      setIsOpen(true);
    },
  });

  return (
    <MotionMainContainer>
      <PageTitle>Written Message</PageTitle>

      <p className={styles["center-text"]}>
        You can write a personal message here, and we’ll receive it on our
        wedding day! Thanks so much!
      </p>

      <Separator />
      <form onSubmit={formik.handleSubmit}>
        <InputCard>
          <input
            className="input"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Name | Family"
            name="name"
            type="text"
            autoComplete="off"
            required={true}
          />
          <input
            className="input"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Email Address"
            name="email"
            type="email"
            autoComplete="off"
            required={true}
          />
          <textarea
            name="message"
            autoComplete="off"
            value={formik.values.message}
            onChange={formik.handleChange}
            rows={10}
            required={true}
            className="input input--text-area"
            placeholder="Personal Message"
          ></textarea>
          <button className="button">Save Message to Guest Book</button>
        </InputCard>
      </form>

      <Modal isOpen={isOpen} style={customStyles}>
        <div className="modal-content modal-content--larger">
          <h1>Success!</h1>
          <p>
            Your message has been saved. <br /> We’ll see it soon!
          </p>
        </div>

        <ButtonFlexContainer>
          <Link href="/registry?message=true">
            <a style={{ margin: "1rem 0rem" }} className="button">
              Continue
            </a>
          </Link>
        </ButtonFlexContainer>
      </Modal>
    </MotionMainContainer>
  );
};

export default WrittenMessagePage;
