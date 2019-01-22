import React, {Component} from 'react'
import PropTypes from 'prop-types'
import '../css/movie-full.css';
import '../css/main.css';
import {Grid, Row, Col, Clearfix} from 'react-bootstrap'
import ReactStars from 'react-stars'
import { render } from 'react-dom'
import Search from '../components/Search'
import Recommender from '../containers/Recommender'
import myDataset from '../movie_titles.csv';
import {Link} from 'react-router'
import logo from '../img/kino3.png'
import x from '../img/x.png'
import check from '../img/check.png'
import Palette from 'react-palette'
import NavDrawer from '../components/NavDrawer'

const ratingChanged = (newRating) => {
  console.log(newRating)
}

class MovieFull extends Component{

  constructor(props) {
    super(props)
    this.state = {
      requestFailed: false
    }
  }

  componentDidMount() {
    fetch('https://api.themoviedb.org/3/movie/' + this.props.params.id + '?api_key=17c21a1abd8ae7be6ee8986389011906')
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed")
        }
        return response
      })
      .then(d => d.json())
      .then(d => {
        this.setState({
          movieData: d
        })
      }, () => {
        this.setState({
          requestFailed: true
        })
      })
  }


  render () {

    if (this.state.requestFailed) return <p>Failed!</p>
    if (!this.state.movieData) return <p>Loading...</p>

    var rating = (this.state.movieData.vote_average)/2
    var title = (this.state.movieData.title)

    return (
      <div className="movie-full-page">
        <NavDrawer/>
        <Search/>
        <img className="logo-img-full" src={logo}/>
        <img className="movie-full-image"src={"https://image.tmdb.org/t/p/w1280" + this.state.movieData.poster_path}/>
        <Palette image={"https://image.tmdb.org/t/p/w1280" + this.state.movieData.backdrop_path}>
          {palette => (
            <div>    
              <img className="movie-full-backdrop"src={"https://image.tmdb.org/t/p/w1280" + this.state.movieData.backdrop_path}/>
              <div className="movie-full-background">
                    <h1 className="movie-full-title">{this.state.movieData.title}</h1>
                    <p className="movie-full-genres"  style={{ color: palette.vibrant }}>{this.state.movieData.genres[0].name} | {this.state.movieData.runtime} Minutes | {this.state.movieData.release_date}</p>
                    <p className="movie-full-overview">{this.state.movieData.overview}</p>
                    <ReactStars
                      count={5}
                      value={rating}
                      size={24}
                      color1={palette.darkMuted}
                      color2={palette.vibrant}
                      className={'stars'}
                    />
                    <p style={{ color: palette.vibrant }} className="movie-full-vote">{this.state.movieData.vote_average} /10</p>
                    <Link to= {{pathname: `/Recommender/${this.state.movieData.id}`}}>
                      <p style={{borderColor: palette.vibrant, color: palette.vibrant }}className="recom-button" onClick='reload()'>Recommendations</p>
                    </Link>
                    <img id="netflix-img"src={x}/>
                    <div id="netflix-text">On Netflix</div>
              </div>
         </div>
          )}
         </Palette>
      </div>
    )
  }
}

export default MovieFull
