import AddToCalendar from "@culturehq/add-to-calendar";
import { motion } from "framer-motion";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import ButtonFlexContainer from "../components/ButtonFlexContainer";
import PageTitle from "../components/PageTitle";
import Separator from "../components/Separator";
import styles from "../styles/virtual-event.module.css";

const VirtualEvent: NextPage = () => {
  return (
    <motion.main
      className="container"
      initial={{ opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PageTitle>Virtual Events</PageTitle>
      <Separator />

      <div className={styles["meeting-info"]}>
        <p>
          <b>Mar 12, 2022 05:00 PM Arizona</b>
        </p>
        <p>
          Meeting ID: 864 3727 1148 <br /> Passcode: jasper
        </p>
      </div>

      <ButtonFlexContainer>
        <AddToCalendar
          event={{
            name: "Iverson & Holly's Wedding",
            details: `
              https://us02web.zoom.us/j/86437271148
              Meeting ID: 864 3727 1148
              Passcode: jasper
              `,
            location: "Virtual Event",
            startsAt: "2022-03-12T17:00:00",
            endsAt: "2022-03-12T18:00:00",
          }}
        />
      </ButtonFlexContainer>
      <ButtonFlexContainer>
        <Link href="/virtual-guest-book">
          <a style={{ marginTop: "1rem" }} className="button">
            Next
          </a>
        </Link>
      </ButtonFlexContainer>
    </motion.main>
  );
};

export default VirtualEvent;
