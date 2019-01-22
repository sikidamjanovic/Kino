import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Template from '../containers/template'
import Home from '../containers/Home'
import Lists from '../containers/Lists'
import Recommender from '../containers/Recommender'
import MovieFull from '../containers/MovieFull'
import Upcoming from '../containers/Upcoming'
import TopRated from '../containers/TopRated'
import NowPlaying from '../containers/NowPlaying'

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
      path={'Upcoming'}
      component={Upcoming}
    />

    <Route
      path='/MovieFull/:id'
      component={MovieFull}
    />

    <Route
      path='/Recommender/:id'
      component={Recommender}
    />

    <Route
      path={'TopRated'}
      component={TopRated}
    />

    <Route
      path={'Lists'}
      component={Lists}
    />

    <Route
      path={'Recommender'}
      component={Recommender}
    />

    <Route
      path={'NowPlaying'}
      component={NowPlaying}
    />

    </Route>
  )
}

const Routes = createRoutes()

export default Routes