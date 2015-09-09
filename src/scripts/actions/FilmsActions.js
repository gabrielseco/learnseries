'use strict';

import { Actions } from 'flummox';
import axios from 'axios';
import uuid from '../utils/uuid'




//we return our films from our database

let serverFetchFilms = async function(apiendpoint) {

    //console.log('fetching films in film actions');

    let films = await axios.get(apiendpoint + 'peliculas');

    //console.log('items '+films.data.length);
    return films.data;  // passed to the store after REST response (obviously); sliced for the demo


};

// we make a call to our api to check if the film is not inserted
  //if it is show error
  //if not we make a call to the db api
    //we obtain the data
    //after we inserted in our api


let serverModifyFilm = async function(apiendpoint, apiDB, apiKey, imagePath, filmContent){

  console.log('content', filmContent);

  var name = filmContent.name.trim();
  var anterior = filmContent.anterior.trim();
  var imagen = imagePath;
  var year, idMovieDB;


  console.log('apiDB', apiDB);
  console.log('apiKey', apiKey);
  console.log('filmContent', filmContent);

  var response = await axios.get(apiendpoint + 'pelicula?name='+name);
      response = response.data;

      if(response === [] || typeof response !== 'object') {

        return response;

      } else {

        var responseApi = await axios.get(apiDB + 'search/movie?api_key='+ apiKey +'&query='+ name);
            responseApi = responseApi.data;

        if(responseApi.results.length > 0){
          name = responseApi.results[0].original_title;
          imagen += responseApi.results[0].poster_path;
          year = responseApi.results[0].release_date.slice(0, 4);
          idMovieDB = responseApi.results[0].id;

          var data = {
            'name': name,
            'anterior': anterior,
            'imagen': imagen,
            'year': year,
            'idMovieDB': idMovieDB
          };

          console.log(data);

          var url = "modificar_pelicula?name="+ data.name+ "&anterior="+ data.anterior +"&imagen="+ data.imagen+"&year="+data.year.toString()+"&IDMOVIEDB="+data.idMovieDB.toString();

          console.log('url', url);

          var velneo = await axios.get(apiendpoint + url);

          return velneo.data;

        }

    }

};


//we make a call to the api
//then we use the parameters to make a call
//finally we obtain the response

let serverCreateFilm = async function(apiendpoint, apiDB, apiKey, imagePath, filmContent) {

  var name = filmContent.trim();
  var imagen = imagePath;
  var year, idMovieDB;

  console.log('apiDB', apiDB);
  console.log('apiKey', apiKey);
  console.log('filmContent', filmContent);

  var response = await axios.get(apiDB + 'search/movie?api_key='+ apiKey +'&query='+ filmContent);
      response = response.data;

  if(response.results.length > 0){
    name = response.results[0].original_title;
    imagen += response.results[0].poster_path;
    year = response.results[0].release_date.slice(0, 4);
    idMovieDB = response.results[0].id;

    var data = {
      'name': name,
      'imagen': imagen,
      'year': year,
      'idMovieDB': idMovieDB
    };

    var url = "registro_pelicula?nombre="+ data.name+ "&imagen="+ data.imagen+"&year="+data.year.toString()+"&IDMOVIEDB="+data.idMovieDB;

    console.log('url', url);

    var velneo = await axios.get(apiendpoint + url);

    return velneo.data;


  }

};


let serverDeleteFilm = async function(apiendpoint, filmContent) {
    let film = await axios.get(apiendpoint + '/baja_pelicula?id=' + filmContent);
    return film.data;
};

let serverFetchFilmsWords = async function(apiendpoint, filmContent) {

    console.log('fetching films in film actions');

    let films = await axios.get(apiendpoint + 'palabras_pelicula?id='+filmContent);

    console.log('items '+films.data.length);
    return films.data;  // passed to the store after REST response (obviously); sliced for the demo


};


export class FilmsActions extends Actions {

    constructor(apiendpoint, apiDB, apiKey, imagePath) {
        super();
        this.apiendpoint = apiendpoint;
        this.apiDB = apiDB;
        this.apiKey = apiKey;
        this.imagePath = imagePath;
    }

    async fetchFilms() {
      const response = await serverFetchFilms(this.apiendpoint);
      return response;
    }

    async fetchFilmsWords (filmContent) {

      const response = await serverFetchFilmsWords(this.apiendpoint, filmContent);
      return response;

    }

    async createFilm(filmContent) {

      const response = await serverCreateFilm(this.apiendpoint, this.apiDB, this.apiKey, this.imagePath, filmContent);
      return response;

    }

    async modifyFilm(filmContent) {

      const response = await serverModifyFilm(this.apiendpoint, this.apiDB, this.apiKey, this.imagePath, filmContent);
      return response;
    }

    async deleteFilm(filmContent) {

      const response = await serverDeleteFilm(this.apiendpoint, filmContent);
      return response;
    }
}
