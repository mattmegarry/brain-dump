import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const CreateSnippet = props => {
  const { changeOneAndFetchSnippets } = props;
  const [snippetText, setSnippetText] = useState("");

  const handleSubmit = async event => {
    if (event) {
      event.preventDefault();
    }

    const body = {
      snippetText
    };

    try {
      await changeOneAndFetchSnippets(body, "/create");
      setSnippetText("");
    } catch (e) {}
  };

  return (
    <>
      <div className="create-snippet">
        <form onSubmit={event => handleSubmit(event)}>
          <TextareaAutosize
            autoFocus
            className="create-snippet"
            value={snippetText}
            onChange={event => setSnippetText(event.target.value)}
            placeholder="Add a new one..."
          />
          <input className="create-snippet" type="submit" value="Save" />
        </form>
      </div>
    </>
  );
};

export default CreateSnippet;
