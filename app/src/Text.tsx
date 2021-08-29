import { useEffect, useState } from "react"
import { getKey, TextConfig } from "./App"
import "./Text.css"

type TextProps = {
  config: TextConfig
}

export function Text(props: TextProps) {
  const [text, setText] = useState<string[][]>()

  const splitFirst = (x: string) => {
    const arr = x.split("：")
    if (arr.length === 1) return ["", arr[0]]
    else {
      const prefix = arr[0] + "："
      const rest = arr.slice(1).reduce((p, c) => p + "：" + c)
      return [prefix, rest]
    }
  }

  useEffect(() => {
    const fetchText = async () => {
      const key = getKey(props.config)
      const res = await fetch(`text/${key}.txt`)
      const text = await res.text()
      const lines = text.split("\n")
      const prefixed = lines.map(splitFirst)
      setText(prefixed)
    }

    fetchText()
  }, [props])

  return <div className="table">
    {text?.map(row => {
      return <div className="row">
        <p className="cell dialog-head">{row[0]}</p>
        <p className="cell">{row[1]}</p>
      </div>
    })}
  </div>
}