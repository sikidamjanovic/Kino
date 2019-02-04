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
                this.setState({ movieData: d })
            }, () => {
                this.setState({ requestFailed: true })
            })
    }

    render() {
        if (this.state.requestFailed) return <Loader type="line-scale" active />
        if (!this.state.movieData) return <Loader type="line-scale" active />

        var genre = ''
        var imgSrc = ''

        if(this.state.movieData.genres.length > 0){
            genre = this.state.movieData.genres[0].name
        }else{
            genre = "Unknown"
        }

        if(this.state.movieData.poster_path){
            imgSrc = <img className="movieImg" src={"https://image.tmdb.org/t/p/w500" + this.state.movieData.poster_path} alt="movie poster"/>
        }

        return (
            <div>
                <Link to={{ pathname: `/MovieFull/${this.props.id}`}}>
                    <Container className="movie-container">
                        <Row>
                            {/* Movie poster image with container */}
                            <Col>
                                {imgSrc}
                            </Col> 
                        </Row>
                        <Row>
                            {/* Movie title with overflow container to fit text within div */}
                            <Col xs={12}>
                                <h4 className="movieTitle">{this.state.movieData.title}</h4>
                            </Col>
                            {/* Movie genre */}
                            <Col xs={12}>
                                <p className="movieGenre">{genre}</p>
                            </Col>
                            {/* React library for stars which uses the movies rating / 2 (since stars are out of 5 and rating is out of 10) */}    
                            <Col>
                                <ReactStars
                                    count={5}
                                    value={this.state.movieData.vote_average / 2}
                                    size={10}
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
