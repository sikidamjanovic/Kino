import React, { Component } from 'react';
import '../css/movie.css';
import {Link} from 'react-router'
import ReactStars from 'react-stars'
import { Container, Row, Col } from 'react-bootstrap';
var Loader = require('react-loaders').Loader;

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
        if (this.state.requestFailed) return <Loader type="line-scale" active />
        if (!this.state.movieData) return <Loader type="line-scale" active />

        var imgSrc = ''
        let genres = this.state.movieData.genres
        let posterPath = this.state.movieData.poster_path

        if(genres.length > 0){
            var genre = genres[0].name
            for (let i = 1; i < genres.length - 1; i++) {
                genre += " / "+ genres[i].name
            }
        }else{
            genre = "Unknown"
        }

        if(posterPath){
            imgSrc = <img className="movieImg" src={"https://image.tmdb.org/t/p/w500" + posterPath} alt="movie poster"/>
        }

        return (
            <div className="hvr-grow">
                <Link to={{ pathname: `/MovieFull/${this.props.id}`}}>
                    <Container className="movie-container">
                        <Row>
                            <Col>
                                {imgSrc}
                            </Col> 
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <h4 className="movieTitle">{this.state.movieData.title} ({this.state.movieData.release_date.substring(0, 4)})</h4>
                            </Col>
                            <Col xs={12}>
                                <p className="movieGenre">{genre}</p>
                            </Col> 
                            <Col>
                                <ReactStars
                                    count={5}
                                    value={this.state.movieData.vote_average / 2}
                                    color1={'#7c6b33'}
                                    color2={'#ccaa3c'}
                                    className={'stars'}
                                />
                                <p className="movieRating">{this.state.movieData.vote_average} / 10 </p>
                            </Col>
                        </Row>
                    </Container>
                </Link>
            </div>
        )
    }
}
export default Movie;
