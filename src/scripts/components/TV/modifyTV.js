'use strict';

import React from 'react/addons';
import Loading from '../UI/Loading';
import Mensaje from '../UI/Mensaje';
import { State, Navigation, TransitionHook } from 'react-router';


var mensaje = {
  errorInsertada: 'La serie ya está insertada'
};

var fieldValues = {
  name: null,
  temporada: null
};


let modifyTV = React.createClass({

  mixins: [ Navigation, TransitionHook, State ],
  getInitialState(){
      return {
        value: '',
        inputName: '',
        mostrar: false
      };
    },
    componentWillMount(){

      var self = this;
      var id = this.getParams().id;
      this.props.flux.getActions('tv').getTV(id).then((res) => {

        var value = {
          nombre: res[0].Nombre,
          anterior: res[0].Nombre,
          temporada: res[0].Temporada
        };


        self.setState({value: value });

      });


    },

    handleForm(e) {

      e.preventDefault();

      var form = {
        nombre: this.refs.nombre.getDOMNode().value,
        anterior: this.state.value.anterior,
        temporada: this.refs.temporada.getDOMNode().value
      };

      console.log(form);


      this.props.flux.getActions('tv').modifyTV(form).then((res) => {
        console.log('res', res);

        if(res[0].Resultado === 500){
          //error película insertada añadir clases
          console.log('error serie ya insertada');
          this.setState({
            inputName: 'redBorder',
            mostrar: true
          });
        } else if (res[0].Resultado === 501) {
          //velneo caído
          console.log('Velneo caído');
        } else if(res[0].Resultado === 200){
          //we move to films
          console.log('serie modificada');
          //need to do this to update films before we go back
          this.transitionTo('/tv');
        }

      });

    },
    render() {
      if (this.state.value !== ''){
      return (
        <div>
          <Mensaje mostrar={this.state.mostrar} mensaje={mensaje.errorInsertada} />
          <form onSubmit={this.handleForm} id="addTV" method="post" role="form">
            <label className="is-required">Nombre</label>
            <input ref="nombre" className={this.state.inputName} type="text" name="name" required placeholder="Nombre" defaultValue={this.state.value.nombre}></input>
            <label className="is-required">Temporada</label>
            <input ref="temporada" className={this.state.inputName} type="text" name="name" required placeholder="Temporada" defaultValue={this.state.value.temporada}></input>
            <input type="submit" value="Enviar"></input>
          </form>
       </div>

      );
    } else {
      return (<Loading/>);
    }

    }

});


module.exports = modifyTV;
