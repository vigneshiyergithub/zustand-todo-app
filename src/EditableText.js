import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import editIcon from "./assets/edit.png";


export const EditableText = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [inputText, setInputText] = useState(props.value);
  const { addToast } = useToasts();
  useEffect(() => {
    setInputText(props.value);
  }, [props.value]);
  const onMouseEnter = () => {
    setShowEdit(true);
  };
  const onMouseLeave = () => setShowEdit(false);
  const onAdd = () => {
    props.onEditField(inputText);
    setOnEdit(false);
    setShowEdit(false);
    addToast("Todo item edited", {
      appearance: "info",
      autoDismiss: true,
    });
  };
  return (
    <div
      className="editable-text"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {!onEdit ? (
        <>
          <div className="editable-text-child">{props.value}</div>
          {showEdit && (
            <img
              src={editIcon}
              className="editable-text-edit"
              alt="edit-icon"
              onClick={(e) => {
                e.stopPropagation();
                setOnEdit(true);
              }} />
          )}
        </>
      ) : (
        <>
          <input
            className="editable-text-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)} />
          <button onClick={onAdd}>Save</button>
        </>
      )}
    </div>
  );
};
