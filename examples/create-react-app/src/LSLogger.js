import React, {Component} from 'react'

export default class LSLogger extends Component<void> {
  constructor(props) {
    super(props)
    console.log('LSL constructor', props.id)
  }
  componentDidMount() {
    console.log('LSL didMount', this.props.id)
  }
  componentWillUnmount() {
    console.log('LSL willUnMount', this.props.id)
  }
  render() {
    console.log('LSL render', this.props.id)
    return (
      <div
        key={this.props.id}
        id={this.props.id}
        ref={ref => console.log('LSL ref created', this.props.id, ref)}
      >
        {this.props.id}
      </div>
    )
  }
}
