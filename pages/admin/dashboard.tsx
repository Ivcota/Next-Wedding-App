import Link from "next/link";
import React from "react";
import AuthCheck from "../../components/AuthCheck";
import ButtonFlexContainer from "../../components/ButtonFlexContainer";
import PageTitle from "../../components/PageTitle";
import Separator from "../../components/Separator";
import { useUserStore } from "../../libs/stores";
import MotionMainContainer from "./../../components/MotionMainContainer";

const DashboardPage = () => {
  const { name } = useUserStore();

  return (
    <MotionMainContainer>
      <PageTitle>Admin Dashboard</PageTitle>
      <AuthCheck>
        <div className="modal-content">
          Hi {name}! You can check the guest book from here. Select the type of
          messages you would like to see.
        </div>
        <Separator />
        <ButtonFlexContainer>
          <Link href="written-messages">
            <a className="button button--spaced">Written Messages</a>
          </Link>
        </ButtonFlexContainer>
      </AuthCheck>
    </MotionMainContainer>
  );
};

export default DashboardPage;
