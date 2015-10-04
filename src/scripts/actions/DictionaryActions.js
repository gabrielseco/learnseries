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

let serverFetchDictionaryEpisode = async function(apiendpoint, formContent){

  let words = await axios.get(apiendpoint + '/diccionarios_episodio?ID='+formContent);
  return words.data;

};

let serverCreateWords = async function(apiendpoint, form){

  form.english = form.english.trim();
  form.english = form.english.charAt(0).toUpperCase() + form.english.slice(1);
  form.spanish = form.spanish.trim();
  form.spanish = form.spanish.charAt(0).toUpperCase() + form.spanish.slice(1);

  if(form.idEpisodio !== ''){
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

let serverGetWord = async function (apiendpoint, params){
  let words = await axios.get(apiendpoint + '/palabra?ID='+params);
  return words.data;
};

let serverEditWord = async function (apiendpoint, params) {

  params.english = params.english.trim();
  params.english = params.english.charAt(0).toUpperCase() + params.english.slice(1);
  params.spanish = params.spanish.trim();
  params.spanish = params.spanish.charAt(0).toUpperCase() + params.spanish.slice(1);


  var url = "modificar_palabra?ID="+params.ID +"&english="+params.english+"&spanish="+params.spanish;
  //console.log(apiendpoint + url);
  let velneo = await axios.get(apiendpoint + url);

  return velneo.data;
}

let serverDeleteWord = async function (apiendpoint, params){

  let words = await axios.get(apiendpoint + '/baja_palabra?ID='+params);
  return words.data;

};




export class DictionaryActions extends Actions {

    constructor(apiendpoint) {
        super();
        this.apiendpoint = apiendpoint;
        this.requiredValues = [];
    }

    async fetchFilmsWords() {

      const response = await serverFetchFilmsWords(this.apiendpoint);
      return response;
    }

    async fetchTVWords() {

      const response = await serverFetchTVWords(this.apiendpoint);
      return response;

    }

    async fetchTVDictionaryFromEpisode(formContent){

      const response = await serverFetchDictionaryEpisode(this.apiendpoint, formContent);
      return response;
    }

    async insertWords(form) {
      const response = await serverCreateWords(this.apiendpoint, form);
      return response;
    }

    async getWord(params){
      const response = await serverGetWord(this.apiendpoint, params);
      return response;
    }

    async editWord(params){
      const response = await serverEditWord(this.apiendpoint, params);
      return response;
    }

    async deleteWords(params){

      const response = await serverDeleteWord(this.apiendpoint,params);
      return response;

    }

    async saveRequiredData(data) {
      this.requiredValues = data;
    }




}
