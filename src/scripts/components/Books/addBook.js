'use strict';

import React from 'react/addons';
import Mensaje from '../UI/Mensaje';
import { Navigation, TransitionHook } from 'react-router';


var mensaje = {
  errorInsertada: 'El libro ya está insertado'
};

var fieldValues = {
  name: null,
  youtube: null
};

let addBook = React.createClass({

  mixins: [ Navigation, TransitionHook ],

    getInitialState(){
      return {
        inputName: '',
        mostrar: false
      };
    },
    handleForm(e){
      e.preventDefault();

      var name = this.refs.name.getDOMNode().value;
      var youtube = this.refs.youtube.getDOMNode().value;

      fieldValues.name = name;
      fieldValues.youtube = youtube;

      this.props.flux.getActions('books').create(fieldValues).then((res) => {
        console.log('res', res);

        if(res[0].Resultado === 500){
          //error película insertada añadir clases
          console.log('error libro ya insertado');

          this.setState({
            inputName: 'redBorder',
            mostrar: true
          });
        } else if (res[0].Resultado === 501) {
          //velneo caído
          console.log('Velneo caído');
        } else if(res[0].Resultado === 200){
          //we move to films
          console.log('libro insertado');
          this.transitionTo('/books');
        }

      });
    },
    render() {
      return (
        <div>
          <Mensaje mostrar={this.state.mostrar} mensaje={mensaje.errorInsertada} />
          <form onSubmit={this.handleForm} id="addBook" method="post" role="form">
            <label className="is-required">Nombre</label>
            <input ref="name" className={this.state.inputName} type="text" name="name" required placeholder="Nombre"
                   defaultValue={fieldValues.name}></input>
            <label className="is-required">Youtube</label>
            <input ref="youtube" className={this.state.inputName} type="text" name="youtube" required placeholder="Youtube"
                   defaultValue={fieldValues.youtube}></input>
            <input type="submit" value="Enviar"></input>
          </form>
       </div>

      );


    }

});


module.exports = addBook;
