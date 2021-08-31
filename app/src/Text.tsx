import { useEffect, useState } from "react";
import { getKey, TextConfig } from "./App";
import "./Text.css";

type TextProps = {
  config: TextConfig;
};

const shouldUsePrefix = (lines: string[]) => {
  const validLine = lines.map((l) => {
    const arr = l.split("：");
    if (arr[0].length <= 4) return true;
    else return false;
  });

  return validLine.reduce((p, n) => p && n);
};

export function Text(props: TextProps) {
  const [text, setText] = useState<string[][]>();

  const splitFirst = (x: string) => {
    const arr = x.split("：");
    if (arr.length === 1) return ["", arr[0].trim()];
    else {
      const prefix = arr[0] + "：";
      const rest = arr.slice(1).reduce((p, c) => p + "：" + c);
      return [prefix.trim(), rest.trim()];
    }
  };

  useEffect(() => {
    const fetchText = async () => {
      const key = getKey(props.config);
      const res = await fetch(`text/${key}.txt`);
      const text = await res.text();
      const lines = text.split("\n");
      if (shouldUsePrefix(lines)) {
        const prefixed = lines.map(splitFirst);
        setText(prefixed);
      } else {
        const unprefixed = lines.map((l) => ["", l]);
        setText(unprefixed);
      }
    };

    fetchText();
  }, [props]);

  return (
    <div>
      <div className="table">
        {text?.map((row) => {
          return (
            <div className="row">
              <p className="cell dialog-head">{row[0]}</p>
              <p className="cell">{row[1]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
