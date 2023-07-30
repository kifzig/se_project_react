import "./ModalWithForm.css";
import { useEffect } from "react";

const ModalWithForm = ({
  title,
  children,
  buttonText = "Submit",
  modalType,
  onClose,
}) => {
  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  useEffect(() => {
    const handleClickClose = (evt) => {
      if (evt.target.classList.contains("modal")) {
        console.log("handleClickClose");
        onClose();
      }
    };

    document.addEventListener("click", handleClickClose);

    return () => {
      document.removeEventListener("click", handleClickClose);
    };
  }, []);

  // useEffect;

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
