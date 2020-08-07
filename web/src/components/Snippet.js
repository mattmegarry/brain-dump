import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const TextSnippet = props => {
  const {
    snippet,
    changeOneAndFetchSnippets,
    inputMode,
    handleInputMode
  } = props;
  const { snippetId, snippetText } = snippet || "";
  const [newSnippetText, setNewSnippetText] = useState(snippetText);

  const handleSubmit = async event => {
    if (event) {
      event.preventDefault();
    }

    const body = {
      snippetId,
      newSnippetText
    };

    handleInputMode(snippetId);
    await changeOneAndFetchSnippets(body, "/update");
  };

  const deleteTextSnippet = async () => {
    const body = { snippetId };

    handleInputMode(snippetId);
    await changeOneAndFetchSnippets(body, "/delete");
  };

  const dispatchInputModeInstruction = () => {
    handleInputMode(snippetId);
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
          value={newSnippetText}
          onChange={event => setNewSnippetText(event.target.value)}
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
      {snippetText}
    </div>
  );
};

export default TextSnippet;
