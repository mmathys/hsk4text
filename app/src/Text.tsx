import { useEffect } from "react"
import { TextConfig } from "./App"

type TextProps = {
  config: TextConfig
}

export function Text({ config: TextConfig }: TextProps) {
  useEffect(() => {

    const fetchText = async () => {
      
    }

    fetchText()
  }, [])

  return <div></div>
}
