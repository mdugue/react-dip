const fs = require('fs')

const data = `
// @flow

export * from '../src/index.js'
export { default } from '../src/index.js'
`

fs.readdir('./dist', (err, files) => {
  if (err) {
    /* eslint-disable */
    console.warn(
      './dist Folder not found. Make sure it exists and that you have read and write access',
    )
    /* eslint-enable */
  }
  const relevantFiles = files.filter(
    file =>
      (file.includes('.cjs.') || file.includes('.esm')) &&
      !(file.endsWith('.map') || file.endsWith('.flow')),
  )
  relevantFiles.forEach(file => fs.writeFileSync(`./dist/${file}.flow`, data))
})
