import ProgressBar from "@ramonak/react-progress-bar";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import Modal from "react-modal";
import ButtonFlexContainer from "../../components/ButtonFlexContainer";
import CenteredText from "../../components/CenteredText";
import InputCard from "../../components/InputCard";
import PageTitle from "../../components/PageTitle";
import Separator from "../../components/Separator";
import { customStyles } from "../../libs/customStyles";
import { db, storage } from "../../libs/firebase";
import MotionMainContainer from "./../../components/MotionMainContainer";
import { setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";

Modal.setAppElement("#__next");

const VideoMessagePage = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isOpen, setIsOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    onSubmit: async ({ name, email }) => {
      if (selectedFile) {
        const storageRef = ref(
          storage,
          `video-messages/${Date.now()}-${selectedFile?.name}`
        );

        const result = uploadBytesResumable(storageRef, selectedFile, {});

        setIsOpen(true);

        result.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setUploadProgress(progress);
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(result.snapshot.ref).then((downloadURL) => {
              setDoc(
                doc(db, "guest-book-video", `${name}-${email}-${Date.now()}`),
                {
                  name,
                  email,
                  videoUrl: downloadURL,
                }
              );
            });
          }
        );
      }
    },
  });

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setSelectedFile(file);
    console.log(file);
  };

  return (
    <MotionMainContainer>
      <PageTitle>Video Message</PageTitle>

      <CenteredText>
        Record and upload a personal message to us here, and we’ll receive it on
        our wedding day! Thanks so much!
      </CenteredText>

      <Separator />

      <form onSubmit={formik.handleSubmit}>
        <InputCard>
          <input
            className="input"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Name | Family"
            name="name"
            type="text"
            autoComplete="off"
            required={true}
          />

          <input
            className="input"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Email Address"
            name="email"
            type="email"
            autoComplete="off"
            required={true}
          />

          <input
            onChange={onFileChange}
            className="input input--file"
            type="file"
          />
          <button className="button">Save Message to Guest Book</button>
        </InputCard>
      </form>

      <Modal isOpen={isOpen} style={customStyles}>
        {uploadProgress < 100 ? (
          <div className="modal-content modal-content--larger">
            <h1>Uploading</h1>
            <ProgressBar bgColor="black" completed={uploadProgress} />
          </div>
        ) : (
          <div className="modal-content modal-content--larger">
            <h1>Success!</h1>
            <p>
              Your message has been saved. <br /> We’ll see it soon!
            </p>

            <ButtonFlexContainer>
              <Link href="/registry?message=true">
                <a style={{ margin: "1rem 0rem" }} className="button">
                  Continue
                </a>
              </Link>
            </ButtonFlexContainer>
          </div>
        )}
      </Modal>
    </MotionMainContainer>
  );
};

export default VideoMessagePage;
