import React, { useEffect, useState } from "react"
import logo from "./logo.svg"
import { Text } from "./Text"
import "./App.css"

export type TextConfig = {
  lesson: number
  text: number
  title: string
}

type Config = {
  texts: [TextConfig]
}

function App() {
  const [config, setConfig] = useState<Config>()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("config.json")
      const json: Config = await res.json()
      setConfig(json)
    }

    fetchData()
  }, [])

  const text = () => {
    if (config) {
      return config.texts.map((entry) => <Text config={entry}></Text>)
    }
  }

  return <div className="App">{text()}</div>
}

export default App
