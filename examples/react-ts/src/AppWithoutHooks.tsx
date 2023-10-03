import * as React from "react"
import "./index.css"
import { RootState, initialize } from "./store"
import "./switch.css"

class App extends React.PureComponent<Props> {
  componentDidMount() {
    initialize()
    // const { players } = this.props
    // players.getPlayers()
  }

  // componentDidUpdate() {
  //   const { settingsState } = this.props
  //   const theme = settingsState.isLightThemeOn ? "light" : "dark"
  //   document.documentElement.setAttribute("data-theme", theme)
  // }

  // checkTheme(e: any) {
  //   const { settings } = this.props

  //   if (e.target.checked) {
  //     settings.SET_THEME("dark")
  //   } else {
  //     settings.SET_THEME("light")
  //   }
  // }

  render() {
    const { errorState, loadingState, data } = this.props
    return (
      <div>
        {errorState ? (
          <div className="error">{JSON.stringify(errorState)}</div>
        ) : (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <h1>Test Actor</h1>
            {loadingState ? (
              <div className="loader">Loading...</div>
            ) : (
              <div>
                <h1>{data}</h1>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

const mapState = (state: RootState) => ({
  errorState: state.error,
  loadingState: state.loading,
  data: state.data,
})

const mapDispatch = () => ({
  // players: dispatch.players,
  // settings: dispatch.settings,
})

type StateProps = ReturnType<typeof mapState>
type DispatchProps = ReturnType<typeof mapDispatch>
type Props = StateProps & DispatchProps

function connect(mapState: any, mapDispatch: any) {
  return (App: any) => (props: any) => {
    const { store } = props
    const stateProps = mapState(store.getState())
    const dispatchProps = mapDispatch(store.dispatch)
    return <App {...stateProps} {...dispatchProps} />
  }
}

export default connect(mapState, mapDispatch)(App)
