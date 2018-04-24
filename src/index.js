// @flow
// TODO Implement optInCssStyles, allow single strings
import React, {Component} from 'react'
import type {Node} from 'react' // eslint-disable-line no-duplicate-imports
import {pick} from './util'
import {webAnimations as animate} from './animate'

declare var getComputedStyle: (
  elt: Element,
  pseudoElt?: string,
) => CSSStyleDeclaration

export type FromType = {
  rect: ClientRect,
  computedStyle: {},
}

type Props = {
  children?: Node,
  dipId: string,
  duration?: number,
  easing?: string,
  element?: string,
  optInCssStyles: string[],
  render?: ({ref: (?HTMLElement) => void, style: {}}) => Node,
  style?: CSSStyleDeclaration,
}

function createAnimationDomLayer() {
  if (typeof document === 'undefined') return undefined
  const animationLayer = document.createElement('div')
  animationLayer.id = 'dip-animations'
  animationLayer.style.cssText =
    'position: absolute; top: 0; left: 0; pointer-events: none; backfaceVisibilty: hidden;'
  document.body && document.body.appendChild(animationLayer)
  return animationLayer
}

function cloneElementWithDimensions(element: HTMLElement) {
  const rect = element.getBoundingClientRect()
  const clone = element.cloneNode(true)

  clone.style.position = 'absolute'
  clone.style.width = `${rect.width}px`
  clone.style.height = `${rect.height}px`
  clone.style.top = `${window.scrollY + rect.top}px`
  clone.style.left = `${window.scrollX + rect.left}px`
  clone.style.transformOrigin = 'left top'
  clone.style.margin = '0'
  clone.style.backfaceVisibility = 'hidden'

  return {element: clone, rect}
}

function calcTransformParams(rectFrom: ClientRect, rectTo: ClientRect) {
  const xFrom = rectFrom.left - rectTo.left
  const yFrom = rectFrom.top - rectTo.top
  const xTo = 0
  const yTo = 0
  const scaleFromX = rectFrom.width / rectTo.width
  const scaleFromY = rectFrom.height / rectTo.height

  return {xFrom, yFrom, xTo, yTo, scaleFromX, scaleFromY}
}

function calcStyleParams(
  styleStartNode: {},
  styleDestinationNode: {},
  optInCssStyles: string[],
) {
  const styleStart = pick(styleStartNode, optInCssStyles)
  const styleDestination = pick(styleDestinationNode, optInCssStyles)
  return {styleStart, styleDestination}
}

class Dip extends Component<Props> {
  startNodeValues: ?FromType = Dip.getStartNodeValues(this.props.dipId)
  animationElement: ?HTMLElement
  rafId: ?number

  static animationLayer = createAnimationDomLayer()
  static registeredNodes: {[string]: HTMLElement} = {}

  static unregisterStartNode = (id: string, node: ?HTMLElement) => {
    if (Dip.registeredNodes[id] === node) {
      delete Dip.registeredNodes[id]
    }
  }
  static registerStartNode = (dipId: string, node: HTMLElement) =>
    (Dip.registeredNodes[dipId] = node)

  static getStartNodeValues = (dipId: string) => {
    const startNode = Dip.registeredNodes[dipId]
    if (!startNode) return undefined
    const computedStyle = getComputedStyle(startNode)
    return {
      rect: startNode.getBoundingClientRect(),
      computedStyle: {...computedStyle},
    }
  }
  ref: ?HTMLElement

  appendAnimationRef = (element: HTMLElement) => {
    this.animationElement = element
    const {animationLayer} = Dip
    animationLayer && animationLayer.appendChild(element)
  }

  removeAnimationRef = () => {
    this.animationElement &&
      this.animationElement.parentNode &&
      Dip.animationLayer &&
      Dip.animationLayer.removeChild(this.animationElement)
    this.animationElement = undefined
  }

  componentDidMount() {
    const {ref, startNodeValues} = this
    if (ref == null || startNodeValues == null) return

    const {
      easing = 'ease-out',
      duration = 200,
      optInCssStyles = [],
    } = this.props

    const {
      element: animationElement,
      rect: rectTo,
    } = cloneElementWithDimensions(ref)
    this.appendAnimationRef(animationElement)

    const transformParams = calcTransformParams(startNodeValues.rect, rectTo)
    const optionalStyleParams = calcStyleParams(
      startNodeValues.computedStyle,
      getComputedStyle(ref),
      optInCssStyles,
    )

    ref.style.visibility = 'hidden'
    animate(
      animationElement,
      optionalStyleParams,
      transformParams,
      duration,
      easing,
    ).then(() => {
      ref.style.visibility = 'visible'
      this.removeAnimationRef()
    })
  }

  componentWillUnmount() {
    Dip.unregisterStartNode(this.props.dipId, this.ref)
    this.removeAnimationRef()
    window.cancelAnimationFrame(this.rafId)
  }

  addRef = (ref: ?HTMLElement) => {
    this.ref = ref
    ref != null && Dip.registerStartNode(this.props.dipId, ref)
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
      ...rest
    } = this.props

    this.logWarnings()

    if (render != null)
      return render({
        ...rest,
        ref: this.addRef,
      })
    return (
      <Element {...rest} ref={this.addRef}>
        {children}
      </Element>
    )
  }
}

export default Dip
