import "./ModalWithForm.css";
import { useEffect } from "react";

const ModalWithForm = ({
  title,
  children,
  buttonText = "Submit",
  modalType,
  onClose,
}) => {
  console.log("ModalWithForm");

  // function to check if key === ESC
  /*
  useEffect(() => {
    const handleEsc = (evt) => {
      // handle the escape
    };
    // Set event listener on the window or document
    // window.addEventListener(keydown)
    // event.key === "ESC code is"

    // onClose could be used

    return () => {
      // remove the event listener
    };
  }, []);
  */

  return (
    <div className={`modal modal_type_${modalType}`}>
      <div className="modal__content">
        <button
          type="button"
          onClick={onClose}
          className="modal__form_close_button"
        ></button>
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form">{children}</form>
        <button type="submit" className="modal__submit_button">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ModalWithForm;
