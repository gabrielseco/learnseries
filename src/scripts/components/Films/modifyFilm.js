'use strict';

import React from 'react/addons';
import Mensaje from '../UI/Mensaje';
import { State, Navigation, TransitionHook } from 'react-router';


var mensaje = {
  errorInsertada: 'La película ya está insertada'
};

var fieldValues = {
  name: '',
  anterior: ''
};


let modifyFilm = React.createClass({

  mixins: [ Navigation, TransitionHook, State ],
  getInitialState(){
      return {
        inputName: '',
        mostrar: false
      };
    },
    componentWillMount(){
      var params = this.getParams().name;

        fieldValues = {
          name: params,
          anterior: params
        };
    },

    handleForm(e) {

      e.preventDefault();

      var data = {
        name: this.refs.name.getDOMNode().value,
        anterior: fieldValues.anterior
      };



      this.props.flux.getActions('films').modifyFilm(data).then((res) => {
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
          console.log('película modificada');
          //need to do this to update films before we go back
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
            <input ref="name" type="text"
                   name="name" id="name"
                   required placeholder="Nombre"
                   defaultValue={fieldValues.name}
                   className={this.state.inputName}></input>
            <input type="submit" value="Enviar"></input>
          </form>
       </div>

      );


    }

});


module.exports = modifyFilm;
