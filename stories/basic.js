import React, {Component} from 'react'
import Dip from '../src'

class StateSwitcher extends Component {
  state = {isInitialState: true}
  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.setState(state => ({
              isInitialState: !state.isInitialState,
            }))
          }
        >
          Toggle State
        </button>
        {this.state.isInitialState
          ? this.props.state1Component
          : this.props.state2Component}
      </div>
    )
  }
}

const Comp1 = props => (
  <Dip
    style={{
      background: 'red',
      width: '100px',
      top: '100px',
      left: '100px',
      position: 'relative',
      height: '100px',
    }}
    {...props}
  >
    Component1
  </Dip>
)
const Comp2 = props => (
  <Dip
    style={{
      background: 'blue',
      width: '200px',
      top: '200px',
      left: '90px',
      position: 'relative',
      height: '200px',
      borderRadius: '50%',
    }}
    {...props}
  >
    Component2
  </Dip>
)

const CompRenderProp = props => (
  <Dip
    style={{
      background: 'blue',
      width: '200px',
      top: '200px',
      left: '90px',
      position: 'relative',
      height: '200px',
      borderRadius: '50%',
    }}
    {...props}
    render={renderProps => <div {...renderProps}>with RenderProp</div>}
  />
)

export const MinimalSetup = () => (
  <StateSwitcher
    state1Component={<Comp1 dipId="simple" />}
    state2Component={<Comp2 dipId="simple" />}
  />
)

export const Timing = () => (
  <StateSwitcher
    state1Component={<Comp1 dipId="simple" />}
    state2Component={<Comp2 dipId="simple" duration={2000} />}
  />
)

export const Morphing = () => (
  <StateSwitcher
    state1Component={
      <Comp1
        dipId="simple"
        optInCssStyles={['borderRadius', 'backgroundColor']}
      />
    }
    state2Component={
      <Comp2
        dipId="simple"
        duration={2000}
        optInCssStyles={['borderRadius', 'backgroundColor']}
      />
    }
  />
)

export const RenderProps = () => (
  <StateSwitcher
    state1Component={
      <Comp1
        dipId="simple"
        optInCssStyles={['borderRadius', 'backgroundColor']}
      />
    }
    state2Component={
      <CompRenderProp
        dipId="simple"
        duration={2000}
        optInCssStyles={['borderRadius', 'backgroundColor']}
      />
    }
  />
)

export const Overlayed = () => (
  <div>
    <StateSwitcher
      state1Component={
        <Comp1
          dipId="simple"
          duration={2000}
          optInCssStyles={['borderRadius', 'backgroundColor']}
        />
      }
      state2Component={
        <CompRenderProp
          dipId="simple"
          duration={2000}
          optInCssStyles={['borderRadius', 'backgroundColor']}
        />
      }
    />
    <div
      style={{
        background: 'black',
        width: '100%',
        height: '100px',
        position: 'absolute',
        top: '230px',
      }}
    />
  </div>
)

const FloatingContainer = props => (
  <div style={{display: 'flex', flexWrap: 'wrap'}} {...props} />
)

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const FloatingElement = props => (
  <Dip
    style={{
      margin: '5px',
      width: '100px',
      height: '100px',
      background: props.color,
    }}
    {...props}
  >
    {props.color}
  </Dip>
)

const LargeComponent = props => (
  <Dip
    style={{
      width: '100%',
      height: '500px',
      background: getRandomColor(),
    }}
    {...props}
  />
)

const colorArray = Array.from({length: 100}).map(
  (_, index) => `hsl(${index * 360 / 100}, 74%, 77%)`,
)

export class FloatingComponent extends Component {
  state = {selected: undefined}
  render() {
    if (this.state.selected)
      return (
        <LargeComponent
          dipId={this.state.selected}
          optInCssStyles={['backgroundColor']}
          onClick={() => this.setState({selected: undefined})}
        />
      )
    return (
      <FloatingContainer>
        {colorArray.map((color, index) => (
          <FloatingElement
            key={color}
            dipId={index}
            optInCssStyles={['backgroundColor']}
            color={color}
            onClick={() => this.setState({selected: index})}
          />
        ))}
      </FloatingContainer>
    )
  }
}
