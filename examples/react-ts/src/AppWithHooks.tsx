import { useEffect } from "react"
import { startActivation, useSelector } from "./store"

const Count = () => {
  const data = useSelector("data")
  const loadingState = useSelector("loading")
  const errorState = useSelector("error")
  // const dispatch = useDispatch()
  console.log("data", data)
  console.log("loadingState", loadingState)

  useEffect(() => {
    // startActivation()
  }, [])

  // const checkTheme = React.useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     if (e.target.checked) {
  //       dispatch.settings.SET_THEME("dark")
  //     } else {
  //       dispatch.settings.SET_THEME("light")
  //     }
  //   },
  //   []
  // )

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <h1>Test Actor</h1>
        <button onClick={startActivation}>Click</button>
        {loadingState ? (
          <div className="loader" />
        ) : (
          <div>
            <h1>{data}</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default Count
