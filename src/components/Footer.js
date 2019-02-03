import React, { Component } from 'react';
import tmdbLogo from'../img/tmdb.png'
import '../css/main.css';

class Footer extends Component {

    render() {
        return (
            <div>
                <footer id="footer">
                    <p className="footer-text"> Repo: <a href="https://github.com/sikidamjanovic/Kino-Movie">kino@github.com</a>.</p>
                    <p>&copy; 2019 Sinisa Damjanovic</p>
                    <img src={tmdbLogo} id="tmdbLogo" alt="TMDBLogo"/>
                </footer>
            </div>
        )
    }
}
export default Footer;
