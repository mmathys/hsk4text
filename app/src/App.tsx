import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Text } from "./Text";
import { title } from "process";

export type TextConfig = {
  lesson: number;
  text: number;
  title: string | undefined;
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
      const lessons = config.texts.map(t => t.lesson).filter((value, index, self) => self.indexOf(value) === index)
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

  const content = () => {
    if (activeText) {
      const title = () => activeText.title && <p className="title">{activeText.title}</p>
      return (
        <div className="text chinese">
          {title()}
          <Text config={activeText}></Text>
          <audio className="audio" controls ref={audioRef}>
            <source src={`audio/${getKey(activeText)}.mp3`} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    }
  };

  return (
    <div className="App">
      <div className="content">
        <div className="nav">{nav()}</div>
        {content()}
      </div>
    </div>
  );
}

export default App;
