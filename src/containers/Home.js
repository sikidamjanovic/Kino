import React, {Component} from 'react'
import Movie from '../components/Movie'
import { Grid, Row, Col} from 'react-bootstrap';
import '../css/main.css';
import Search from '../components/Search'
import tmdbLogo from'../img/tmdb.png'
import NavDrawer from '../components/NavDrawer'

class Home extends Component{

  constructor(props) {
    super(props)
    this.state = {
      movie: [],
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData(){
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=17c21a1abd8ae7be6ee8986389011906')
      .then(response=> response.json())
      .then( ({results: movie}) => this.setState({movie}))
  }

  render() {
    var map = Array.from(Array(this.state.movie.length).keys())
    return(
      <div>
        <div className="main-page">
            <NavDrawer/>
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h1 className="pageTitle">Popular</h1>    
                    </Col>
                    <Col xs={12}>
                        <div className="search-container"><Search/></div>
                    </Col>
                </Row>
                <Row>
                    {map.map(i=>{
                        return <Col key={map.id} md={2} sm={3} xs={6}>
                                    <Movie id={this.state.movie[i].id}></Movie>
                               </Col>
                    })}
                </Row>
            </Grid>
            <div>
                <footer id="footer">
                    <p className="footer-text"> Repo: <a href="https://github.com/sikidamjanovic/Kino">
                    kino@github.com</a>.</p>
                    <p>&copy; 2018 Sinisa Damjanovic</p>
                    <img src={tmdbLogo} id="tmdbLogo" alt="TMDBLogo"/>
                </footer>
            </div>
        </div>
      </div>
    )
  }
}

export default Home
