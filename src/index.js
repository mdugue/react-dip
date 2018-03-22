// @flow
import type { FromType } from "./FromType"
import React, { Component } from "react"
import type { Node, Element } from "react"

export type AnimatableElement = HTMLElement & {animate?: ({[string]: string} | {}[], {}) => void}

type Props = {
  id: string,
  children?: Node,
  style?: CSSStyleDeclaration,
  component?: Node // TODO: Add string
}

class Dip extends Component<Props> {
  constructor(props) {
    super(props)
    this.fromStyle = Dip.getFromStyle(this.props.id)
  }

  static registeredNodes = {}
  static unregisterFromNode = (id: string, node: AnimatableElement) => {
    if (Dip.registeredNodes[id] === node) {
      delete Dip.registeredNodes[id]
    }
  }
  static registerFromNode = (id: string, node: AnimatableElement) =>
    (Dip.registeredNodes[id] = node)

  static getFromStyle = (id: string) => {
    const fromNode = Dip.registeredNodes[id]
    if (!fromNode) return
    const computedStyle = window.getComputedStyle(fromNode)
    return {
      rect: fromNode.getBoundingClientRect(),
      opacity: computedStyle.opacity,
      borderRadius: computedStyle.borderRadius
    }
  }

  ref: ?AnimatableElement

  componentDidMount() {
    const transitioningFrom: FromType = this.fromStyle
    if (!transitioningFrom) return
    const {
      rect: rectFrom,
      opacity: opacityFrom,
      borderRadius: borderRadiusFrom
    } = transitioningFrom
    const transTo = this.ref.getBoundingClientRect()
    const scaleFromX = rectFrom.width / transTo.width
    const scaleFromY = rectFrom.height / transTo.height
    const xFrom = rectFrom.left - transTo.left
    const yFrom = rectFrom.top - transTo.top
    const opacityTo = window.getComputedStyle(this.ref).opacity
    const borderRadiusTo = window.getComputedStyle(this.ref).borderRadius
    /*flow-ignore*/
    this.ref && this.ref.animate && this.ref.animate(
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
      component: Component = "div",
      ...rest
    } = this.props
    return (
      <Component
        {...rest}
        ref={this.addRef}
        style={{ ...style, transformOrigin: "left top" }}
      >
        {children}
      </Component>
    )
  }
}

export default Dip
