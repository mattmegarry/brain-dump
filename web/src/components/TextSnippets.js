import React, { useState, useEffect } from "react";
import { authRequest } from "../utils/http";
import CreateTextSnippet from "./CreateTextSnippet";
import TextSnippet from "./TextSnippet";

const TextSnippets = props => {
  const { clearState } = props;
  const [textSnippets, setTextSnippets] = useState([]);
  const [whichSnippetIsInInputMode, setWhichSnippetIsInInputMode] = useState(
    null
  );

  useEffect(() => {
    const fetchTextSnippets = async () => {
      try {
        const res = await authRequest("/text-snippets", "GET");
        if (res.status >= 400 && res.status < 600) {
          clearState();
        } else if (res.status === 200) {
          const textSnippets = res.data || [];
          setTextSnippets(textSnippets);
        }
      } catch (e) {
        console.log("Error fetching data");
      }
    };
    fetchTextSnippets();
  }, [clearState]);

  const changeOneAndFetchTextSnippets = async (body, path) => {
    try {
      const res = await authRequest("/text-snippets" + path, "POST", body);
      if (res.status >= 400 && res.status < 600) {
        clearState();
      } else if (res.status === 200) {
        const textSnippets = res.data || [];
        setTextSnippets(textSnippets);
      }
    } catch (e) {
      console.log("Error creating text snippet");
    }
  };

  const handleInputMode = id => {
    setWhichSnippetIsInInputMode(prevState => (prevState === id ? null : id));
  };

  return (
    <>
      <CreateTextSnippet
        changeOneAndFetchTextSnippets={changeOneAndFetchTextSnippets}
      />
      {textSnippets.map(textSnippet => {
        const { id } = textSnippet || "";
        return (
          <TextSnippet
            key={id}
            textSnippet={textSnippet}
            inputMode={whichSnippetIsInInputMode === id ? true : false}
            handleInputMode={handleInputMode}
            changeOneAndFetchTextSnippets={changeOneAndFetchTextSnippets}
          />
        );
      })}
    </>
  );
};

export default TextSnippets;
