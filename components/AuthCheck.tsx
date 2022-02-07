import Link from "next/link";
import React from "react";
import { useUserStore } from "../libs/stores";
import ButtonFlexContainer from "./ButtonFlexContainer";

const AuthCheck: React.FC = ({ children }) => {
  const { isAdmin } = useUserStore();

  return (
    <>
      {isAdmin ? (
        children
      ) : (
        <div className="modal-content">
          <p>You need to sign in.</p>

          <ButtonFlexContainer>
            <Link href="/admin">
              <a className="button">Go to Login Page</a>
            </Link>
          </ButtonFlexContainer>
        </div>
      )}
    </>
  );
};

export default AuthCheck;
