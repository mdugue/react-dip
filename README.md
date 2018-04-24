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
[![CodeFactor](https://www.codefactor.io/repository/github/mdugue/react-dip/badge)](https://www.codefactor.io/repository/github/mdugue/react-dip)
[![BCH compliance](https://bettercodehub.com/edge/badge/mdugue/react-dip?branch=master)](https://bettercodehub.com/)
[![Known Vulnerabilities](https://snyk.io/test/github/mdugue/react-dip/badge.svg)](https://snyk.io/test/github/mdugue/react-dip)
[![Build Status](https://travis-ci.org/mdugue/react-dip.svg?branch=master)](https://travis-ci.org/mdugue/react-dip)

## Why?

Ever wanted to implement one of those incredible designs you find on [dribble](http://dribbble.com/) or [Muzli](https://muz.li/) where one element beautifully transforms into another upon page transition? And then realized _"But I want my code to stay statefull, decoupled, scalable, declarative"_, so you ended up with regular "hard cuts" instead? – **To me this happend very very often!**

`react-dip` solves this by providing animated transisions in an effortless way, that _just works<sup>TM</sup>_, by using the [FLIP technique](https://aerotwist.com/blog/flip-your-animations/#the-general-approach).

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

* [Installation](#installation)
* [Quick Start](#quick-start)
* [Props](#props)
  * [dipId](#dipid)
  * [children](#children)
  * [render](#render)
  * [duration](#duration)
  * [easing](#easing)
  * [element](#element)
  * [optInCssStyles](#optincssstyles)
  * [className, id, style, aria-..., role, etc.](#classname-id-style-aria--role-etc)
* [Polyfill](#polyfill)
* [Examples](#examples)
* [How it works](#how-it-works)
  * [Basic idea](#basic-idea)
  * [Why a clone?](#why-a-clone)
* [Dip-WHAT???](#dip-what)
* [Browser Compatiblity](#browser-compatiblity)
* [Caveats (TODO)](#caveats-todo)
* [Inspired by](#inspired-by)
* [Huge Thanks to](#huge-thanks-to)
* [TODOs](#todos)
  * [To be done before anouncing](#to-be-done-before-anouncing)
  * [For some near future milestone](#for-some-near-future-milestone)

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
  return (
    <Dip dipId="quickStart" style={{background: 'red'}}>
      some content
    </Dip>
  )
}

function Component2() {
  return (
    <Dip
      dipId="quickStart"
      style={{position: 'absolute', top: '100px', background: 'green'}}
    >
      some other content <br />
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

## Props

The API surface is intetended to be as simple as possible. Only `dipId` and `children` (or `render`) are required props. The rest is optional and helps you fine tuning your animations.

### dipId

> `string` | **Required!**

The `id` that groups two different dip elements. React-dip will only create animated transitions between to Elements with the same `dipId`, consider them as potential _from_- and _to_-hints.

### children

> `React Element` | **Required unless using `render`-prop!**

Content that is rendered as part of that `Dip`.

### render

> `function({ref: function(), styles: {}})` | **Required unless using `children`-prop!**

Function that should return the content that is rendered as part of that `Dip`. Allows for more advanced pattern and skips the wrapping Element. See [render prop](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) for further details.

**Warning:** `<Dip render>` takes precedence over `<Dip children>` so don’t use both in the same `<Dip />`.

### duration

> `number` | _**optional**_, defaults to `200`

Time in milliseconds the animation will take when transitioning _to_ this dip.

### easing

> `string` | _**optional**_, defaults to `"ease-out"`

Specifies the desired timing function. Accepts the pre-defined values `linear`, `ease`, `ease-in`, `ease-out`, and `ease-in-out`, or a custom `cubic-bezier` value like `cubic-bezier(0.42, 0, 0.58, 1)`.

### element

> `string` | _**optional**_, defaults to `"div"`

Specify the desired HTML-tag here (eg. `<Dip element="li">`) in case you don't want your children wrapped in a `div`.

### optInCssStyles

> `Array(string)` | _**optional**_, defaults to an empty `array`

By default `react-dip` will morph your components _only_ regarding their sizes and positions using `css transforms` which is usually a good default regarding performance.
In case you want to morph more css properties you can specify them here, such as `optInCssStyles={["borderRadius", "backgroundColor"]}`. _**optional**_

### className, id, style, aria-..., role, etc.

> default `react` / `HTML attributes` | _**optional**_

Any provided standard attribute is passed to the child-container.

## Polyfill

As some browsers do not support the [Web Animations API](https://caniuse.com/#feat=web-animation), we recommend using the [web-animations-js Polyfill](https://github.com/web-animations/web-animations-js).

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

* [Styled Components, render Props & beautiful images](https://codesandbox.io/s/l5qlnjo1v7)

## How it works

### Basic idea

The basic idea is the following: Every candidate for an animated transition is wrapped in a `<Dip />` Container,
whereas potential _start_ and _destination_ elements get grouped via the same `dipId` property. Say, if you want to animnate a users name from a list to a detail view
you'd wrap the name in both views in a `<Dip dipId={`name-${username}`}>` Container.

Wrapping the Components in a `Dip`-Container does a couple of things:

1.  registering the Component as a potential transition start point
2.  checking for existing registered elements

If the check for existing registered elements was successfull, we kick in the animation logic, based on the FLIP-technique:

1.  we create a clone of the destination-element including it's size and position and append this clone on a proper Animation-DOM-Layer
2.  we calculate the css transforms to position the clone at the start position and scale it to the size of the start element
3.  we animate from _2._ to _1._, hiding the destination-Element whilst animating (currently via web-animations-api, which might change though)

### Why a clone?

Whilst a clone has some downsides, such as creating new DOM-Elements just for animating and possible variations in the styling if nested css selectors were used
it gives us more freedom eg. when animating to an element which is inside of a container with `overflow: hidden`.

## Dip-WHAT???

No _DEEEE-EYE-PEEE_, just **dip** your taco into some tasty salsa. 🌮

## Browser Compatiblity

| Chrome | Firefox | Safari          | Edge            | IE              | iOS             |
| ------ | ------- | --------------- | --------------- | --------------- | --------------- |
| ✅     | ✅      | ✅<sup>\*</sup> | ✅<sup>\*</sup> | ✅<sup>\*</sup> | ✅<sup>\*</sup> |

<sup>\*</sup> [(requires polyfill)](#polyfill)

## Caveats (TODO)

* transitioning to elements in scrolled lists (via browser back)
* text can get distorted
* styles from nested queries eg: animating `h1` which is styled via `section h1` (might be fixable _a little bit_, not sure if it is worth though, as it is somehow considered bad practices anyhow?)

## Inspired by

* https://github.com/joshwcomeau/react-flip-move
* https://github.com/fram-x/FluidTransitions/
* https://css-tricks.com/native-like-animations-for-page-transitions-on-the-web/

## Huge Thanks to

* [Kent C. Dodds](https://github.com/kentcdodds/) for his inspiring work, such as [kcd-scripts](https://github.com/kentcdodds/kcd-scripts)
* [Ives van Horne](https://github.com/compuives) amongst other for [CodeSandbox](codesandbox.io)

## TODOs

There are tons of ideas for improving `react-dip` such as adding fine grained control to your transitions, but the primary goal will stay to keep the API as symple as possible.

### To be done before anouncing

* [x] add chapter about polyfilling
* [x] render props (of course)
* [x] add support for custom timing functions
* [ ] add complex examples with renderProps, routing etc.
* [ ] add possibility of declaring alternative components that are shown whilst animating
* [ ] add recipie for transitioning lowres- to highres-images
* [ ] export types for flow and typescript
* [ ] add contributing guide lines
* [x] add error handling for props
* [ ] add error handling for refs
* [x] move animation to proper element, allowing for parents with `overflow: hidden` and avoiding z-index issues
* [ ] add Component for Fading in non-dip Elements, after / while a Dip-transions

### For some near future milestone

* [ ] add support for staggering
* [ ] add real tests
* [ ] export types for flowtyped and typescript
* [ ] add optional `placeholder` component that is shown whilst animating
* [ ] add documentation, (maybe even abstractions) for image transitions from low-res to high-res
* [ ] make animation-layer custmizable, so regular items _can_ be in front of them (`z`-wise)
* [ ] investigate possible optimizations for the scrolling issues
