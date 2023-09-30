import React, { useState } from "react"
import { createRoot } from "react-dom/client"
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

const root = createRoot(document.getElementById("root")!)

root.render(
  <React.StrictMode>
    <PreviewSelector />
  </React.StrictMode>
)
