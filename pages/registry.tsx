import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import ButtonFlexContainer from "../components/ButtonFlexContainer";
import MotionMainContainer from "../components/MotionMainContainer";
import PageTitle from "../components/PageTitle";
import Separator from "../components/Separator";

const Registry: NextPage = () => {
  const router = useRouter();
  const { message } = router.query;

  return (
    <MotionMainContainer>
      <PageTitle> Registry </PageTitle>
      <Separator />
      {message ? (
        <div className="modal-content">
          <p>Thank you so much! We can’t wait to see your message.</p>
          <p>
            If you would like to see some of the things we were planning on
            getting, you can view those items through the links below.
          </p>
          <p>
            <b>
              We will not be reading out names of those who got us gifts & gifts
              are not required to be a part of our wedding.
            </b>
          </p>
          <p>We look forward to seeing you!</p>
        </div>
      ) : (
        <div className="modal-content">
          <p>
            Below you can view our registries. Please do not feel obligated to
            get us anything. We will not be reading out names of those who gift
            us. We’re just happy that you love us!
          </p>
        </div>
      )}
      <Separator />
      <ButtonFlexContainer>
        <a
          className="button"
          rel="noopener noreferrer"
          href="https://www.zola.com/registry/iversonandholly"
          target="_blank"
        >
          Zola Registry
        </a>
      </ButtonFlexContainer>
    </MotionMainContainer>
  );
};

export default Registry;
