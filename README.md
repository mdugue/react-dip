# react-dip

**Simple & declarative** transition animations for [React](https://facebook.github.io/react).

## DISCLAIMER

**THIS IS EARLY WORK IN PROGRESS AND NOT "RELEASED TO PUBLIC" YET, THOUGH THIS SHOULD HAPPEN ANYTIME SOON.**

**FEEL FREE TO WATCH 👓, STAR ⭐ OR CONTACT ME TO BE NOTIFIED ABOUT PROGRESS**.

_TODO: Video / gif here_

[![Version](https://badge.fury.io/js/react-dip.svg)](https://www.npmjs.com/package/react-dip)
[![Size](http://img.badgesize.io/https://unpkg.com/react-dip/dist/react-dip.umd.min.js?label=size)](https://unpkg.com/react-dip/dist/)
[![Size](http://img.badgesize.io/https://unpkg.com/react-dip/dist/react-dip.umd.min.js?compression=gzip&label=gzip%20size)](https://unpkg.com/react-dip/dist/)
[![Greenkeeper badge](https://badges.greenkeeper.io/mdugue/react-dip.svg)](https://greenkeeper.io/)
<a href="https://codeclimate.com/github/mdugue/react-dip/maintainability"><img src="https://api.codeclimate.com/v1/badges/2392b912933a753b4b5b/maintainability" /></a>
[![Build Status](https://travis-ci.org/mdugue/react-dip.svg?branch=master)](https://travis-ci.org/mdugue/react-dip)

## Why?

Ever wanted to implement one of those incredible designs you find on [dribble](http://dribbble.com/) or [Muzli](https://muz.li/) where one element beautifully transforms into another upon page transition? And then realized _"But I want my code to stay statefull, decoupled, scalable, declarative"_, so you ended up with regular "hard cuts" instead? – **To me this happend very very often!**

`react-dip` solves this by providing animated transisions in an effortless way, that _just works<sup>TM</sup>_, by using the [FLIP technique](https://aerotwist.com/blog/flip-your-animations/#the-general-approach).

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

* [Installation](#installation)
* [Quick Start](#quick-start)
* [Polyfill](#polyfill)
* [Examples](#examples)
* [How it works](#how-it-works)
* [Browser Compatiblity](#browser-compatiblity)
* [Caveats](#caveats)
* [Inspired by](#inspired-by)
* [Huge Thanks to](#huge-thanks-to)
* [TODOs](#todos)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

Using [yarn](https://yarnpkg.com) or [npm](https://www.npmjs.com/):

```bash
$ yarn add react-dip

# or using npm
$ npm install --save react-dip
```

Using a module bundler like [webpack](webpack.js.org) or [parcel](https://parceljs.org/), import your depency just as any other:

```javascript
// Using ES6 modules
import Dip from 'react-dip'

// or using CommonJS modules
var Dip = require('react-dip')
```

UMD builds are also available via [unpkg](https://unpkg.com):

```javascript
<script src="https://unpkg.com/react-dip/dist/react-dip.umd.min.js" />
```

## Quick Start

The API is as small as possible, almost everything is optional, so you see results immediately. Just wrap your Items in a `Dip`

```jsx
import React, {Component} from 'react'
import Dip from 'react-dip'

function Component1() {
  return <Dip style={{background: 'red'}}>some Content</Dip>
}

function Component2() {
  return (
    <Dip style={{position: 'absolute', top: '100px', background: 'green'}}>
      some other Content <br />
      etc...
    </Dip>
  )
}

// use complex state here
// or a routing solution such as react-router
// or connect it to redux, or ustated
export default class MyStatefulParent extends Component {
  state = {currentStep: 0}
  toggleState = () =>
    this.setState(state => ({
      currentStep: (state.currentStep + 1) % 2,
    }))
  render() {
    return (
      <section>
        <h1> Quick Start example </h1>
        <button onClick={this.toggleState}>toggle me</button>
        {this.state.currentStep === 0 ? <Component1 /> : <Component2 />}
      </section>
    )
  }
}
```

_Note: Using `inline styles` as well as `absolute` positioning is usually not considered a good way and is applied here for the sake of simplicity.
You can use any type `CSS` or `CSS-in-JS` styling and `fluid` / `flex` / `grid` layout._

[![Edit react-dip Quick Start](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/20jlowo9rp)

## Polyfill

As some browsers do not support the [Web Animations API](https://caniuse.com/#feat=web-animation), we recommend using the web-animations-js [Polyfill](https://github.com/web-animations/web-animations-js).

1.  Install the dependency

```bash
$ yarn add web-animations-js

# or using npm
$ npm install --save web-animations-js
```

2.  include the dependency into your project.

```javascript
import('web-animations-js') // We recommend dynamic imports to keep initial bundlesize small
```

## Examples

* [Quick Start Example](https://codesandbox.io/s/20jlowo9rp)

## How it works

DIP-Communication

FLIP

## Browser Compatiblity

| Chrome | Firefox | Safari          | Edge            | IE              | iOS Safari/Chrome | Android Chrome  |
| ------ | ------- | --------------- | --------------- | --------------- | ----------------- | --------------- |
| ✅     | ✅      | ✅<sup>\*</sup> | ✅<sup>\*</sup> | ✅<sup>\*</sup> | ✅<sup>\*</sup>   | ✅<sup>\*</sup> |

<sup>\*</sup> [(requires polyfill)](<(#installation)>)

## Caveats

* Block-Elements h1 etc
* nested Elements

## Inspired by

* https://github.com/joshwcomeau/react-flip-move

## Huge Thanks to

* [Kent C. Dodds](https://github.com/kentcdodds/) for his inspiring work, such as [kcd-scripts](https://github.com/kentcdodds/kcd-scripts)
* [Ives van Horne](https://github.com/compuives) amongst other for [CodeSandbox](codesandbox.io)

## TODOs

There are tons of ideas for improving `react-dip` such as adding fine grained control to your transitions, but the primary goal will stay to keep the API as symple as possible.

* [ ] add support for staggering
* [ ] add complex examples with routing etc.
* [ ] add real tests
* [ ] add possibility of declaring alternative components that are shown whilst animating
* [ ] export types for flow and typescript
* [ ] add contributing guide lines
* [ ] add error handling
