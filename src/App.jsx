import { PromptingIsAllYouNeed } from "./prompting"
import React, { useEffect, useState } from "react";

export default function Home() {
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return null; // or return a loading spinner component
  }

  return (
    <PromptingIsAllYouNeed 
      words={words.length > 0 ? words : ["PEACE", "IS ALL YOU NEED"]} 
    />
  );
}
