'use strict';

import React from 'react/addons';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';
//import YouTube from 'react-youtube';
import Mensaje from '../UI/Mensaje';
import { Navigation, TransitionHook } from 'react-router';



var appElement = document.getElementById('app');
Modal.setAppElement(appElement);
Modal.injectCSS();




let BookListItem = React.createClass({

  mixins: [ Navigation, TransitionHook ],
  getInitialState(){
    return {
      modalIsOpen: false,
    };
  },
  openModal: function() {
    this.setState({modalIsOpen: true});
  },
  closeModal: function() {
    this.setState({modalIsOpen: false});
  },
  remove(obj){
    //console.log('clicked the submit modal button');

    //console.log('obj', obj.ID);


  /*  this.props.flux.getActions('films').deleteFilm(obj.ID).then((res) => {

      //console.log('res', res);

      if(res[0].Resultado === 500){
        //error película insertada añadir clases
      //  console.log('error no se pudo eliminar la película');
      } else if (res[0].Resultado === 501) {
        //velneo caído
        console.log('Velneo caído');
      } else if(res[0].Resultado === 200){
        //we move to films
        //console.log('película eliminada');
        var film = document.getElementById(obj.ID);
            film.parentNode.removeChild(film);
        this.transitionTo('/films');

      }
      self.closeModal();


    });*/
  },

  modify(obj){
    this.transitionTo('/modifyBook/:id', {id: obj.ID});
  },

  diccionarios(obj){
    //console.log('diccionarios');
    this.transitionTo('/diccionariosLibro/:id', {id: obj.ID});

  },
  youtube(obj){

  },
    render() {
      var youtube = "http://www.youtube.com/watch?v="+this.props.data.Youtube + "";


      const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

      return (

              <div className="show-image" id={this.props.data.ID}>
                  <img onClick={this.modify.bind(this, this.props.data)}
                       src={this.props.data.Foto}
                       title={this.props.data.Nombre}
                       alt={this.props.data.Nombre}
                       width="230"
                       height="345"/>
                  <input type="button"
                         className="delete"
                         value="BORRAR"
                         onClick={this.openModal}>
                  </input>
                  <a href={youtube} target="_blank">
                  <FontAwesome
                  className='youtube'
                  name='youtube-play'
                  size='2x'
                  onClick={this.openYoutubeModal}
                  />
                  </a>
                  <div className="diccionarios">
                    <button onClick={this.diccionarios.bind(this, this.props.data)}>PALABRAS</button>
                  </div>
                  <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
                    <h2>Desea eliminar el libro {this.props.data.Nombre} ?</h2>
                    <div className="buttons">
                      <button className="cancel" onClick={this.closeModal}>Cancelar</button>
                      <button className="submit" onClick={this.remove.bind(this, this.props.data)}>Eliminar</button>
                    </div>
                  </Modal>
              </div>

      );
    }
});


module.exports = BookListItem;
