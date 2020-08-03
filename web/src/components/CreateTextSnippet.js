import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const CreateTextSnippet = props => {
  const { changeOneAndFetchTextSnippets } = props;
  const [text, setText] = useState("");

  const handleSubmit = async event => {
    if (event) {
      event.preventDefault();
    }

    const body = {
      text
    };

    try {
      await changeOneAndFetchTextSnippets(body, "/create");
      setText("");
    } catch (e) {}
  };

  return (
    <>
      <div className="create-text-snippet">
        <form onSubmit={event => handleSubmit(event)}>
          <TextareaAutosize
            autoFocus
            className="create-text-snippet"
            value={text}
            onChange={event => setText(event.target.value)}
            placeholder="Add a new one..."
          />
          <input className="create-text-snippet" type="submit" value="Save" />
        </form>
      </div>
    </>
  );
};

export default CreateTextSnippet;
