import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import ButtonFlexContainer from "../../components/ButtonFlexContainer";
import MotionMainContainer from "../../components/MotionMainContainer";
import PageTitle from "../../components/PageTitle";
import Separator from "../../components/Separator";

const VirtualGuestBook = () => {
  return (
    <MotionMainContainer>
      <PageTitle> Virtual Guest Book </PageTitle>
      <p style={{ textAlign: "center" }}>
        Choose how you would like to send your personal message in our virtual
        guest book. You have two options: Written Message or Video Message.
      </p>
      <Separator />

      <ButtonFlexContainer>
        <Link href="/virtual-guest-book/video-message">
          <a className="button">Video Message</a>
        </Link>
      </ButtonFlexContainer>
      <ButtonFlexContainer>
        <Link href="/virtual-guest-book/written-message">
          <a style={{ marginTop: "1rem" }} className="button">
            Written Message
          </a>
        </Link>
      </ButtonFlexContainer>
    </MotionMainContainer>
  );
};

export default VirtualGuestBook;
