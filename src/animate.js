//@flow
/**
 * Not sure yet which animation type will be the "best", so first I keep
 *   - web animations api,
 *   - CSS-Transitions &
 *   - requestAnimationFrame
 *  here in the code, for easy switching. Propably won't be exposed to the user.
 */

type AnimatableElement = HTMLElement & {
  animate?: ({[string]: string} | {}[], {}) => void,
}

function applyCssObject(el: HTMLElement, styles: {}) {
  // $FlowFixMe
  for (var property in styles) el.style[property] = styles[property] // eslint-disable-line
}

type FunctionType = (
  element: AnimatableElement,
  {styleStart?: {}, styleDestination?: {}},
  {[string]: number},
  duration: number,
  easing: string,
) => Promise<void>

/*
 * animate using css transforms
 */
export const cssTransition: FunctionType = (
  element,
  {styleStart, styleDestination},
  {xFrom, yFrom, scaleFromX, scaleFromY, xTo, yTo},
  duration,
  easing,
) => {
  applyCssObject(element, {
    styleStart,
    transform: `translate3d(${xFrom}px, ${yFrom}px, 0) scale3d(${scaleFromX}, ${scaleFromY}, 1)`,
  })
  return window.requestAnimationFrame(() =>
    applyCssObject(element, {
      styleDestination,
      transform: `translate3d(${xTo}px, ${yTo}px, 0)`,
      transition: `${duration}ms all ${easing}`,
    }),
  )
}

/*
 * animate using web animations api
 */
export const webAnimations: FunctionType = (
  element,
  {styleStart, styleDestination},
  {xFrom, yFrom, scaleFromX, scaleFromY, xTo, yTo},
  duration,
  easing,
) => {
  if ('animate' in element) {
    const returnPromise = new Promise(resolve => {
      // $FlowFixMe
      const animation = element.animate(
        [
          {
            ...styleStart,
            transform: `translate3d(${xFrom}px, ${yFrom}px, 0) scale3d(${scaleFromX}, ${scaleFromY}, 1)`,
          },
          {
            ...styleDestination,
            transform: `translate3d(${xTo}px, ${yTo}px, 0)`,
          },
        ],
        {
          duration,
          easing,
          fill: 'both',
        },
      )
      animation.onfinish = () => {
        resolve()
      }
    })
    return returnPromise
  }
  return new Promise((resolve, reject) =>
    reject(new Error('web animations are not supported by this platform')),
  )
}

/*
 * animate using requestAnimationFrame
 * TODO
 */
