'use strict';

import React from 'react/addons';
import FilmsListItem from '../Films/FilmListItem';
import Router from 'react-router';
import { Navigation, TransitionHook } from 'react-router';




let InterfaceFilms = React.createClass({

    mixins: [ Navigation, TransitionHook ],


    componentWillMount() {
      this.props.flux.getStore('films').addListener('change', this.onFilmsStoreChange);
    },

    componentWillUnmount() {
      this.props.flux.getStore('films').removeListener('change', this.onFilmsStoreChange);

    },

    onFilmsStoreChange() {
      this.setState({films: this.props.flux.getStore('films').getFilms() });
    },
    render() {
      var list = this.props.films.map((film, i) => {
        return (
          <FilmsListItem key={film.ID()} data={film} flux={this.props.flux}/>
        );
      }).toJS();

      const addFilm = () => {
        console.log('we go to addFilm');
        this.transitionTo('/addFilm');
      };

        return (
            <div className="films">
              <div className="filmButton">
                <button className="addFilm" onClick={addFilm}>ADD FILM</button>
              </div>
              <div className="films">
                {list}
              </div>
            </div>
        );
    }
});

module.exports = InterfaceFilms;
