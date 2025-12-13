import React, { createContext, useContext, useState } from "react";

/* ---------------- CONTEXT ---------------- */
const PopupContext = createContext();

/* ---------------- POPUP UI ---------------- */
function PopupUI({ message, type }) {
  if (!message) return null;

  return (
    <div className={`popup ${type}`}>
      {message}
    </div>
  );
}

/* ---------------- MAIN POPUP COMPONENT ---------------- */
export default function Popup({ children }) {
  const [popup, setPopup] = useState({
    message: "",
    type: ""
  });

  const showPopup = (message, type = "success") => {
    setPopup({ message, type });

    setTimeout(() => {
      setPopup({ message: "", type: "" });
    }, 3000);
  };

  return (
    <PopupContext.Provider value={{ showPopup }}>
      {children}
      <PopupUI message={popup.message} type={popup.type} />
    </PopupContext.Provider>
  );
}

/* ---------------- CUSTOM HOOK ---------------- */
export const usePopup = () => useContext(PopupContext);
