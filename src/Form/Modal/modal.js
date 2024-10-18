// import React from "react";

// const Modal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null; // Render nothing if modal is not open

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>App Info</h2>
//         <p className="label-text">Enter Deployed URL</p>
//         <div className="modal-textInput">
//           <modus-text-input id="deployedUrl"></modus-text-input>
//         </div>
//         <div className="orText">Or</div>
//         <p className="label-text">Upload in Zip format</p>
//         <div className="modal-dropzone">
//           <modus-file-dropzone
//             aria-label="dropzone"
//             dropzone-Height="175px"
//             dropzone-Width="500px"
//             multiple="false"
//           ></modus-file-dropzone>
//         </div>
//         <div style={{ textAlign: "right" }}>
//           <modus-button id="cancelButton" color="tertiary" style={{ marginRight: 10 }} onClick={onClose}>
//             Cancel
//           </modus-button>
//           <modus-button id="continueButton">Continue</modus-button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;
