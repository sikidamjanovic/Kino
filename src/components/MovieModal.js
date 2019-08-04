import React, { Component } from 'react';
import Modal from 'react-modal'
import { IoIosPlay } from 'react-icons/io'
import { Container, Row, Col } from 'react-bootstrap'
import '../css/modal.css'
  
Modal.setAppElement('#root')

class MovieModal extends Component {

    constructor(props) {
        super(props)
        this.closeModal = this.closeModal.bind(this);
        this.handleTrailerClick = this.handleTrailerClick.bind(this)
    }

    closeModal(){
        return this.props.isOpen
    }

    getGenres(){
        var genres = this.props.data.genres
        if(genres){
            var string = ''
            for (let i = 0; i < genres.length; i++) {
                string += genres[i].name + ' / '
            }
            return string.substring(0, string.length - 2)
        }else{
            return 'Unknown'
        }
    }

    formatRevenue(){
        var x = this.props.data.revenue
        if(x){
            return '$' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }else{
            return 'Unknown'
        }
    }

    renderPoster(){
        var poster = this.props.data.poster_path
        if(poster){
            return(
                <img 
                    id="modalPoster" 
                    src={"https://image.tmdb.org/t/p/w500" + this.props.data.poster_path} 
                    alt="modalPoster">    
                </img>
            )
        }else{
            return <div></div>
        }
    }

    handleTrailerClick(){
        fetch('https://api.themoviedb.org/3/movie/'+ this.props.data.id + '/videos?api_key=17c21a1abd8ae7be6ee8986389011906')
        .then( response => {
            if (!response.ok) { throw response }
            return response.json() 
        })
        .then( json => {
            console.log(json.results)
            window.open('https://www.youtube.com/watch?v=' + json.results[0].key, '_blank');
        })
        // window.open({}, '_blank');
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                    onRequestClose={this.closeModal}
                    shouldCloseOnOverlayClick={false}
                    id="modal"
                >
                    <button id="button" onClick={this.closeModal}>X</button>
                    
                    <img 
                        src={"https://image.tmdb.org/t/p/original/" + this.props.data.backdrop_path} 
                        id="bgImage"
                        alt='bg'
                    />

                    <Container id="modalContainer">
                        <Row id="modalRow">

                            <Col md={7} id="modalInfo">
                                <h1>{this.props.data.title}</h1>
                                <div>
                                    <p>{this.props.data.overview}</p>
                                    <button onClick={this.handleTrailerClick}>
                                        <IoIosPlay className="icon"/>
                                        TRAILER
                                    </button>
                                </div>
                            </Col>

                            <Col md={5} id="modalStats">
                                {this.renderPoster()}
                                <div id="stats">   
                                    <p><span>Genres</span>{this.getGenres()}</p>
                                    <p><span>Rating</span>{this.props.data.vote_average} / 10</p>
                                    <p><span>Release</span>{this.props.data.release_date}</p>
                                    <p><span>Revenue</span>{this.formatRevenue()}</p>       
                                </div>
                            </Col>

                        </Row>
                    </Container>

                </Modal>
            </div>
        );
    }

  }

export default MovieModal