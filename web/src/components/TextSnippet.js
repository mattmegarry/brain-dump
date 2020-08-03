import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const TextSnippet = props => {
  const {
    textSnippet,
    changeOneAndFetchTextSnippets,
    inputMode,
    handleInputMode
  } = props;
  const { id, text } = textSnippet || "";
  const [newText, setNewText] = useState(text);

  const handleSubmit = async event => {
    if (event) {
      event.preventDefault();
    }

    const body = {
      id,
      newText
    };

    handleInputMode(id);
    await changeOneAndFetchTextSnippets(body, "/update");
  };

  const deleteTextSnippet = async () => {
    const body = { id };

    handleInputMode(id);
    await changeOneAndFetchTextSnippets(body, "/delete");
  };

  const dispatchInputModeInstruction = () => {
    handleInputMode(id);
  };

  return inputMode ? (
    <div className="item">
      <div className="cancel">
        <input
          className="cancel"
          type="button"
          value="Cancel"
          onClick={dispatchInputModeInstruction}
        />
      </div>
      <form onSubmit={event => handleSubmit(event)}>
        <TextareaAutosize
          className="edit-text-snippet"
          value={newText}
          onChange={event => setNewText(event.target.value)}
        />
        <div className="text-snippet-control-buttons">
          <input
            className="delete"
            type="button"
            value="Delete"
            onClick={deleteTextSnippet}
          />
          <input
            className="save-edit-text-snippet"
            type="submit"
            value="Save"
          />
        </div>
      </form>
    </div>
  ) : (
    <div className="item" onClick={dispatchInputModeInstruction}>
      {text}
    </div>
  );
};

export default TextSnippet;
