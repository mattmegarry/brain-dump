import React, { useState, useEffect } from "react";
import { authRequest } from "../utils/http";
import CreateSnippet from "./CreateSnippet";
import Snippet from "./Snippet";

const Snippets = props => {
  const { clearState } = props;
  const [snippets, setSnippets] = useState([]);
  const [whichSnippetIsInInputMode, setWhichSnippetIsInInputMode] = useState(
    null
  );

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const res = await authRequest("/snippets", "GET");
        if (res.status >= 400 && res.status < 600) {
          clearState();
        } else if (res.status === 200) {
          const snippets = res.data || [];
          setSnippets(snippets);
        }
      } catch (e) {
        console.log("Error fetching data");
      }
    };
    fetchSnippets();
  }, [clearState]);

  const changeOneAndFetchSnippets = async (body, path) => {
    try {
      const res = await authRequest("/snippets" + path, "POST", body);
      if (res.status >= 400 && res.status < 600) {
        clearState();
      } else if (res.status === 200) {
        const snippets = res.data || [];
        setSnippets(snippets);
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
      <CreateSnippet changeOneAndFetchSnippets={changeOneAndFetchSnippets} />
      {snippets.map(snippet => {
        const { snippetId } = snippet || "";
        return (
          <Snippet
            key={snippetId}
            snippet={snippet}
            inputMode={whichSnippetIsInInputMode === snippetId ? true : false}
            handleInputMode={handleInputMode}
            changeOneAndFetchSnippets={changeOneAndFetchSnippets}
          />
        );
      })}
    </>
  );
};

export default Snippets;
