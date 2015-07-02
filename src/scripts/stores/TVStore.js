'use strict';

import { Store } from 'flummox';
import Immutable from 'immutable';

export class TVStore extends Store {

    constructor(flux) {
        super();

        this.state = { tv: Immutable.List() };

        class TVRecord extends Immutable.Record({ID: null, Nombre: null, Year: null, Foto: null, Temporada: null}) {

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
            temporada(){
              return this.get('Temporada');
            }
            temporadaWords(){
              return "- Season " +this.get('Temporada');
            }


        }

        /*
        Registering action handlers
        */

        const tvActionIds = flux.getActionIds('tv');

        /*this.register(todoActionIds.createTodo, (data) => {
            const newMap = this.state.todos.set(data.id, new TodoRecord(data));
            this.setState({ todos: newMap });
        });*/

        this.register(tvActionIds.fetchTV, (tvs) => {

           let tvList = Immutable.List();
            for(let tv of tvs) {
              tvList = tvList.push(new TVRecord(tv));
            }

            this.setState({ tv: this.state.tv.merge(tvList) });
        });

        /*this.register(todoActionIds.deleteTodo, (todo) => {
            let todos = this.state.todos.delete(todo.get('id'));
            if(todos !== this.state.todos) { this.setState({ todos: todos }); }
        });*/
    }

    getTV() {
      return this.state.tv;
    }
}
