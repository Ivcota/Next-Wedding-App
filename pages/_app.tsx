import "../styles/globals.css";
import "../navbar_resources/css/navigation.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import { useUserStore } from "../libs/stores";

function MyApp({ Component, pageProps }: AppProps) {
  const { restoreAuth } = useUserStore();

  useEffect(() => {
    restoreAuth();
  }, []);

  return (
    <>
      <Script strategy="beforeInteractive" src="/navigation.js" />
      <Navbar />
      <AnimatePresence>
        <Component {...pageProps} />
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default MyApp;
