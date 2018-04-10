import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {storiesOf} from '@storybook/react'
import {withMarkdownNotes} from '@storybook/addon-notes'
import Dip from '../src'

class StateSwitcher extends Component {
  static propTypes = {
    state1Component: PropTypes.element,
    state2Component: PropTypes.element,
  }
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

const MinimalSetup = () => (
  <StateSwitcher
    state1Component={<Comp1 dipId="simple" />}
    state2Component={<Comp2 dipId="simple" />}
  />
)

const Timing = () => (
  <StateSwitcher
    state1Component={<Comp1 dipId="simple" />}
    state2Component={<Comp2 dipId="simple" duration={2000} />}
  />
)

const Morphing = () => (
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

const RenderProps = () => (
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

storiesOf('Basic React-Dip examples', module)
  .add('minimal setup 🎉', () => <MinimalSetup />)
  .add(
    'with Timing 🕰',
    withMarkdownNotes(`
# Timing

you can use custom timing by adding the \`duration\`-Prop,
eg \`<Dip duration={2000} dipId="timedElement" />\`
`)(() => (
      <div>
        <h2>With Timing</h2>
        <Timing />
      </div>
    )),
  )
  .add('with advanved morphing ✨', () => <Morphing />)
  .add('with renderProps 🤩', () => <RenderProps />)
