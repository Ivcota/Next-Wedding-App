import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import ButtonFlexContainer from "../components/ButtonFlexContainer";
import MotionMainContainer from "../components/MotionMainContainer";
import PageTitle from "../components/PageTitle";
import Separator from "../components/Separator";
import styles from "../styles/registry.module.css";

const Registry: NextPage = () => {
  const router = useRouter();
  const { message } = router.query;

  return (
    <MotionMainContainer>
      <PageTitle> Registry </PageTitle>
      <Separator />
      {message ? (
        <div className="modal-content">
          <p>
            Thank you so much! We can’t wait to see your messages. We look
            forward to seeing you!
          </p>
          <p>Thank you for being a part of our big day!</p>
        </div>
      ) : (
        <div className="modal-content">
          <p>
            Below you can view our registries. We will not be reading out names
            of those who gift us. We’re just happy that you love us!
          </p>
        </div>
      )}
      <Separator />

      <ButtonFlexContainer>
        <a
          className={`${styles["button-spaced"]} button`}
          rel="noopener noreferrer"
          href="https://www.zola.com/registry/iversonandholly"
          target="_blank"
        >
          Zola Registry
        </a>
      </ButtonFlexContainer>

      <ButtonFlexContainer>
        <a
          className={`${styles["button-spaced"]} button`}
          href="https://www.amazon.com/wedding/registry/2D4CFRF056QGK?ref=wr_search_page_result_1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Amazon Registry
        </a>
      </ButtonFlexContainer>
      <ButtonFlexContainer>
        <a
          className={`button ${styles["button-spaced"]}`}
          href="https://www.target.com/gift-registry/gift/thediles"
          target="_blank"
          rel="noopener noreferrer"
        >
          Target Registry
        </a>
      </ButtonFlexContainer>
    </MotionMainContainer>
  );
};

export default Registry;
