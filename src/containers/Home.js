import React, {Component} from 'react'
import Movie from '../components/Movie'
import { Grid, Row, Col} from 'react-bootstrap';
import '../css/main.css';
import Search from '../components/Search'
import tmdbLogo from'../img/tmdb.png'
import NavDrawer from '../components/NavDrawer'
import {Link} from 'react-router'
import logo from '../img/kino3.png'
import FadeIn from 'react-fade-in';
import '../css/search.css';
var Loader = require('react-loader');

class Home extends Component{

    constructor(props) {
        super(props)
        this.state = {
            movie: [],
            query: 'star wars',
            loaded: false,
            noResults: false
        }
    }
    reset() {
        this.setState({movie:[]});
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData(){
        this.reset()
        fetch('https://api.themoviedb.org/3/search/movie?api_key=17c21a1abd8ae7be6ee8986389011906&query='+ this.state.query)
            .then(response=> response.json())
            .then( ({results: movie}) => this.setState({movie}))
            .then(this.setState({loaded:true}))
    }

    handleInputChange = () => {
        this.setState({ loaded: false, query: this.search.value }, () => {
            if (this.state.query && this.state.query.length > 0) {
                this.fetchData()
            }
        })
    }

    onKeyDown = () => {
        this.setState({ query: this.search.value }, () => {
            if (this.state.query && this.state.query.length >= 1) {
                if (this.state.query.length % 2 === 0) {
                    this.fetchData()
                }
            }
        })
    }

    reload = function() {
        if(!window.location.hash) {
            window.location.reload();
        }
    }

    render() {
        if(this.state.movie){
            var map = Array.from(Array(this.state.movie.length).keys())
        }else{
            var map = []
        }
        return(
            <div>
                <div className="main-page">
                    <Link to= {{pathname: `/`}}>
                        <img className="logo-img-full" src={logo}/>
                    </Link>
                    <NavDrawer/>
                        <Grid>
                            <Row>
                                <Col xs={12}>
                                    <h1 className="pageTitle">Showing results for: {this.state.query}</h1>    
                                </Col>
                                <Col xs={12}>
                                    <div className="search">
                                        <form>
                                            <input
                                                className="search-box"
                                                placeholder="Search movies..."
                                                ref={input => this.search = input}
                                                onChange={this.handleInputChange}
                                            />
                                        </form>
                                    </div>
                                </Col>
                            </Row>
                
                            <Row className="movie-row-container">
                                <div className="loader-container">
                                    <Loader color="white" loaded={this.state.loaded}>
                                        {map.map(i=>{
                                            return  <Col className="movie-container" key={map.id} md={2} sm={3} xs={6}>
                                                        <FadeIn>
                                                            <Movie id={this.state.movie[i].id}></Movie>
                                                        </FadeIn>
                                                    </Col>
                                        })}
                                    </Loader>
                                </div>
                            </Row>
                            <Row>
                                <div>
                                    <footer id="footer">
                                        <p className="footer-text"> Repo: <a href="https://github.com/sikidamjanovic/Kino">kino@github.com</a>.</p>
                                        <p>&copy; 2018 Sinisa Damjanovic</p>
                                        <img src={tmdbLogo} id="tmdbLogo" alt="TMDBLogo"/>
                                    </footer>
                                </div>
                            </Row>
                        </Grid>
                </div>
            </div>
        )
    }
}

export default Home
