import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router'
import '../css/search.css';
import {Textfit} from 'react-textfit'

class Search extends Component {

  constructor(props) {
     super(props)
     this.state = {
       query: '',
       searchData: [],
       loading: true
     }
   }

  getInfo = () => {
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=17c21a1abd8ae7be6ee8986389011906&total_results=1&query='+ this.state.query)
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
      else if (this.state.query.length == 0){
          this.setState({
            searchData: ''
          })
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
    return (
      <div className="search">
        <form>
          <input
            className="search-box"
            placeholder="Search movies..."
            ref={input => this.search = input}
            onChange={this.handleInputChange}
          />
        </form>
        <div className="tester">
            <div className="searchResults">
                {this.state.searchData.map(i=> (
                <Link to={{pathname: `/MovieFull/${i.id}`}}>
                    <Textfit mode="single" max={14}>
                        <p onClick='reload()' className="search-link">{i.title} ({i.release_date})</p>
                    </Textfit>
                </Link>
                ))}
            </div>
        </div>
      </div>
    )
  }
}

export default Search
