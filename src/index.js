// @flow
import React, { Component } from "react"
import type { Node } from "react"

declare var getComputedStyle: (
  elt: Element,
  pseudoElt?: string
) => CSSStyleDeclaration

export type FromType = {
  rect: ClientRect,
  opacity: string,
  borderRadius: string
}

export type AnimatableElement = HTMLElement & {
  animate?: ({ [string]: string } | {}[], {}) => void
}

type Props = {
  id: string,
  children?: Node,
  style?: CSSStyleDeclaration,
  element?: string
}

class Dip extends Component<Props> {
  fromStyle: ?{
    rect: ClientRect,
    [string]: string
  }

  constructor(props: Props) {
    super(props)
    this.fromStyle = Dip.getFromStyle(this.props.id)
  }

  static registeredNodes: { [string]: AnimatableElement } = {}
  static unregisterFromNode = (id: string, node: ?AnimatableElement) => {
    if (Dip.registeredNodes[id] === node) {
      delete Dip.registeredNodes[id]
    }
  }
  static registerFromNode = (id: string, node: AnimatableElement) =>
    (Dip.registeredNodes[id] = node)

  static getFromStyle = (id: string) => {
    const fromNode = Dip.registeredNodes[id]
    if (!fromNode) return
    const computedStyle: CSSStyleDeclaration = getComputedStyle(fromNode)
    return {
      rect: fromNode.getBoundingClientRect(),
      opacity: computedStyle.opacity,
      borderRadius: computedStyle.borderRadius
    }
  }

  ref: ?AnimatableElement

  componentDidMount() {
    const { ref, fromStyle } = this
    if (ref == null || fromStyle == null) return
    const {
      rect: rectFrom,
      opacity: opacityFrom,
      borderRadius: borderRadiusFrom
    } = fromStyle
    const transTo = ref.getBoundingClientRect()
    const scaleFromX = rectFrom.width / transTo.width
    const scaleFromY = rectFrom.height / transTo.height
    const xFrom = rectFrom.left - transTo.left
    const yFrom = rectFrom.top - transTo.top
    const opacityTo = getComputedStyle(ref).opacity
    const borderRadiusTo = getComputedStyle(ref).borderRadius

    ref.animate &&
      ref.animate(
        [
          {
            transform: `translateX(${xFrom}px) translateY(${yFrom}px) scaleX(${scaleFromX}) scaleY(${scaleFromY})`,
            opacity: opacityFrom,
            borderRadius: borderRadiusFrom
          },
          {
            transform: `translateX(0px) translateY(0px) scaleX(1) scaleY(1)`,
            opacity: opacityTo,
            borderRadius: borderRadiusTo
          }
        ],
        { duration: 200, easing: "ease-out" }
      )
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
      id,
      style,
      element: Element = "div",
      ...rest
    } = this.props
    return (
      <Element
        {...rest}
        ref={this.addRef}
        style={{ ...style, transformOrigin: "left top" }}
      >
        {children}
      </Element>
    )
  }
}

export default Dip
