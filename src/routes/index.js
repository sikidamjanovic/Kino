import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Template from '../containers/template'
import Home from '../containers/Home'
import MovieFull from '../containers/MovieFull'
import Recommender from '../containers/Recommender'

const createRoutes = () => {
  return(
    <Route
      path='/'
      component={Template}
    >
    <IndexRoute
      component={Home}
    />
    <Route
      path={'Home'}
      component={Home}
    />

    <Route
      path='/MovieFull/:id'
      component={MovieFull}
    />

    <Route
      path='/MovieFull/:id'
      component={MovieFull}
    />

    <Route
      path='/Recommender/:id'
      component={Recommender}
    />

    </Route>
  )
}

const Routes = createRoutes()

export default Routes