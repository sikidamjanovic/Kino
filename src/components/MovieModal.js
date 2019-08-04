import React, { Component } from 'react';
import Modal from 'react-modal'
import { IoIosStar, IoMdTime, IoIosPlay } from 'react-icons/io'
import '../css/modal.css'
  
Modal.setAppElement('#root')

class MovieModal extends Component {

    constructor(props) {
        super(props)
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal(){
        return this.props.isOpen
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                    onRequestClose={this.closeModal}
                    id="modal"
                >
                    <button id="button" onClick={this.closeModal}>X</button>
                    
                    <img 
                        src={"https://image.tmdb.org/t/p/original/" + this.props.data.backdrop_path} 
                        id="bgImage"
                        alt='bg'
                    />

                    <div id="basicInfo">
                        <h1>{this.props.data.title}</h1>
                        <div>
                            <button>
                                <IoIosPlay className="icon"/>
                                Trailer
                            </button>
                            <p>
                                <IoIosStar className="icon"/>
                                {this.props.data.vote_average}
                            </p>
                            <p>
                                <IoMdTime className="icon"/>
                                {this.props.data.runtime}min
                            </p>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }

  }

export default MovieModal