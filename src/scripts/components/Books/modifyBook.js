'use strict';

import React from 'react/addons';
import Loading from '../UI/Loading';
import Mensaje from '../UI/Mensaje';
import { State, Navigation, TransitionHook } from 'react-router';


var mensaje = {
  errorInsertada: 'El libro ya está insertado'
};

var fieldValues = {
  name: null,
  youtube: null,
  description: null,
  airdate: null,
  photo: null,
  ID: null
};

let modifyBook = React.createClass({

  mixins: [ Navigation, TransitionHook, State ],

    getInitialState(){
      return {
        inputName: '',
        mostrar: false,
        data: ''
      };
    },
    componentWillMount(){
      var params = this.getParams().id;

      this.props.flux.getActions('books').fetchBook(params).then((res) => {
        console.log('res',res);
        fieldValues.name = res[0].Nombre;
        fieldValues.youtube = res[0].Youtube;
        fieldValues.description = res[0].Descripcion;
        fieldValues.photo = res[0].Foto;
        fieldValues.ID = params;

        var fecha = res[0].FechaPublicacion.split("/");
        if(fecha[0] < 10 ) {
          fecha[0] = "0" + fecha[0];
        }

        fecha = fecha[1] + "/" + fecha[0] + "/"+ fecha[2];

        fieldValues.airdate = fecha;


        this.setState({data: res });

      });

    },
    handleForm(e){
      e.preventDefault();

      var name = this.refs.name.getDOMNode().value;
      var youtube = this.refs.youtube.getDOMNode().value;
      var description = this.refs.description.getDOMNode().value;
      var airdate = this.refs.airdate.getDOMNode().value;
      var photo = this.refs.photo.getDOMNode().value;

      fieldValues.name = name;
      fieldValues.youtube = youtube;
      fieldValues.description = description;
      fieldValues.airdate = airdate;
      fieldValues.photo = photo;

      this.props.flux.getActions('books').modify(fieldValues).then((res) => {
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
          console.log('libro modificado');
          this.transitionTo('/books');
        }

      });
    },
    render() {
      if (this.state.data !== ''){
      return (
        <div>
          <Mensaje mostrar={this.state.mostrar} mensaje={mensaje.errorInsertada} />
          <img className='img' src={fieldValues.photo} width="230" height="345"/>
          <form onSubmit={this.handleForm} id="modifyBook" method="post" role="form">
            <label className="is-required">Nombre</label>
            <input ref="name" className={this.state.inputName} type="text" name="name" required placeholder="Nombre"
                   defaultValue={fieldValues.name}></input>
            <label>Youtube</label>
            <input ref="youtube" className={this.state.inputName} type="text" name="youtube" placeholder="Youtube"
                   defaultValue={fieldValues.youtube}></input>
            <label className="is-required">Imagen</label>
            <input ref="photo" className={this.state.inputName} type="text" name="photo" required placeholder="Image"
                    defaultValue={fieldValues.photo}></input>
            <label className="is-required">Fecha</label>
            <input ref="airdate" className={this.state.inputName} type="text" name="airdate" required placeholder="Fecha"
                            defaultValue={fieldValues.airdate}></input>
            <label className="is-required">Descripción</label>
            <textarea ref="description" defaultValue={fieldValues.description}></textarea>

            <input type="submit" value="Enviar"></input>
          </form>
       </div>

      );
    } else {
      return (<Loading/>);
    }


    }

});


module.exports = modifyBook;
