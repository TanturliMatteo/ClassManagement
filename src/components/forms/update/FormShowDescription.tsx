interface FormShowDescriptionProps {
  description: string;
  onClose: () => void;
}

const FormShowDescription = ({
  description,
  onClose,
}: FormShowDescriptionProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box description-box readonly">
        <textarea
          value={description}
          readOnly
          className="description-textarea readonly"
        />
        <button type="button" onClick={onClose} className="description-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default FormShowDescription;
