import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import MovieCard from '../components/MovieCard'
import { FaSearch } from 'react-icons/fa'
import '../css/main.css'
import kinoLogo from '../img/logo.png'

class Home extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            data: [],
            query: 'dark',
            loaded: false,
            error: false,
            input: '',
            shadow: 'none'
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    listenScrollEvent = e => {
        if (window.scrollY > 18) {
          this.setState({shadow: '0px 15px 30px rgb(0,0,0,0.2)'})
        } else {
          this.setState({shadow: 'none'})
        }
    }

    componentDidMount() {
        this.fetchData()
        window.addEventListener('scroll', this.listenScrollEvent)
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.query !== this.state.query){
            this.fetchData()
        }
    }

    handleChange(e){
        console.log('changing')
        this.setState({ input: e.target.value})
    }

    handleSubmit(e){
        console.log('submitted')
        e.preventDefault()
        this.setState({ data: [], query: this.state.input })
    }

    fetchData(){
        console.log('fetching')
        //Api call based on user query
        fetch('https://api.themoviedb.org/3/search/movie?api_key=17c21a1abd8ae7be6ee8986389011906&query='+ this.state.query)
        .then( response => {
            if (!response.ok) { throw response }
            return response.json() 
        })
        //Store data in state
        .then( json => {
            this.setState({loaded:true, error:false, data: json.results}) 
        })
        //Catches API limit errors, reloads page until limit resets
        .catch( err => {
            if(err.status === '429'){
                console.log('Error 429')
                this.setState({error:true, loaded: false})
                this.fetchData()
            }
        })
    }

    renderHeader(){
        return(
            <Row>
                <Col>
                    <div style={{ boxShadow: this.state.shadow }} id="header">
                        <img src={kinoLogo} alt="kino"></img>

                        <div id="middle-section">
                            <h1>Showing results for  <span id="result">'{this.state.query}'</span></h1>
                            <div id="sort-container">
                                <ul>
                                    <li> <span id="selected">Revelance</span></li>
                                    <li>Rating</li>
                                    <li>Year</li>
                                </ul>
                            </div>
                        </div>
                        
                        <form onSubmit={this.handleSubmit}>
                            <input 
                                type="text"
                                placeholder="Search movies"
                                onChange={this.handleChange}
                            />
                            <button 
                                type="submit" 
                                id="search"
                            >
                                <FaSearch/>
                            </button>
                        </form>
                    </div>
                </Col>
            </Row>
        )
    }

    renderMovies(){
        var data = this.state.data
        var loaded = this.state.loaded
        //If API call was succesfull and component has data, return grid of movies
        if(loaded && data.length>1){
            return (
                <Row className="movie-feed-row">
                    {data.map((item, i) => (
                            <Col sm={3} key={i}>
                                <MovieCard key={data[i].id} id={data[i].id}/>
                            </Col>
                    ))}
                </Row>
            )
        }
        //TODO: Return placeholder for movie loading 
        else{
            return( 
                <div id="no-movies-found">
                    <h1>No movies found</h1>
                </div>
            )

        }
    }

    render() {
        return (
            <div id="app">
                <Container>
                    {this.renderHeader()}
                    {this.renderMovies()}
                </Container>
            </div>
        );
    }
}

export default Home;