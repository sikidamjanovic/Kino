import React, {Component} from 'react'
import Movie from '../components/Movie'
import { Container, Row, Col, CardColumns, Card} from 'react-bootstrap';
import Loader from 'react-loader'
import '../css/main.css';
import {Link} from 'react-router'
import logo from '../img/kino3.png'
import FadeIn from 'react-fade-in';
import Footer from '../components/Footer'

class Recommender extends Component{
  
    constructor(props) {
        super(props)
        this.state = {
        requestFailed: false,
        title: [],
        movie: [],
        loaded: false
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
        .then(this.setState({loaded:true}))
    }

    render() {
        var map = []
        if(this.state.movie){
            map = Array.from(Array(this.state.movie.length).keys())
        }
        return (
            <div>
                <Link to={{ pathname: `/` }}> <img className="logo-img-full" src={logo} alt="kino logo"/></Link>
                <div className="header">
                    <p className="title">Recommendations for: <b>{this.state.title}</b></p>
                </div>
                <div className="body">
                    <FadeIn>
                        <CardColumns>
                            <Loader loaded={this.state.loaded}>
                                {map.map(i => {
                                    return <Card>
                                        <FadeIn>
                                            <Movie id={this.state.movie[i].id}></Movie>
                                        </FadeIn>
                                    </Card>
                                })}
                            </Loader>
                        </CardColumns>
                    </FadeIn>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Recommender
