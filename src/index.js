// @flow
// TODO Implement optInCssStyles, allow single strings
import React, {Component} from 'react'
import type {Node} from 'react' // eslint-disable-line no-duplicate-imports
import {pick} from './util'

declare var getComputedStyle: (
  elt: Element,
  pseudoElt?: string,
) => CSSStyleDeclaration

export type FromType = {
  rect: ClientRect,
  computedStyle: {},
}

export type AnimatableElement = HTMLElement & {
  animate?: ({[string]: string} | {}[], {}) => void,
}

type Props = {
  children?: Node,
  dipId: string,
  duration?: number,
  easing?: string,
  element?: string,
  optInCssStyles: string[],
  render?: ({ref: (?AnimatableElement) => void, style: {}}) => Node,
  style?: CSSStyleDeclaration,
}

function createAnimationDomLayer() {
  const animationLayer = document.createElement('div')
  animationLayer.id = 'dip-animations'
  animationLayer.style.cssText = 'position: absolute;'
  document.body.appendChild(animationLayer)
  return animationLayer
}

class Dip extends Component<Props> {
  fromStyle: ?FromType = Dip.getFromStyle(this.props.dipId)
  animationRef: ?AnimatableElement

  static animationLayer = createAnimationDomLayer()
  static registeredNodes: {[string]: AnimatableElement} = {}

  static unregisterFromNode = (id: string, node: ?AnimatableElement) => {
    if (Dip.registeredNodes[id] === node) {
      delete Dip.registeredNodes[id]
    }
  }
  static registerFromNode = (dipId: string, node: AnimatableElement) =>
    (Dip.registeredNodes[dipId] = node)

  static getFromStyle = (dipId: string) => {
    const fromNode = Dip.registeredNodes[dipId]
    if (!fromNode) return undefined
    const computedStyle: CSSStyleDeclaration = getComputedStyle(fromNode)
    return {
      rect: fromNode.getBoundingClientRect(),
      computedStyle: {...computedStyle},
    }
  }
  ref: ?AnimatableElement

  animate = () => {}

  createAndAppemdAnimationRef = () => {
    const {ref} = this
    if (!ref)
      throw Error('could not create animation Ref as ref is not defined')
    const animationRef: AnimatableElement = ref.cloneNode(true)
    this.animationRef = animationRef
    Dip.animationLayer.appendChild(animationRef)
    return animationRef
  }

  removeAnimationRef = () => {
    this.animationRef &&
      this.animationRef.parentNode &&
      Dip.animationLayer.removeChild(this.animationRef)
    this.animationRef = undefined
  }

  calcTransformParams(
    rectFrom: ClientRect,
    rectTo: ClientRect,
    rectIntermediate: ClientRect,
  ) {
    const xFrom = rectFrom.left - rectIntermediate.left
    const yFrom = rectFrom.top - rectIntermediate.top
    const xTo = rectTo.left - rectIntermediate.left
    const yTo = rectTo.top - rectIntermediate.top
    const scaleFromX = rectFrom.width / rectTo.width
    const scaleFromY = rectFrom.height / rectTo.height

    return {xFrom, yFrom, xTo, yTo, scaleFromX, scaleFromY}
  }

  componentDidMount() {
    const {ref, fromStyle} = this
    if (ref == null || fromStyle == null) return
    const {
      easing = 'ease-out',
      duration = 200,
      optInCssStyles = [],
    } = this.props

    const computedStyleTo = getComputedStyle(ref)
    const animationRef = this.createAndAppemdAnimationRef()

    const {
      xFrom,
      yFrom,
      xTo,
      yTo,
      scaleFromX,
      scaleFromY,
    } = this.calcTransformParams(
      fromStyle.rect,
      ref.getBoundingClientRect(),
      animationRef.getBoundingClientRect(),
    )

    if (animationRef.animate) {
      ref.style.visibility = 'hidden'
      // $FlowFixMe
      const animation = animationRef.animate(
        [
          {
            ...pick(fromStyle.computedStyle, optInCssStyles),
            transform: `translateX(${xFrom}px) translateY(${yFrom}px) scaleX(${scaleFromX}) scaleY(${scaleFromY})`,
          },
          {
            ...pick(computedStyleTo, optInCssStyles),
            transform: `translateX(${xTo}px) translateY(${yTo}px) scaleX(1) scaleY(1)`,
          },
        ],
        {
          duration,
          easing,
        },
      )
      animation.onfinish = () => {
        this.removeAnimationRef()
        ref.style.visibility = 'visible'
      }
    }
  }

  componentWillUnmount() {
    Dip.unregisterFromNode(this.props.dipId, this.ref)
    this.removeAnimationRef()
  }

  addRef = (ref: ?AnimatableElement) => {
    this.ref = ref
    ref != null && Dip.registerFromNode(this.props.dipId, ref)
  }

  /**
   * notify the user if props are not set correctly via console.log / console.warn
   */
  logWarnings = () => {
    const {dipId, element, render} = this.props // eslint-disable-line no-unused-vars // eslint-disable-line no-unused-vars
    /* eslint-disable */
    if (dipId == null) {
      console.error(
        "please specify a `dipId`-Prop. Otherwise you won't see any or unexcpected animations. See https://github.com/mdugue/react-dip",
      )
    }
    if (render != null && element != null) {
      console.warn(
        'the `element`-Prop will be ignored as you specified a `render`-Prop. See https://github.com/mdugue/react-dip',
      )
    }
    /* eslint-disable */
  }

  render() {
    const {
      children,
      dipId: _ignoreDipId_, // eslint-disable-line no-unused-vars,
      duration: _ignoreDuration_, // eslint-disable-line no-unused-vars
      element: Element = 'div',
      optInCssStyles: _ignoreOptInCssStyles_, // eslint-disable-line no-unused-vars
      render,
      style,
      ...rest
    } = this.props

    this.logWarnings()

    if (render != null)
      return render({
        ...rest,
        ref: this.addRef,
        style: {
          ...style,
          transformOrigin: 'left top',
        },
      })
    return (
      <Element
        {...rest}
        ref={this.addRef}
        style={{...style, transformOrigin: 'left top'}}
      >
        {children}
      </Element>
    )
  }
}

export default Dip
