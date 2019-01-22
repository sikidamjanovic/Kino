import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router'
import MovieFull from '../containers/MovieFull'
import '../css/search.css';
import Divider from 'material-ui/Divider'

const API_KEY = '17c21a1abd8ae7be6ee8986389011906'
const API_URL = 'https://api.themoviedb.org/3/search/movie'

class RecSearch extends Component {

  constructor(props) {
     super(props)
     this.state = {
       query: '',
       searchData: [],
       loading: true
     }
   }

  getInfo = () => {
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=17c21a1abd8ae7be6ee8986389011906&query='+ this.state.query)
      .then(({data}) => {
        this.setState({
          searchData: data.results,
          loading: false
        })
      })
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      }
    })
  }

  onKeyDown = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      }
      else {
        this.setState({
          query: '',
        })
      }
    })
  }

  reload = function() {
      if(!window.location.hash) {
          window.location.reload();
      }
  }

  render() {
    let elements = [];
    for(let i = 0; i < 10; i++) {
        elements.push(
          <Link to={{
              pathname: `/Recommender/${i.id}`
            }}>
            <p onClick='reload()' className="search-link">{this.state.searchData[i].title} ({this.state.searchData[i].release_date})</p>
          </Link>
      )
    }
    return (
      <div className="rec-search">
        <form>
          <input
            className="rec-search-box"
            placeholder="Search movie..."
            ref={input => this.search = input}
            onChange={this.handleInputChange}
          />
        </form>
        <div className="rec-searchResults">
          {elements}
        </div>
      </div>
    )
  }
}

export default RecSearch
