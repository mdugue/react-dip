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
  durationTo?: number,
  element?: string,
  id: string,
  optInCssStyles: string[],
  style?: CSSStyleDeclaration,
}

class Dip extends Component<Props> {
  fromStyle: ?FromType = Dip.getFromStyle(this.props.id)

  static registeredNodes: {[string]: AnimatableElement} = {}
  static unregisterFromNode = (id: string, node: ?AnimatableElement) => {
    if (Dip.registeredNodes[id] === node) {
      delete Dip.registeredNodes[id]
    }
  }
  static registerFromNode = (id: string, node: AnimatableElement) =>
    (Dip.registeredNodes[id] = node)

  static getFromStyle = (id: string) => {
    const fromNode = Dip.registeredNodes[id]
    if (!fromNode) return undefined
    const computedStyle: CSSStyleDeclaration = getComputedStyle(fromNode)
    return {
      rect: fromNode.getBoundingClientRect(),
      computedStyle: {...computedStyle},
    }
  }

  ref: ?AnimatableElement

  componentDidMount() {
    const {ref, fromStyle} = this
    if (ref == null || fromStyle == null) return
    const {durationTo = 200, optInCssStyles = []} = this.props
    const {rect: rectFrom, computedStyle: computedStyleFrom} = fromStyle

    const transTo = ref.getBoundingClientRect()
    const scaleFromX = rectFrom.width / transTo.width
    const scaleFromY = rectFrom.height / transTo.height
    const xFrom = rectFrom.left - transTo.left
    const yFrom = rectFrom.top - transTo.top

    const computedStyleTo = getComputedStyle(ref)

    if (ref.animate) {
      // $FlowFixMe
      ref.animate(
        [
          {
            transform: `translateX(${xFrom}px) translateY(${yFrom}px) scaleX(${scaleFromX}) scaleY(${scaleFromY})`,
            ...pick(computedStyleFrom, optInCssStyles),
          },
          {
            transform: `translateX(0px) translateY(0px) scaleX(1) scaleY(1)`,
            ...pick(computedStyleTo, optInCssStyles),
          },
        ],
        {
          duration: durationTo,
          easing: 'ease-out',
        },
      )
    }
  }

  componentWillUnmount() {
    Dip.unregisterFromNode(this.props.id, this.ref)
  }

  addRef = (ref: ?AnimatableElement) => {
    this.ref = ref
    ref != null && Dip.registerFromNode(this.props.id, ref)
  }

  render() {
    const {
      children,
      style,
      element: Element = 'div',
      durationTo: _ignoreDurationTo_, // eslint-disable-line no-unused-vars
      optInCssStyles: _ignoreOptInCssStyles_, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props // eslint-disable-line
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
