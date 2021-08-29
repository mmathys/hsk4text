import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Text } from "./Text";
import { title } from "process";

export type TextConfig = {
  lesson: number;
  text: number;
  title: string;
};

type Config = {
  texts: [TextConfig];
};

export function getKey(config: TextConfig | undefined) {
  if (!config) return;
  return (config.lesson < 10 ? "0" : "") + config.lesson + "-" + config.text;
}

function App() {
  const [config, setConfig] = useState<Config>();
  const [activeText, setActiveText] = useState<TextConfig>();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("config.json");
      const json: Config = await res.json();
      setConfig(json);
    };

    fetchData();
  }, []);

  const setText = (entry: TextConfig) => {
    console.log(entry);
    setActiveText(entry);
    if (audioRef.current) {
      audioRef.current.load();
    }
  };

  const nav = () => {
    if (config) {
      return config.texts.map((entry) => {
        const className = "nav-entry " + (entry === activeText ? "active" : "");
        return (
          <div
            className={className}
            key={getKey(entry)}
            onClick={() => setText(entry)}
          >
            Lesson {entry.lesson}, Text {entry.text}
          </div>
        );
      });
    }
  };

  const text = () => {
    if (activeText) return <Text config={activeText}></Text>;
  };

  return (
    <div className="App">
      <div className="content">
        <div className="nav">{nav()}</div>
        <div className="text chinese">
          <p className="title">{activeText?.title || "no text"}</p>
          {text()}
          <audio controls ref={audioRef}>
            <source src={`audio/${getKey(activeText)}.mp3`} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  );
}

export default App;
