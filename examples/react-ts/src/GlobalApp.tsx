import { useState } from "react"
import App from "./AppWithHooks"
import AppWithoutHooks from "./AppWithoutHooks"
import "./index.css"
import "./switch.css"

const PreviewSelector = () => {
  const [showHooks, setShowHooks] = useState<boolean>(true)

  return (
    <div>
      <button type="button" onClick={() => setShowHooks(true)}>
        Show Application with hooks
      </button>
      <button type="button" onClick={() => setShowHooks(false)}>
        Show Application with classes
      </button>
      {showHooks ? <App /> : <AppWithoutHooks />}
    </div>
  )
}

export const GlobalApp = () => (
  <>
    <PreviewSelector />
  </>
)
