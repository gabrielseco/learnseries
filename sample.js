'use strict';

import { Actions } from 'flummox';
import axios from 'axios';
import uuid from '../utils/uuid'
import Router from 'react-router';




//we return our films from our database

let serverFetchFilms = async function(apiendpoint) {

    console.log('fetching films in film actions');

    let films = await axios.get(apiendpoint + 'peliculas');

    console.log('items '+films.data.length);
    return films.data;  // passed to the store after REST response (obviously); sliced for the demo


};


//making a call to the api
//we obtain paramaters for our database
//we return it in an array with a callback

let dbApi = function(apiDB, apiKey, imagePath, filmContent, cb){

  var name = filmContent;
  var imagen = imagePath;
  var year, idMovieDB;

  console.log('apiDB', apiDB);
  console.log('apiKey', apiKey);
  console.log('filmContent', filmContent);

  axios.get(apiDB + 'search/movie?api_key='+ apiKey +'&query='+ filmContent)
       .then(function(res){

         console.log('res of api', res);

          var result = res.data;

          console.log('array of results', result.results);

          if(result.results.length > 0){
            name = result.results[0].original_title;
            imagen += result.results[0].poster_path;
            year = result.results[0].release_date.slice(0, 4);
            idMovieDB = result.results[0].id;

            var data = {
              'name': name,
              'imagen': imagen,
              'year': year,
              'idMovieDB': idMovieDB
            };

            console.log('data obtained', data);

            cb(data);

          }
          else{
            cb(false);
          }

        });

};

//we make a call to the api
//then we use the parameters to make a call
//finally we obtain the response

let serverCreateFilm = async function(apiendpoint, apiDB, apiKey, imagePath, filmContent) {

      /*if( res !== false && typeof res === 'object' ){


        var url = "registro_pelicula?nombre="+ res.name+ "&imagen="+ res.imagen+"&year="+res.year.toString()+"&IDMOVIEDB="+res.idMovieDB;

        console.log('url', url);

        axios.get(apiendpoint + url).then(function(result){

          console.log('inserted ', result.data);

          if(result.data[0].Resultado === 500){
            console.log('La película ya existe');

          }
          else {
            console.log('pelicula creada');
            return result.data;
          }


        });

      } else {

        console.log('NO DATA IN THE API');


      }

    });*/



};





/*let serverDeleteTodo = function(apiendpoint, todo) {
    axios.delete(apiendpoint + '/todos/' + todo.get('id'));
    return todo; // passed to the store without awaiting REST response for optimistic delete
};*/

export class FilmsActions extends Actions {

    constructor(apiendpoint, apiDB, apiKey, imagePath) {
        super();
        this.apiendpoint = apiendpoint;
        this.apiDB = apiDB;
        this.apiKey = apiKey;
        this.imagePath = imagePath;
    }

    async fetchFilms() { return await serverFetchFilms(this.apiendpoint); }

    async createFilm(filmContent) {

       return serverCreateFilm(this.apiendpoint, this.apiDB, this.apiKey, this.imagePath, filmContent);

    }

    //deleteFilm(todo) { return serverDeleteTodo(this.apiendpoint, todo); }
}
