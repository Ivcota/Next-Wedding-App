import React, { useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import Separator from "../../components/Separator";
import MotionMainContainer from "./../../components/MotionMainContainer";
import { auth, provider } from "../../libs/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import ButtonFlexContainer from "../../components/ButtonFlexContainer";

const AdminRootPage = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  return (
    <MotionMainContainer>
      <PageTitle>Dashboard Login</PageTitle>
      <Separator />
      <ButtonFlexContainer>
        <button className="button" onClick={() => signInWithGoogle()}>
          Sign in With Google
        </button>
      </ButtonFlexContainer>
    </MotionMainContainer>
  );
};

export default AdminRootPage;
