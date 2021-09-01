import { useEffect, useRef, useState } from "react"
import { useKeyPress } from "react-use"
import "./App.css"
import { Text } from "./Text"
import _ from "lodash"

const PauseKeys = ["k", " "]
const SkipLeftKeys = ["j", "ArrowLeft"]
const SkipRightKeys = ["l", "ArrowRight"]
const UpKeys = ["ArrowUp", "i"]
const DownKeys = ["ArrowDown", "m"]

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
        <div key={lesson}>
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

  const keyHandler = (keys: string[]) => (event: KeyboardEvent) => {
    if (keys.includes(event.key)) {
      event.preventDefault()
      return true
    }
    return false
  }

  const [pause] = useKeyPress(keyHandler(PauseKeys))
  const [left] = useKeyPress(keyHandler(SkipLeftKeys))
  const [right] = useKeyPress(keyHandler(SkipRightKeys))
  const [up] = useKeyPress(keyHandler(UpKeys))
  const [down] = useKeyPress(keyHandler(DownKeys))

  useEffect(() => {
    if (pause) {
      if (audioRef.current?.paused) audioRef.current?.play()
      else audioRef.current?.pause()
    }
  }, [pause])

  useEffect(() => {
    if (!audioRef.current) return
    if (left) audioRef.current.currentTime -= 5
    if (right) audioRef.current.currentTime += 5
  }, [left, right, audioRef])

  useEffect(() => {
    if (!config) return
    const numLessons = config.texts.length
    const lesson = activeText && config.texts.indexOf(activeText)

    let newText
    if (up) {
      if (lesson !== undefined) {
        newText = config.texts[lesson - 1]
      } else {
        newText = config.texts[numLessons - 1]
      }
    }

    if (down) {
      if (lesson !== undefined) {
        newText = config.texts[lesson + 1]
      } else {
        newText = config.texts[0]
      }
    }

    if (newText) {
      setText(newText)
      setSelectedLesson(newText.lesson)
    }
  }, [up, down, config])

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
