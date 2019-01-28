import React, { Component } from 'react';
import '../css/movie.css';
import {Link} from 'react-router'
import ReactStars from 'react-stars'
import { Grid, Row, Col, Clearfix, Alert } from 'react-bootstrap';
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
        {/* Page needs to render something while data is loading, or else it renders a blank page*/}
        if (this.state.requestFailed) return <Loader type="line-scale" active />
        if (!this.state.movieData) return <Loader type="line-scale" active />
        return (
            <div className="container">
                <Link to={{ pathname: `/MovieFull/${this.props.id}`}}>
                    <Grid>
                        <Row>
                            {/* Movie poster image with container */}
                            <Col>
                                <img className="movieImg" src={"https://image.tmdb.org/t/p/w200" + this.state.movieData.poster_path}/>
                            </Col>
                            {/* Movie title with overflow container to fit text within div */}
                            <Col>
                                <div className="overflow-container">
                                    <h4 className="movieTitle">{this.state.movieData.title}</h4>
                                </div>
                            </Col>
                            {/* Movie genre */}
                            <Col>
                                <p className="movieGenre">{this.state.movieData.genres[0].name}</p>
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
                    </Grid>
                </Link>
            </div>
        )
    }
}
export default Movie;
