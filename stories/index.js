import React from 'react'
import {storiesOf} from '@storybook/react'
import storyRouter from 'storybook-react-router'
import {
  Timing,
  Morphing,
  RenderProps,
  MinimalSetup,
  Overlayed,
  FloatingComponent,
} from './basic'
import Demo from './grid/demo'

// import Demo from './grid/demo'
if (!Element.prototype.hasOwnProperty('animate')) import('web-animations-js')

storiesOf('Basic React-Dip examples', module)
  .add('minimal setup 🎉', () => <MinimalSetup />)
  .add('with Timing 🕰', () => (
    <div>
      <h2>With Timing</h2>
      <Timing />
    </div>
  ))
  .add('with advanved morphing ✨', () => <Morphing />)
  .add('with renderProps 🤩', () => <RenderProps />)
  .add('with potential overlays ', () => <Overlayed />)
  .add('with floating Components ', () => <FloatingComponent />)

storiesOf('Routed examples', module)
  .addDecorator(storyRouter())
  .add('image Grid', () => <Demo />)
