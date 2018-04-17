import React, {Component} from 'react'

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// using https://picsum.photos/
export default class Loader extends Component {
  state = {isLoading: true, images: []}
  async fetchPeople() {
    const result = await fetch('https://picsum.photos/list')
    const json = await result.json()
    const images = shuffle(json)
      .slice(0, 20)
      .map(image => ({
        ...image,
        previewImage: `https://picsum.photos/${image.width / 4}/${image.height /
          4}?image=${image.id}`,
        largeImage: `https://picsum.photos/${image.width}/${
          image.height
        }?image=${image.id}`,
      }))
    this.setState({isLoading: false, images})
  }
  componentDidMount() {
    this.fetchPeople()
  }
  render() {
    if (this.state.isLoading)
      return <small>'loading dummy data from https://picsum.photos/ …'</small>
    return this.props.render(this.state.images)
  }
}
