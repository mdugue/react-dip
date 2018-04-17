import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Loader from './dummyDataLoader'
import List from './List'
import Detail from './Detail'
import './styles.css'

export default () => (
  <Loader
    render={images => (
      <Switch>
        <Route path="/contact/:index">
          {({match}) => <Detail images={images} index={match.params.index} />}
        </Route>
        <Route path="/" exact>
          <List images={images} />
        </Route>
      </Switch>
    )}
  />
)
