// @flow
export function pick(o: {}, fields: string[]) {
  return fields.reduce((a, x) => {
    if (o.hasOwnProperty(x)) a[x] = o[x]
    return a
  }, {})
}

// TODO Implement if needed
export function omit(o: {}) {
  return o
}
