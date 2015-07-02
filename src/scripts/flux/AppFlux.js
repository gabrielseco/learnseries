'use strict';

import { Flux } from 'flummox';
import Immutable from 'immutable';

import { FilmsActions } from '../actions/FilmsActions';
import { FilmsStore } from '../stores/FilmsStore';
import { TVActions } from '../actions/TVActions';
import { TVStore } from '../stores/TVStore';
import { DictionaryActions } from '../actions/DictionaryActions';


export class AppFlux extends Flux {

    constructor() {
        super();

        // The extra argument(s) are passed to the Action / Store constructors

        this.createActions('films', FilmsActions, this.getApiendpoint(), this.getApiDB(), this.getApiKey(), this.getPathImageDB());
        this.createStore('films', FilmsStore, this);
        this.createActions('tv', TVActions, this.getApiendpoint(), this.getApiDB(), this.getApiKey(), this.getPathImageDB());
        this.createStore('tv', TVStore, this);
        this.createActions('diccionarios', DictionaryActions, this.getApiendpoint());
    }

    getApiendpoint() {
      return "http://vlab.es/web/";
    }

    getApiDB(){
      return "http://api.themoviedb.org/3/";
    }

    getApiKey(){
      return "f9868bfa67c8ac93675e8de8a33cbd17";
    }

    getPathImageDB(){
      return "https://image.tmdb.org/t/p/w185/";
    }

}
