import React, {Component} from 'react'
import Movie from '../components/Movie'
import { Grid, Row, Col, Clearfix, Alert } from 'react-bootstrap';
import '../css/main.css';
import Search from '../components/Search'
import RecSearch from '../components/RecSearch'
import tmdbLogo from'../img/tmdb.png'
import NavDrawer from '../components/NavDrawer'
import {Link} from 'react-router'
import logo from '../img/kino3.png'
import FadeIn from 'react-fade-in';

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
    var map = Array.from(Array(this.state.movie.length).keys())
    return(
        <div className="main-page">
            <Link to= {{pathname: `/`}}>
                <img className="logo-img-full" src={logo}/>
            </Link>
            <NavDrawer/>
            <FadeIn>
            <Grid>
                <Row>
                    <Col sm ={12} xs={6} smOffset={0} xsOffset={3}>
                        <h1 className="recommender-title">Recommendations for: <b>{this.state.title}</b></h1>    
                    </Col>
                    <Col xs={12}>
                        <div className="search-container"><Search/></div>
                    </Col>
                </Row>
                <Row className="movie-row-container">
                    {map.map(i=>{
                        return <Col className="movie-container" key={map.id} md={2} sm={3} xs={6}>
                                    <Movie id={this.state.movie[i].id}></Movie>
                               </Col>
                    })}
                </Row>                
            </Grid>
            </FadeIn>
            <footer id="footer">
                <p className="footer-text"> Repo: <a href="https://github.com/sikidamjanovic/Kino">
                kino@github.com</a>.</p>
                <p>&copy; 2018 Sinisa Damjanovic</p>
                <img src={tmdbLogo} id="tmdbLogo" alt="TMDBLogo"/>
            </footer>        
        </div>
    )
  }
}

export default Recommender
