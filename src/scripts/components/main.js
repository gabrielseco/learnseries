'use strict';

import React from 'react';
import Router from 'react-router';
import Immutable from 'immutable';

import { AppFlux } from '../flux/AppFlux';

import App from './App';
import InterfaceHome from './Interfaces/Home';
import InterfaceRest from './Interfaces/Rest';
import InterfaceFilms from './Interfaces/Films';
import InterfaceTV from './Interfaces/TV';
import DictionaryFilms from './Interfaces/DictionaryFilms';
import DictionaryTV from './Interfaces/DictionaryTV';
import addFilm from './Films/addFilm';
import modifyFilm from './Films/modifyFilm';
import FilmsWords from './Films/FilmsWords';
import addTV from './TV/addTV';
import modifyTV from './TV/modifyTV';
import episodesTV from './TV/episodesTV';
import dictionaryEpisode from './TV/dictionaryEpisode';
import addEpisodeTV from './TV/addEpisodeTV';
import modifyEpisode from './TV/modifyEpisode';
import addWords from './Dictionary/addWords';






try {

    require('../../styles/main.scss');

    const flux = new AppFlux();

    const Route = Router.Route,
        DefaultRoute = Router.DefaultRoute;

    var Interfaces = (
      <Route name="home" path="/" handler={App}>
        <DefaultRoute handler={InterfaceHome} />
        <Route name="rest" path="/rest" handler={InterfaceRest} />
        <Route name="films" path="/films" handler={InterfaceFilms} />
        <Route name="addFilm" path="/addFilm" handler={addFilm} />
        <Route name="modifyFilm" path="/modifyFilm/:name" handler={modifyFilm} />
        <Route name="FilmsWords" path="/diccionarios/:id" handler={FilmsWords} />
        <Route name="tv" path="/tv" handler={InterfaceTV} />
        <Route name="addtv" path="/addTV" handler={addTV} />
        <Route name="modifyTV" path="/modifyTV/:id" handler={modifyTV} />
        <Route name="episodes" path="/episodes/:id/:idGenerator" handler={episodesTV} />
        <Route name="addEpisode" path="/addEpisode/:id/:idGenerator" handler={addEpisodeTV} />
        <Route name="modifyEpisode" path="/modifyEpisode/:id/:idSerie/:idGenerator" handler={modifyEpisode} />
        <Route name="dictionaryFilms" path="/dictionaryFilms" handler={DictionaryFilms} />
        <Route name="dictionaryTV" path="/dictionaryTV" handler={DictionaryTV} />
        <Route name="dictionaryEpisode" path="/dictionaryEpisode/:idPelicula/:idEpisodio" handler={dictionaryEpisode} />
        <Route name="addWords" path="/addWords/:id/:idPelicula/:idEpisodio" handler={addWords} />
        <Route name="login" path="/login" handler={InterfaceRest} />

      </Route>
    );

    Router.run(Interfaces, function (Handler) {
        React.render(<Handler flux={flux} />, document.getElementById('app'));
    });
} catch(e) {
    React.render(
        <div>
            <h2>Error: application could not load</h2>
            <pre>
                <strong>{e.toString()}</strong>
                {!!e.stack && (<div><br />{e.stack}</div>)}
            </pre>
        </div>, document.body
    );

    throw e;
}
