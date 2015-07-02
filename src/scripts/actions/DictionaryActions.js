'use strict';

import { Actions } from 'flummox';
import axios from 'axios';
import uuid from '../utils/uuid'

let serverFetchFilmsWords = async function(apiendpoint) {

    let words = await axios.get(apiendpoint + '/diccionarios_peliculas');
    return words.data;

};


let serverFetchTVWords = async function(apiendpoint) {

  let words = await axios.get(apiendpoint + '/diccionarios_series');
  return words.data;

};

let serverCreateWords = async function(apiendpoint, form){

  form.english = form.english.trim();
  form.english = form.english.charAt(0).toUpperCase() + form.english.slice(1);
  form.spanish = form.spanish.trim();
  form.spanish = form.spanish.charAt(0).toUpperCase() + form.spanish.slice(1);

  if(form.idEpisodio !== null){
    var url = "registro_palabra?english="+form.english+
      "&spanish="+form.spanish+"&ID_SERIE="+form.idSerie.toString()+
      "&ID_EPISODIO="+form.idEpisodio.toString();

    var velneo = await axios.get(apiendpoint + url);

    return velneo.data;

  } else {
     url = "registro_palabra?english="+form.english+
      "&spanish="+form.spanish+"&ID="+form.idPelicula.toString();
     velneo = await axios.get(apiendpoint + url);

    return velneo.data;
  }



};


export class DictionaryActions extends Actions {

    constructor(apiendpoint) {
        super();
        this.apiendpoint = apiendpoint;
    }

    async fetchFilmsWords() {

      const response = await serverFetchFilmsWords(this.apiendpoint);
      return response;
    }

    async fetchTVWords() {

      const response = await serverFetchTVWords(this.apiendpoint);
      return response;

    }

    async insertWords(form) {
      const response = await serverCreateWords(this.apiendpoint, form);
      return response;
    }


}
