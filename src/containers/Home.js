import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import MovieCard from '../components/MovieCard'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
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
            shadow: 'none',
            sort: 'revelance',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.sortByRating = this.sortByRating.bind(this)
        this.sortByRelevance = this.sortByRelevance.bind(this)
        this.sortByYear = this.sortByYear.bind(this)
        this.reset = this.reset.bind(this)
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
        else if(prevState.sort !== this.state.sort){
            this.sort()
        }
    }

    reset(){
        window.location.reload();
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

    sortByRating(){
        this.setState({ sort: 'rating' })
    }

    sortByRelevance(){
        this.setState({ sort: 'relevance' })
    }

    sortByYear(){
        this.setState({ sort: 'year' })
    }

    sortStyle(selected){
        var sort = this.state.sort
        if(sort == selected)
        return {
            color: '#82f5a8',
            borderBottom: '2px solid #82f5a8'
        }
    }

    sort(){
        var sort = this.state.sort
        if(sort == 'rating'){
            const data = [...this.state.data].sort((a,b) =>{
                if(a.vote_average > b.vote_average) return -1
                if(a.vote_average < b.vote_average) return 1;
                return 0
            })
            this.setState({ data: data })
        }
        else if(sort == 'year'){
            const data = [...this.state.data].sort((a,b) =>{
                if(a.release_date.substring(0, 4) > b.release_date.substring(0, 4)) return -1
                if(a.release_date.substring(0, 4) < b.release_date.substring(0, 4)) return 1;
                return 0
            })
            this.setState({ data: data })
        }
        else{
            this.fetchData()
        }
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
            this.setState({loaded:true, error:false, data: json.results, sort: 'relevance'}) 
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
            <Row style={{ boxShadow: this.state.shadow }} id="header">
                <Col lg={2} id="left-section-header">
                    <img 
                        src={kinoLogo} 
                        alt="kino"
                        onClick={this.reset}>
                    </img>
                </Col>
                <Col lg={5} id="middle-section-header">
                    <div>
                        <ul>
                            <li style={this.sortStyle('relevance')} onClick={this.sortByRelevance}>Revelance</li>
                            <li style={this.sortStyle('rating')} onClick={this.sortByRating}>Rating</li>
                            <li style={this.sortStyle('year')} onClick={this.sortByYear}>Year</li>
                        </ul>
                    </div>
                </Col>
                <Col lg={5} id="right-section-header">
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
                            <Col xs={6} md={4} lg={3} key={i}>
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