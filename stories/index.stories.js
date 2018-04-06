import React, { Component } from "react"
import { storiesOf } from "@storybook/react"
import { withMarkdownNotes } from "@storybook/addon-notes"
import Dip from "../src"

const Comp1 = props => (
  <Dip
    style={{
      background: "red",
      width: "100px",
      top: "100px",
      left: "100px",
      position: "relative",
      height: "100px"
    }}
    {...props}
  >
    Component1
  </Dip>
)
const Comp2 = props => (
  <Dip
    style={{
      background: "blue",
      width: "200px",
      top: "200px",
      left: "90px",
      position: "relative",
      height: "200px",
      borderRadius: "50%"
    }}
    {...props}
  >
    Component2
  </Dip>
)

class MinimalSetup extends Component {
  state = { isInitialState: true }
  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.setState(state => ({
              isInitialState: !state.isInitialState
            }))
          }
        >
          Toggle State
        </button>
        {this.state.isInitialState ? (
          <Comp1 id="simple" />
        ) : (
          <Comp2 id="simple" />
        )}
      </div>
    )
  }
}

class Morphing extends Component {
  state = { isInitialState: true }
  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.setState(state => ({
              isInitialState: !state.isInitialState
            }))
          }
        >
          Toggle State
        </button>
        {this.state.isInitialState ? (
          <Comp1
            id="simple"
            optInCssStyles={["borderRadius", "backgroundColor"]}
          />
        ) : (
          <Comp2
            id="simple"
            durationTo={2000}
            optInCssStyles={["borderRadius", "backgroundColor"]}
          />
        )}
      </div>
    )
  }
}

class Timing extends Component {
  state = { isInitialState: true }
  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.setState(state => ({
              isInitialState: !state.isInitialState
            }))
          }
        >
          Toggle State
        </button>
        {this.state.isInitialState ? (
          <Comp1 id="simple" />
        ) : (
          <Comp2 id="simple" durationTo={2000} />
        )}
      </div>
    )
  }
}

storiesOf("Basic React-Dip examples", module)
  .add("minimal setup 🎉", () => <MinimalSetup />)
  .add(
    "with Timing",
    withMarkdownNotes(`
# Timing

you can use custom timing by adding the \`durationTo\`-Prop,
eg \`<Dip durationTo={2000} id="timedElement" />\`
`)(() => (
      <div>
        <h2>With Timing</h2>
        <Timing />
      </div>
    ))
  )
  .add("with morphing 🕰", () => <Morphing />)
