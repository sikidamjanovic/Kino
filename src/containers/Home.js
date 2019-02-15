import React, {Component} from 'react'
import Movie from '../components/Movie'
import Footer from '../components/Footer'
import { Container, Row, Col, CardColumns, Card} from 'react-bootstrap';
import '../css/main.css';
import logo from '../img/kino3.png'
import FadeIn from 'react-fade-in';
import '../css/search.css';

var Loader = require('react-loader');
var opts = {
    lines: 9, // The number of lines to draw
    length: 24, // The length of each line
    width: 7, // The line thickness
    radius: 84, // The radius of the inner circle
    scale: 0.5, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    color: '#ffffff', // CSS color or array of colors
    fadeColor: 'transparent', // CSS color or array of colors
    speed: 0.5, // Rounds per second
    rotate: 0, // The rotation offset
    animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    className: 'spinner', // The CSS class to assign to the spinner
    top: '50%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    position: 'absolute' // Element positioning
};

class Home extends Component{

    constructor(props) {
        super(props)
        this.state = {
            movie: [],
            query: 'star wars',
            loaded: false,
            error: false
        }
    }
    reset() {
        this.setState({movie:[]});
    }

    autoReload(){
        this.fetchData()
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData(){
        this.reset()
        fetch('https://api.themoviedb.org/3/search/movie?api_key=17c21a1abd8ae7be6ee8986389011906&query='+ this.state.query)
        .then( response => {
            if (!response.ok) { throw response }
            return response.json() 
        })
        .then( json => {
            this.setState({loaded:true, error:false, movie: json.results}) 
        })
        .catch( err => {
            if(err.status == '429'){
                this.setState({error:true})
                this.autoReload()
            }
        })
    }

    handleInputChange = () => {
        this.setState({ loaded: false, query: this.search.value }, () => {
            if (this.state.query && this.state.query.length >= 0) {
                if (this.state.query.length % 2 === 0) {
                    this.fetchData()
                }
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
        window.location.reload();
    }

    
    render() {
        var errorMsg = ''
        var map = []
        if(this.state.movie){
            map = Array.from(Array(this.state.movie.length).keys())
        }
        if(this.state.error){
            errorMsg = 'API Request Limit Reached. Reloading...'
        }
        return(
            <div>
                <img className="logo-img-full" src={logo} alt="kino logo" onClick={this.reload}/>
                <div className="header-home">
                        <Container>
                            <Row>
                                <Col xs={12}>
                                    <p className="title">Showing results for: {this.state.query}</p>    
                                </Col>
                                <Col xs={12}>
                                    <div className="search">
                                        <form>
                                            <input
                                                className="search-box"
                                                placeholder="Search movies..."
                                                ref={input => this.search = input}
                                                onChange={this.handleInputChange}
                                                onKeyPress={e => { if (e.key === 'Enter') e.preventDefault(); }}
                                            />
                                        </form>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className="body">
                        <Loader loaded={!this.state.error} options={opts}></Loader>
                        <h4 className="error">{errorMsg}</h4>
                        <CardColumns>
                                {map.map(i=>{
                                    return  <Card>
                                                <FadeIn>
                                                    <Movie id={this.state.movie[i].id}></Movie>
                                                </FadeIn>
                                            </Card>
                                })}
                        </CardColumns> 
                    </div>
                <Footer/> 
            </div>
        )
    }
}

export default Home
