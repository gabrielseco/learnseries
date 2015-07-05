'use strict';

import React from 'react/addons';
import FilmsListItem from '../Films/FilmListItem';
import Loading from '../UI/Loading';
import Router from 'react-router';
import { Navigation, TransitionHook } from 'react-router';




let InterfaceFilms = React.createClass({
    mixins: [ Navigation, TransitionHook ],
    getInitialState(){
      return {
        films: ''
      };
    },
    componentWillMount() {
      this.props.flux.getActions('films').fetchFilms().then((res) => {
        console.log('res', res);

        this.setState({ films: res });

      });
    },
    render() {
      if (this.state.films !== ''){
        var list = this.state.films.map((film, i) => {
          console.log(film.ID);
          return (
            <FilmsListItem key={film.ID} data={film} flux={this.props.flux}/>
          );
        });
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
        else {
          return (<Loading/>);
        }
    }
});

module.exports = InterfaceFilms;
