import React, {Component} from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Menu from 'material-ui/svg-icons/navigation/menu'
import {Link} from 'react-router'
import PopularIcon from 'material-ui/svg-icons/action/trending-up'
import UpcomingIcon from 'material-ui/svg-icons/action/timeline'
import NowPlayingIcon from 'material-ui/svg-icons/av/play-circle-outline'
import ListIcon from 'material-ui/svg-icons/action/list'
import TopRatedIcon from 'material-ui/svg-icons/action/stars'
import '../css/nav-drawer.css'

class NavDrawer extends Component{

  state = {
    open: false
  }

  toggle = () => {
    this.setState((prevState, props)=>{
      return{
        open: !prevState.open
      }
    })
  }

  render(){
    return (
      <div>
          <Menu 
            onTouchTap={this.toggle}
            className="menu-button"
            />

            <Drawer
            open = {this.state.open}
            className="nav-drawer"
            >
          <Link
            to={'/'}>
            <MenuItem
              primaryText = {"Popular"}
              onTouchTap={this.toggle}
              leftIcon = {<PopularIcon/>}
              underlineShow={false}
            />
          </Link>
          <Link
            to={'/TopRated'}>
            <MenuItem
              primaryText = {"Top Rated"}
              onTouchTap={this.toggle}
              leftIcon = {<TopRatedIcon/>}
              underlineShow={false}
            />
          </Link>
          <Link
            to={'/Upcoming'}>
            <MenuItem
              primaryText = {"Upcoming"}
              onTouchTap={this.toggle}
              leftIcon = {<UpcomingIcon/>}
              underlineShow={false}
            />
            <Link
              to={'/NowPlaying'}>
              <MenuItem
                primaryText = {"Now Playing"}
                onTouchTap={this.toggle}
                underlineShow={false}
                leftIcon = {<NowPlayingIcon/>}
              />
            </Link>
          <Divider/>
          </Link>
        </Drawer>
      </div>
    )
  }
}

export default NavDrawer
