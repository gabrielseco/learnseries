'use strict';

import { Store } from 'flummox';
import Immutable from 'immutable';

export class FilmsStore extends Store {

    constructor(flux) {
        super();

        this.state = { films: Immutable.List(), filmsWords: Immutable.List()};

        class FilmsRecord extends Immutable.Record({ID: null, Nombre: null, Year: null, Foto: null}) {

            nombre() {
              return this.get('Nombre');
            }
            ID(){
              return this.get('ID').toString();
            }
            year(){
              return this.get('Year');
            }
            foto(){
              return this.get('Foto');
            }
            temporadaWords(){
              return "";
            }


        }

        /*
        Registering action handlers
        */

        const filmsActionIds = flux.getActionIds('films');

        this.registerAsync(filmsActionIds.createFilm, (data) => {
            //const newMap = this.state.newFilm.set(data.id, new FilmsRecord(data));
            //this.setState({ newFilm: newMap });
            console.log('store', data);

            this.setState({ newFilm: data });
        });

        /*this.register(filmsActionIds.fetchFilmsWords, (films) => {
           console.log('films', films);
           let filmsList = Immutable.List();
            for(let film of films) {
              filmsList = filmsList.push(new FilmsRecord(film));
            }

            this.setState({ filmsWords: this.state.filmsWords.merge(filmsList) });
        });*/


        this.register(filmsActionIds.fetchFilms, (films) => {

           let filmsList = Immutable.List();
            for(let film of films) {
              filmsList = filmsList.push(new FilmsRecord(film));
            }

            this.setState({ films: this.state.films.merge(filmsList) });
        });

        this.register(filmsActionIds.fetchModifiedFilm, (films) => {


           let filmsList = Immutable.List();
            for(let film of films) {
              filmsList = filmsList.push(new FilmsRecord(film));
            }

            this.setState({ modifyFilm: this.state.films.merge(filmsList) });
        });

        /*this.register(todoActionIds.deleteTodo, (todo) => {
            let todos = this.state.todos.delete(todo.get('id'));
            if(todos !== this.state.todos) { this.setState({ todos: todos }); }
        });*/
    }

    getFilms() {
      return this.state.films;
    }

    getFilmsWords(){
      return this.state.filmsWords;
    }





}
