import React, { useEffect, useRef, useState } from "react"
import logo from "./logo.svg"
import "./App.css"
import { Text } from "./Text"
import { title } from "process"
import _ from "lodash"

export type TextConfig = {
  lesson: number
  text: number
  title: string | undefined
}

type Config = {
  texts: [TextConfig]
}

export function getKey(config: TextConfig | undefined) {
  if (!config) return
  return (config.lesson < 10 ? "0" : "") + config.lesson + "-" + config.text
}

function App() {
  const [config, setConfig] = useState<Config>()
  const [activeText, setActiveText] = useState<TextConfig>()
  const [selectedLesson, setSelectedLesson] = useState<number>(-1)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("config.json")
      const json: Config = await res.json()
      setConfig(json)
    }

    fetchData()
  }, [])

  const setText = (entry: TextConfig) => {
    setActiveText(entry)
    if (audioRef.current) {
      audioRef.current.load()
    }
  }

  const nav = () => {
    if (!config) return

    const selectLesson = (lesson_num: number) => () => {
      if (lesson_num === selectedLesson) {
        setSelectedLesson(-1)
      } else {
        setSelectedLesson(lesson_num)
      }
    }

    const subitems = (entries: TextConfig[], lesson_num: number) => {
      if (lesson_num !== selectedLesson) return
      const entryClassName = (entry: TextConfig) => "nav-entry" + (entry === activeText ? " active" : "")
      return entries.map((entry) => (
        <div className={entryClassName(entry)} key={getKey(entry)} onClick={() => setText(entry)}>
          Text {entry.text}
        </div>
      ))
    }

    const grouped = _.groupBy(config.texts, (c: TextConfig) => c.lesson)
    const keys = _.keys(grouped)
    return keys.map((lesson: string) => {
      const lesson_num = parseInt(lesson)
      const entries = grouped[lesson]
      const className = "nav-lesson" + (lesson_num === activeText?.lesson ? " active" : "")
      return (
        <div>
          <p className={className} onClick={selectLesson(lesson_num)}>
            Lesson {lesson}
          </p>
          {subitems(entries, lesson_num)}
        </div>
      )
    })
  }

  const content = () => {
    if (!activeText) return
    const title = () => {
      if (!activeText.title) return
      else return <p className="title">{activeText.title}</p>
    }
    return (
      <div className="text chinese">
        {title()}
        <Text config={activeText}></Text>
        <audio className="audio" controls ref={audioRef}>
          <source src={`audio/${getKey(activeText)}.mp3`} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    )
  }

  return (
    <div className="App">
      <div className="content">
        <div className="nav">{nav()}</div>
        {content()}
      </div>
    </div>
  )
}

export default App
