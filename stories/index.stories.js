import React, {Component} from 'react'
import {storiesOf} from '@storybook/react'
import {withMarkdownNotes} from '@storybook/addon-notes'
import {
  Timing,
  Morphing,
  RenderProps,
  MinimalSetup,
  Overlayed,
  FloatingComponent,
} from './basic'
import('web-animations-js')

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
