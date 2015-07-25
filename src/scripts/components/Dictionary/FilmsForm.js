'use strict';

import React from 'react/addons';
import Select from '../UI/Select';
import Loading from '../UI/Loading';
import { Navigation, TransitionHook, State } from 'react-router';


let FilmsForm = React.createClass({
  mixins: [ Navigation, TransitionHook, State ],
  getInitialState(){
    return {
      select: '',
      data: ''
    };
  },
  componentWillMount(){
    this.props.flux.getActions('films').fetchFilms().then((res) => {
      console.log('res', res);

      this.setState({ data: res });

    });
  },
  handleForm(){
    var requiredValues = this.props.requiredValues;
    requiredValues.idPelicula = document.getElementById('IDPelicula').value;

    this.props.flux.getActions('diccionarios').saveRequiredData(requiredValues);

    this.transitionTo('/addWords/3');
  },
  render(){
    if(this.state.data !== ''){
      return (
        <div>
          <form className={this.state.select} id="selectName" role="form">
            <div>
            <Select
                    ID="IDPelicula"
                    text={this.props.text.pelicula}
                    data={this.state.data}>
            </Select>
            <input type="button" value="ENVIAR" onClick={this.handleForm}></input>
            </div>
          </form>
        </div>
      );
    }
    else{
      return (<Loading/>);
    }

  }
});

module.exports = FilmsForm;
