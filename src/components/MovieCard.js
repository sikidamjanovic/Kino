import React, { Component } from 'react';
import { Palette } from 'react-palette'
import { MdStar, MdPlayArrow } from 'react-icons/md'
import MovieModal from '../components/MovieModal'
import '../css/movie-card.css'
import NoImg from '../img/noimg.png'

class MovieCard extends Component {

    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);
    }

    state = {
        data: [],
        loaded: false,
        showModal: false
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData(){
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
                data: d,
                loaded: true
            })
        })
    }

    showModal(){
        this.setState(prevState=>({ 
            showModal: !prevState.showModal 
        }))
    }

    renderPoster(){
        var loaded = this.state.loaded
        if(loaded){
            var poster = this.state.data.poster_path
            if(poster){
                return (
                    <div id="poster-container">
                        <img 
                            src={"https://image.tmdb.org/t/p/w500" + poster} 
                            alt="poster" 
                            id="poster"
                        />
                    </div>
                )
            }else{
                return (
                    <div id="poster-container">
                        <img 
                            src={NoImg}
                            alt="poster" 
                            id="noImg"
                        />
                    </div>
                )
            }
        }else{
            return <p>No Image, Sorry.</p>
        }
    }

    renderLine(){
        var path = this.state.data.poster_path
        return(
            <Palette src={"https://image.tmdb.org/t/p/w500" + path}>
                {({ data, loading, error }) => (
                    <div style={{ backgroundColor: data.vibrant }}id="line"></div>
                )}
            </Palette>
        )
    }

    renderInfo(){
        var loaded = this.state.loaded
        var data = this.state.data

        if(loaded){
            return(
                <div id="info">    
                    <div id="line-container">
                        {this.renderLine()}
                    </div>
                    <div id="info-container">
                        <div id="title-container">
                            <p id="title">{data.title}</p>
                        </div>
                        <div id="buttons-container">

                            <p className="rating">
                                <MdStar id="star"/>
                                {data.vote_average}
                            </p>

                            <p className="year"> 
                                {data.release_date.substring(0, 4)}
                            </p>

                            <p className="trailer">
                                <MdPlayArrow/>
                                TRAILER
                            </p>
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
                <div id="movie-card" onClick={this.showModal}>
                    <div>
                        <MovieModal isOpen={this.state.showModal} data={this.state.data}/>
                        {this.renderPoster()}
                        {this.renderInfo()}
                    </div>
                </div>
        );
    }
}

export default MovieCard;