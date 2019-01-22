import React, { Component } from 'react';
import '../css/movie.css';
import ReactTooltip from 'react-tooltip'
import {Link} from 'react-router'
import MovieFull from '../containers/MovieFull'

class Movie extends Component {

  constructor(props) {
    super(props)
    this.state = {
      requestFailed: false
    }
  }

  componentDidMount() {
    fetch('https://api.themoviedb.org/3/movie/' + this.props.id + '?api_key=17c21a1abd8ae7be6ee8986389011906')
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
  render() {
    if (this.state.requestFailed) return <p>Failed!</p>
    if (!this.state.movieData) return <p>Loading...</p>
    return (
        <div>
            <div className="imgContainer">
                <Link to={{ pathname: `/MovieFull/${this.props.id}`}}>
                    <img className="movieImg" src={"https://image.tmdb.org/t/p/w200" + this.state.movieData.poster_path}/>
                </Link>
                <p className="movieRating">{this.state.movieData.vote_average} </p>
            </div>
            <div className="movieText">
                <h4 className="movieTitle">{this.state.movieData.title}</h4>
                <p className="movieGenre">{this.state.movieData.genres[0].name}</p>
            </div>
        </div>
    )
  }
}

export default Movie;
