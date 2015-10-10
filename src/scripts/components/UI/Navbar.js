'use strict';

import React from 'react/addons';
import {Link, State} from 'react-router';


let UINavbar = React.createClass({
    render() {

        return (
          <div className="bar">
            <li><Link className="item" to="films">Films</Link></li>
            <li><Link className="item" to="tv">TV Shows</Link></li>
            <li><Link className="item" to="dictionaryFilms">Dictionary Films</Link></li>
            <li><Link className="item" to="dictionaryTV">Dictionary TV</Link></li>
            <li><Link className="item" to="books">Books</Link></li>

            <li className="bar-button"><Link className="item" to="login">Log In</Link></li>
          </div>
        );
    }
});

module.exports = UINavbar;
