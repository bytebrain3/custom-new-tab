import { PromptingIsAllYouNeed } from "./prompting"
import React, { useEffect, useState } from "react";

export default function Home() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    const storage = (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) ? chrome.storage.local : null;
    if (storage) {
      storage.get(["extensionSettings"], (result) => {
        if (result.extensionSettings) {
          const settings = result.extensionSettings;
          if (settings.text || settings.tagline) {
            setWords([
              settings.text?.toUpperCase() || "PEACE",
              settings.tagline?.toUpperCase() || "IS ALL YOU NEED"
            ]);
          }
        }
      });
    }
  }, []);

  return (
    words.length > 0 ? (
      <PromptingIsAllYouNeed words={words} />
    ) : (
      <PromptingIsAllYouNeed words={["PEACE", "IS ALL YOU NEED"]} />
    )
  );
}
