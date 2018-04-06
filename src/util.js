// @flow
export function pick(o: {}, fields: string[]) {
  return fields.reduce((a, x) => {
    if (o.hasOwnProperty(x)) a[x] = o[x]
    return a
  }, {})
}
