'use strict';

import React from 'react/addons';
import Mensaje from '../UI/Mensaje';
import { Navigation, TransitionHook } from 'react-router';


var mensaje = {
  errorInsertada: 'La película ya está insertada'
};

var fieldValues = {
  name: null
};

let addFilm = React.createClass({

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

      this.props.flux.getActions('films').createFilm(name).then((res) => {
        console.log('res', res);

        if(res[0].Resultado === 500){
          //error película insertada añadir clases
          console.log('error película ya insertada');

          this.setState({
            inputName: 'redBorder',
            mostrar: true
          });
        } else if (res[0].Resultado === 501) {
          //velneo caído
          console.log('Velneo caído');
        } else if(res[0].Resultado === 200){
          //we move to films
          console.log('película insertada');
          this.transitionTo('/films');
        }

      });
    },
    render() {
      return (
        <div>
          <Mensaje mostrar={this.state.mostrar} mensaje={mensaje.errorInsertada} />
          <form onSubmit={this.handleForm} id="addFilm" method="post" role="form">
            <label className="is-required">Nombre</label>
            <input ref="name" className={this.state.inputName} type="text" name="name" required placeholder="Nombre"
                   defaultValue={fieldValues.name}></input>
            <input type="submit" value="Enviar"></input>
          </form>
       </div>

      );


    }

});


module.exports = addFilm;
