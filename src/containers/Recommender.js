import React, {Component} from 'react'
import Movie from '../components/Movie'
import { Grid, Row, Col, Clearfix, Alert } from 'react-bootstrap';
import '../css/main.css';
import Search from '../components/Search'
import RecSearch from '../components/RecSearch'
import tmdbLogo from'../img/tmdb.png'
import NavDrawer from '../components/NavDrawer'

class Recommender extends Component{
  
  constructor(props) {
    super(props)
    this.state = {
      requestFailed: false,
      title: [],
      movie: [],
    }
  }

  componentDidMount() {
    this.fetchData()
    this.fetchTitle()
  }

  fetchTitle(){
    fetch('https://api.themoviedb.org/3/movie/'+ this.props.params.id +'?api_key=17c21a1abd8ae7be6ee8986389011906')
      .then(response=> response.json())
      .then(({title}) => this.setState({title}))
  }

  fetchData(){
      fetch('https://api.themoviedb.org/3/movie/' + this.props.params.id + '/recommendations?api_key=17c21a1abd8ae7be6ee8986389011906')
      .then(response=> response.json())
      .then( ({results: movie}) => this.setState({movie}))
  }

  render() {

    if (this.state.movie.length === 0) {
      return (<div>Loading data...</div>)
    }
    let menuItems = [];
    for (var i = 0; i < 20; i++) {
      menuItems.push(<div className="movieListing"><Movie id={this.state.movie[i].id}/></div>)
    }

    return(
      <div>
        <div className="main-page">
        <NavDrawer/>
        <h1 className="recommender-title">Recommendations for: <b>{this.state.title}</b></h1>
          <Search/>
          <div className="movie-block">{menuItems}</div>
        </div>
        <div>
          <footer id="footer">
              <p className="footer-text"> Repo: <a href="https://github.com/sikidamjanovic/Kino">
              kino@github.com</a>.</p>
              <p>&copy; 2018 Sinisa Damjanovic</p>
            <img src={tmdbLogo} id="tmdbLogo" alt="TMDBLogo"/>
          </footer>
        </div>
      </div>
    )
  }
}

export default Recommender
