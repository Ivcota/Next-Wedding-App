import React from "react";
import MotionMainContainer from "../components/MotionMainContainer";
import PageTitle from "../components/PageTitle";
import Separator from "../components/Separator";
import styles from "../styles/rsvp.module.css";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../libs/firebase";
import { useRouter } from "next/router";

const RSVPPage = () => {
  const { push } = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    onSubmit: async ({ name, email, phone }) => {
      await toast.promise(
        setDoc(doc(db, "rsvps", email), {
          name,
          email,
          phone,
        }),
        {
          loading: "Saving...",
          success: <b>R.S.V.P Saved</b>,
          error: <b>Could not save.</b>,
        }
      );
      push("/virtual-guest-book");
    },
  });

  return (
    <MotionMainContainer>
      <PageTitle>R.S.V.P</PageTitle>
      <div className="modal-content">
        <p>Enter your information below to rsvp.</p>
      </div>
      <Separator />
      <form onSubmit={formik.handleSubmit}>
        <div className={styles["input-container"]}>
          <label htmlFor="name">Name</label>
          <input
            onChange={formik.handleChange}
            placeholder="Enter your name"
            className="input"
            name="name"
            type="text"
            required={true}
            autoComplete="off"
          />
        </div>
        <div className={styles["input-container"]}>
          <label htmlFor="email">Email</label>
          <input
            onChange={formik.handleChange}
            placeholder="Enter your email"
            className="input"
            name="email"
            type="email"
            required={true}
            autoComplete="off"
          />
        </div>
        <div className={styles["input-container"]}>
          <label htmlFor="email">Phone Number</label>
          <input
            onChange={formik.handleChange}
            placeholder="Enter your phone number"
            className="input"
            name="phone"
            type="tel"
            required={true}
            autoComplete="off"
          />
          <button
            className="button button--spaced"
            style={{ marginTop: "1rem" }}
          >
            Submit
          </button>
        </div>
      </form>
    </MotionMainContainer>
  );
};

export default RSVPPage;
