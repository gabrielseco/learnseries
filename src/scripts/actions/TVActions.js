'use strict';

import { Actions } from 'flummox';
import axios from 'axios';
import uuid from '../utils/uuid'


//we fetch our series from our database

let serverFetchTV = async function(apiendpoint) {

    console.log('fetching tv in tv actions');

    let tv = await axios.get(apiendpoint + 'series');

    console.log('items '+tv.data.length);
    return tv.data;  // passed to the store after REST response (obviously); sliced for the demo


};

let serverFetchTVEpisodes = async function (apiendpoint, tvContent) {

  console.log('fetching episodes of tv in actions');

  let tv = await axios.get(apiendpoint + 'episodios?id='+ tvContent);

  console.log('items episodes '+tv.data.length);

  return tv.data;

};


let serverGetTV = async function(apiendpoint, tvContent) {

  console.log('fetchicg one tv in tv actions');

  let tv = await axios.get(apiendpoint + "serie?ID="+ tvContent);

  return tv.data;

};


let serverGetTVEpisode = async function(apiendpoint, tvContent) {

  console.log('fetching data from episode in tv actions');

  let tv = await axios.get(apiendpoint + "episodio_serie?ID="+ tvContent);

  return tv.data;

};


let serverModifyTV = async function(apiendpoint, apiDB, apiKey, imagePath, tvContent) {
  var nombre = tvContent.nombre.trim();
  var temporada = tvContent.temporada.trim();
  var anterior = tvContent.anterior.trim();

  var idSerie;


  console.log('modifying tv');


  var response = await axios.get(apiDB + 'search/tv?api_key='+ apiKey +'&query='+ nombre);
      response = response.data;

      console.log('resp', response);

      if(response.results.length > 0) {
        nombre = response.results[0].original_name;
        idSerie = response.results[0].id;


        var responseImg = await axios.get(apiDB + 'tv/'+idSerie+'?api_key='+ apiKey +'&query='+ name);
            responseImg = responseImg.data;


            for(var i = 0; i < responseImg.seasons.length; i++){

              if(responseImg.seasons[i].season_number.toString() === temporada){
                var idSeason = responseImg.seasons[i].id;
                var imagen = imagePath + responseImg.seasons[i].poster_path;
                var year = responseImg.seasons[i].air_date.slice(0, 4);
              }

            }

            var data = {
              nombre: nombre,
              temporada: temporada,
              anterior: anterior,
              imagen: imagen,
              year: year,
              idSerie: idSerie,
              idSeason: idSeason
            };

            console.log('datos', data);


            var url = "modificar_series?name="+ data.nombre + "&anterior="+ data.anterior + "&temporada="+ data.temporada + "&imagen="+ data.imagen + "&year="+data.year.toString()+"&idSerie="+data.idSerie.toString()+"&idSeason="+data.idSeason.toString();

            console.log('url', url);

            var velneo = await axios.get(apiendpoint + url);

            return velneo.data;

          }





};



//we make a call to the api
//then we use the parameters to make a call
//finally we obtain the response

let serverCreateTV = async function(apiendpoint, apiDB, apiKey, imagePath, tvContent) {

  var name = tvContent.name.trim();
  var temporada = tvContent.temporada.trim();
  var idSerie;


  var response = await axios.get(apiDB + 'search/tv?api_key='+ apiKey +'&query='+ name);
      response = response.data;

      if(response.results.length > 0) {
        name = response.results[0].original_name;
        idSerie = response.results[0].id;


        var responseImg = await axios.get(apiDB + 'tv/'+idSerie+'?api_key='+ apiKey +'&query='+ name);
            responseImg = responseImg.data;


            for(var i = 0; i < responseImg.seasons.length; i++){

              if(responseImg.seasons[i].season_number.toString() === temporada){
                var idSeason = responseImg.seasons[i].id;
                var imagen = imagePath + responseImg.seasons[i].poster_path;
                var year = responseImg.seasons[i].air_date.slice(0, 4);
              }

            }

            var data = {
              name: name,
              temporada: temporada,
              imagen: imagen,
              year: year,
              idSerie: idSerie,
              idSeason: idSeason
            };


            var url = "registro_series?nombre="+ data.name + "&temporada="+ data.temporada + "&imagen="+ data.imagen + "&year="+data.year+"&idSerie="+data.idSerie+"&idSeason="+data.idSeason;

            console.log('url', url);

            var velneo = await axios.get(apiendpoint + url);

            return velneo.data;


        }



};

let serverCreateEpisode = async function(apiendpoint, tvContent) {

  tvContent.numero = tvContent.numero.trim();
  tvContent.nombre = tvContent.nombre.trim();


  var url = "registro_episodio?nombre=" + tvContent.nombre + "&numero="+ tvContent.numero +"&ID="+ tvContent.id;


  var velneo = await axios.get(apiendpoint + url);
      return velneo.data;


};


let serverDeleteTV = async function(apiendpoint, tvContent) {
    let tv = await axios.get(apiendpoint + '/baja_serie?id=' + tvContent);
    return tv.data;
};


export class TVActions extends Actions {

    constructor(apiendpoint, apiDB, apiKey, imagePath) {
        super();
        this.apiendpoint = apiendpoint;
        this.apiDB = apiDB;
        this.apiKey = apiKey;
        this.imagePath = imagePath;
    }

    async fetchTV() { return await serverFetchTV(this.apiendpoint); }

    async fetchTVEpisodes(tvContent){

      const response = await serverFetchTVEpisodes(this.apiendpoint, tvContent);
      return response;

    }


    async getTV(tvContent){

      const response = await serverGetTV(this.apiendpoint, tvContent);
      return response;

    }

    async getTVEpisode(tvContent) {

      const response = await serverGetTVEpisode(this.apiendpoint, tvContent);

      return response;

    }

    async createTV(tvContent) {

      const response = await serverCreateTV(this.apiendpoint, this.apiDB, this.apiKey, this.imagePath, tvContent);
      return response;

    }

    async createEpisodeTV(tvContent) {

      const response = await serverCreateEpisode(this.apiendpoint, tvContent);

      return response;

    }


    async modifyTV(tvContent) {

      const response = await serverModifyTV(this.apiendpoint, this.apiDB, this.apiKey, this.imagePath, tvContent);
      return response;

    }


    async deleteTV(tvContent) {

      const response = await serverDeleteTV(this.apiendpoint, tvContent);
      return response;

    }
}
