import React, { useEffect, useRef, useState } from "react";
import "./form.css";

const Form = () => {
  const [appTitle, setAppTitle] = useState("");
  const [appDescription, setAppDescription] = useState("");
  const [category, setCategory] = useState("");
  const [modalFile, setModalFile] = useState(null); // To store the file from the dropzone
  const [deployedUrl, setDeployedUrl] = useState(""); // To store the deployed URL from modal input
  const [modalOpen, setModalOpen] = useState(false); // To control modal visibility
  const fileUploadRef = useRef(null);
  const deployedUrlRef = useRef(null);

  useEffect(() => {
    const appTitleInput = document.querySelector("#appTitle");
    const appDescriptionInput = document.querySelector("#appDescription");
    const categories = document.querySelector("#categories");
    const dropzone = document.querySelector("#modalDropzone"); // Get the dropzone element

    categories.options = [
      "Analytics",
      "Development",
      "Productivity",
      "Collaboration",
      "Design",
    ];

    appTitleInput.addEventListener("valueChange", (e) => {
      setAppTitle(e.detail);
    });

    appDescriptionInput.addEventListener("valueChange", (e) => {
      setAppDescription(e.detail);
    });

    categories.addEventListener("valueChange", (e) => {
      setCategory(e.detail);
    });

    // Listen for the files event on the dropzone
    const handleDropzoneFilesChange = (e) => {
      console.log("Files dropped:", e.detail[0]);
      const files = e.detail[0]; // Capture the files from the event
      if (files.length > 0) {
        setModalFile(files[0]); // Set the first file (assuming single file upload)
        console.log("Files dropped:", files);
      }
    };

    deployedUrlRef.current.addEventListener("valueChange", (e) => {
      setDeployedUrl(e.detail);
    });
    dropzone.addEventListener("files", handleDropzoneFilesChange);

    return () => {
      // Cleanup event listeners
      appTitleInput.removeEventListener("valueChange", (e) => {
        setAppTitle(e.detail);
      });

      appDescriptionInput.removeEventListener("valueChange", (e) => {
        setAppDescription(e.detail);
      });

      categories.removeEventListener("valueChange", (e) => {
        setCategory(e.detail);
      });

      dropzone.removeEventListener("files", handleDropzoneFilesChange); // Clean up the dropzone listener
    };
  }, []);

  const handleFileUpload = () => {
    setModalOpen(true); // Open the modal
    fileUploadRef.current.open();
  };

  const handleDeploy = () => {
    console.log("App Title:", appTitle);
    console.log("App Description:", appDescription);
    console.log("Category:", category);
    console.log("Deployed URL:", deployedUrl);
    console.log("File from Dropzone:", modalFile?.name);
  };

  const isFormComplete = appTitle && appDescription && category;

  const handleModalContinue = () => {
    // Get values from the deployedUrl input and file dropzone
    const url = deployedUrlRef.current.value;
    const uploadedFile = modalFile ? modalFile.name : "No file uploaded";

    console.log("Deployed URL:", url);
    console.log("File from Dropzone:", uploadedFile);

    // Close the modal
    setModalOpen(false);
    fileUploadRef.current.close();
  };

  const isDeployEnabled =
    (deployedUrl && deployedUrl.trim() !== "") || modalFile !== null;

  return (
    <div>
      <div className="container-main">
        <h1>App Info</h1>
        <modus-text-input
          id="appTitle"
          label="App Title"
          required
          style={{ width: "40%" }}
        ></modus-text-input>
        <modus-textarea-input
          id="appDescription"
          label="App Description"
          required
          style={{ width: "40%" }}
        ></modus-textarea-input>
        <modus-autocomplete
          id="categories"
          label="Categories"
          style={{ width: "40%" }}
        ></modus-autocomplete>

        {deployedUrl}
        <modus-button id="uploadCodeButton" onClick={handleFileUpload}>
          Upload Code
        </modus-button>

        <modus-button
          id="deployButton"
          color="danger"
          disabled={!isFormComplete || !isDeployEnabled} // Update the condition
          onClick={handleDeploy}
        >
          Deploy
        </modus-button>

        <modus-modal
          header-text="App Info"
          open={modalOpen}
          ref={fileUploadRef}
        >
          <div>
            <p className="label-text app-margin">Enter Deployed URL</p>
            <div className="modal-textInput app-margin">
              <modus-text-input
                id="deployedUrl"
                ref={deployedUrlRef}
              ></modus-text-input>
            </div>
            <div className="orText">Or</div>
            <p className="label-text app-margin">Upload in Zip format</p>
            <div className="modal-dropzone app-margin">
              <modus-file-dropzone
                aria-label="dropzone"
                dropzone-Height="175px"
                dropzone-Width="500px"
                multiple="false"
                id="modalDropzone"
              ></modus-file-dropzone>
            </div>
            <div style={{ textAlign: "right", marginTop:25 }} className="app-margin">
              <modus-button
                id="cancelButton"
                color="tertiary"
                style={{ marginRight: 10 }}
                onClick={() => {
                  setModalOpen(false);
                  fileUploadRef.current.close();
                }}
              >
                Cancel
              </modus-button>
              <modus-button id="continueButton" onClick={handleModalContinue}>
                Continue
              </modus-button>
            </div>
          </div>
        </modus-modal>
      </div>
    </div>
  );
};

export default Form;
