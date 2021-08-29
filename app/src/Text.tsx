import { useEffect, useState } from "react"
import { getKey, TextConfig } from "./App"

type TextProps = {
  config: TextConfig
}

export function Text(props: TextProps) {
  const [text, setText] = useState<string>()

  useEffect(() => {
    const fetchText = async () => {
      const key = getKey(props.config)
      const res = await fetch(`text/${key}.txt`)
      const text = await res.text()
      setText(text)
    }

    fetchText()
  }, [props])

  return <div>
    {text}
  </div>
}