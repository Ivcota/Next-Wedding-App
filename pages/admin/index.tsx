import { UserCredential } from "@firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import ButtonFlexContainer from "../../components/ButtonFlexContainer";
import PageTitle from "../../components/PageTitle";
import Separator from "../../components/Separator";
import { auth, db, provider } from "../../libs/firebase";
import { useUserStore } from "../../libs/stores";
import MotionMainContainer from "./../../components/MotionMainContainer";

const AdminRootPage = () => {
  const router = useRouter();

  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const { setUserState, isAdmin, setAdmin, name } = useUserStore();

  // Check user auth
  const checkUserAuth = async (user: UserCredential) => {
    const docRef = doc(db, "admin-users", user.user.email as string);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(`${user.user.displayName} already exists.`);
      setAdmin(true);
      router.push("/admin/dashboard");
    } else {
      alert("You're not authorized");
      setAdmin(false);
    }
  };

  // User Functions
  useEffect(() => {
    if (user) {
      checkUserAuth(user);
      setUserState({
        id: user.user.uid,
        email: user.user.email as string,
        name: user.user.displayName as string,
        photo: user.user.photoURL as string,
        isAdmin: true,
      });
    }
  }, [user]);

  return (
    <MotionMainContainer>
      <PageTitle>Dashboard Login</PageTitle>
      <div className="modal-content">
        {isAdmin ? <p> Welcome {name}! </p> : <p></p>}
      </div>

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
