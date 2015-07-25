'use strict';
import React from 'react/addons';

let Select = React.createClass({

    getInitialState(){
      return {
        values: '',
        id: ''
      };
    },
    onSelect(e){
      this.setState({id: e.target.value});
    },
    componentWillMount(){
      this.setState({values: this.props.data});
    },
    render() {
      if(this.props.data !== ''){

          var list = this.props.data.map((value, i) => {
            return (
              <option key={value.ID} value={value.ID}>
                {value.Nombre}
              </option>
            );
          });
        }
        return (
            <div className={this.props.class}>
              <select onChange={this.onSelect}>
                <option value="0">{this.props.text}</option>
                {list}
              </select>
              <input type="hidden" ref={this.props.ID} id={this.props.ID} value={this.state.id}/>
            </div>
          );
      }
});


module.exports = Select;
