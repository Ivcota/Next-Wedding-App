import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import MotionMainContainer from "../components/MotionMainContainer";
import styles from "../styles/Home.module.css";
import ButtonFlexContainer from "./../components/ButtonFlexContainer";
import Separator from "./../components/Separator";

interface Props {
  groom: string;
  bride: string;
}

const Home: NextPage<Props> = ({ bride, groom }) => {
  return (
    <>
      <Head>
        <title>
          {groom} & {bride}
        </title>
        <meta name="description" content="Our Wedding Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MotionMainContainer>
        <div className={styles.home}>
          <div className={styles["title-header"]}>
            <h1>Iverson Diles</h1>
            <h1>&</h1>
            <h1>Holly Ziemba</h1>
          </div>
          <Separator />
          <ButtonFlexContainer>
            <Link href="/virtual-event">
              <a className="button">Start Now</a>
            </Link>
          </ButtonFlexContainer>
          <Separator />

          <div className={styles["invite-date"]}>
            <h1>3</h1>
            <h3>/</h3>
            <h1>12</h1>
            <p>2022</p>
          </div>

          <Separator />
        </div>
      </MotionMainContainer>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = () => {
  return {
    props: {
      groom: "Iverson",
      bride: "Holly",
    },
  };
};

export default Home;
