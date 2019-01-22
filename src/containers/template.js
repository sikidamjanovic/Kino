import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import '../index.css';
import '../css/main.css'

class Template extends Component{

  render() {

    return (
      <MuiThemeProvider>
        <div>
          <main>
                <div>{this.props.children}</div>
          </main>
        </div>
      </MuiThemeProvider>
    )
  }
}


export default Template
