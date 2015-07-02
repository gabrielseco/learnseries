'use strict';

import React from 'react/addons';
import Mensaje from '../UI/Mensaje';
import { Navigation, TransitionHook } from 'react-router';


var mensaje = {
  errorInsertada: 'La película ya está insertada'
};

let addFilm = React.createClass({

  mixins: [ Navigation, TransitionHook ],

    getInitialState(){
      return {
        name: '',
        inputName: '',
        mostrar: false
      };
    },
    handleForm(e){
      e.preventDefault();

      var self = this;

      this.props.flux.getActions('films').createFilm(this.state.name).then(function(res){
        console.log('res', res);

        if(res[0].Resultado === 500){
          //error película insertada añadir clases
          console.log('error película ya insertada');
          self.setState({
            inputName: 'redBorder',
            mostrar: true
          });
        } else if (res[0].Resultado === 501) {
          //velneo caído
          console.log('Velneo caído');
        } else if(res[0].Resultado === 200){
          //we move to films
          console.log('película insertada');
          self.props.flux.getActions('films').fetchFilms();
          self.transitionTo('/films');
        }

      });
    },
    render() {

      const handleChange = (e) => this.setState({name: e.target.value});

      return (
        <div>
          <Mensaje mostrar={this.state.mostrar} mensaje={mensaje.errorInsertada} />
          <form onSubmit={this.handleForm} id="addFilm" method="post" role="form">
            <label className="is-required">Nombre</label>
            <input ref="name" className={this.state.inputName} type="text" name="name" onChange={handleChange} required placeholder="Nombre" value={this.state.name}></input>
            <input type="submit" value="Enviar"></input>
          </form>
       </div>

      );


    }

});


module.exports = addFilm;
